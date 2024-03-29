/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    './src/App.vue',
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

