/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5E6D3',
        'soft-charcoal': '#2F2F2F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      cursor: {
        pipe: 'text', // Or custom CSS if needed for the cursor style? User mentioned .cursor-pipe class in Stitch.
      }
    },
  },
  plugins: [],
}
