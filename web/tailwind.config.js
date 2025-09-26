/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],   // Inter (gövde)
        serif: ["var(--font-serif)", "serif"],      // Merriweather (başlıklar)
        mono: ["var(--font-mono)", "monospace"],    // JetBrains Mono (kod)
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            fontFamily: theme("fontFamily.sans").join(","),
            h1: {
              fontFamily: theme("fontFamily.serif").join(","),
              fontWeight: "700",
              color: theme("colors.gray.900"),
            },
            h2: { fontFamily: theme("fontFamily.serif").join(","), fontWeight: "700" },
            h3: { fontFamily: theme("fontFamily.serif").join(","), fontWeight: "700" },
            code: { fontFamily: theme("fontFamily.mono").join(",") },
            pre: { fontFamily: theme("fontFamily.mono").join(",") },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
