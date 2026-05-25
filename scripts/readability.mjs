#!/usr/bin/env node
/**
 * Readability audit for ZAI Institute pages.
 * Fetches a URL, strips chrome (header, footer, nav, scripts), extracts visible body
 * prose, and reports: Flesch Reading Ease, Flesch-Kincaid grade, average sentence
 * length, passive-voice rate, word count. Brief asks for grade 10–12 target on most
 * pages, average sentence length flagged if over 25, passive over 15%.
 *
 * Usage: node scripts/readability.mjs <url>
 */

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/readability.mjs <url>');
  process.exit(1);
}

function syllableCount(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function stripHtml(html) {
  // Remove script and style content
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // Remove header, nav, footer blocks entirely so chrome doesn't poison the score
  html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ');
  html = html.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, ' ');
  html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ');
  // Drop tags, keep text
  html = html.replace(/<[^>]+>/g, ' ');
  // Decode a few common entities
  html = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&rsaquo;/g, '>')
    .replace(/&[#a-z0-9]+;/gi, ' ');
  return html.replace(/\s+/g, ' ').trim();
}

const passiveAuxiliaries = /\b(is|are|was|were|be|been|being|am)\s+(\w+ed|built|done|made|set|kept|sent|given|taken|known|seen|told|spoken|written|brought|bought|caught|taught|thought|fought|found|sold|told|held)\b/gi;

const response = await fetch(url);
if (!response.ok) {
  console.error(`Fetch failed: ${response.status}`);
  process.exit(2);
}
const html = await response.text();
const text = stripHtml(html);

const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => /\w/.test(s));
const words = text.split(/\s+/).filter((w) => /\w/.test(w));
const syllables = words.reduce((sum, w) => sum + syllableCount(w), 0);

const sentenceCount = sentences.length || 1;
const wordCount = words.length || 1;
const avgSentenceLen = wordCount / sentenceCount;
const avgSyllablesPerWord = syllables / wordCount;

const flesch = 206.835 - 1.015 * avgSentenceLen - 84.6 * avgSyllablesPerWord;
const fkGrade = 0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59;

const passiveMatches = text.match(passiveAuxiliaries) || [];
const passiveRate = (passiveMatches.length / sentenceCount) * 100;

const longSentences = sentences.filter((s) => s.split(/\s+/).length > 25);

const result = {
  url,
  wordCount,
  sentenceCount,
  averageSentenceLength: +avgSentenceLen.toFixed(2),
  averageSyllablesPerWord: +avgSyllablesPerWord.toFixed(2),
  fleschReadingEase: +flesch.toFixed(1),
  fleschKincaidGrade: +fkGrade.toFixed(1),
  passiveRatePercent: +passiveRate.toFixed(1),
  longSentenceCount: longSentences.length,
  longSentences: longSentences.slice(0, 5).map((s) => s.slice(0, 200)),
  flags: {
    sentenceLengthOver25: avgSentenceLen > 25 ? 'FLAG' : 'OK',
    passiveOver15Percent: passiveRate > 15 ? 'FLAG' : 'OK',
    gradeOutsideTarget: fkGrade < 10 || fkGrade > 12 ? 'NOTE' : 'OK',
  },
};

console.log(JSON.stringify(result, null, 2));
