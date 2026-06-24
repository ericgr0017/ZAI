import rss from '@astrojs/rss';
import data from '../../data/topic-articles.json';

export function GET(context) {
  return rss({
    title: 'ZAI Institute Blog',
    description: 'Research notes on what senior operators are actually doing with AI, by topic.',
    site: context.site,
    items: data.articles.map((a) => ({
      title: a.article.headline,
      description: a.article.dek,
      pubDate: new Date(a.date + 'T00:00:00Z'),
      link: `/blog/${a.slug}/`,
      categories: [a.label],
    })),
  });
}
