/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#153448',
        bodybg:'#E3FEF7',
      }
    },
  },
  plugins: [],
}

