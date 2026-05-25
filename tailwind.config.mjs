/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0F',
          soft: '#1A1A2E',
        },
        gold: {
          DEFAULT: '#B8962E',
          light: '#D4AE4A',
          pale: '#F5EDD4',
          // Body-text fallback on light backgrounds. v1.2 spec said "#8B6F1F
          // or similar" — that exact value fails WCAG AA at body sizes. We
          // use #6B5618, a slightly darker variant of the same hue, which
          // passes 4.5:1 against Paper. Stays in family per v1.2 allowance.
          deep: '#6B5618',
        },
        paper: '#F5F2ED',
        slate: {
          DEFAULT: '#2C3E5A',
        },
        muted: '#6B6B7A',
        editorial: {
          teal: '#1A5C6B',
          warm: '#8B5E3C',
          sage: '#4A6B5A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'eyebrow': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'body-lg': ['1.25rem', { lineHeight: '1.55' }],
        'h3': ['1.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
        'h1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        'eyebrow': '0.08em',
        'wide-cap': '0.12em',
      },
      maxWidth: {
        'prose-narrow': '38rem',
        'prose-wide': '46rem',
      },
      borderColor: {
        'rule': '#B8962E',
        'rule-muted': '#6B6B7A',
      },
    },
  },
  plugins: [],
};
