/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/App.vue',
    './src/components/'
  ],
  theme: {
    extend: {
      screens:{
        'desktop': '1344px',
        'tablet': '992px',

      }
    },
  },
  plugins: [],
}

