// PostCSS config — Tailwind v4 via @tailwindcss/postcss.
// Tailwind only acts on classes referenced in files that import the advertiser entry's
// globals.css (src/advertiser/globals.css). Retailer pages don't import it,
// so Tailwind utilities don't bleed into the retailer app.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
