/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inknut-antiqua': ['"Inknut Antiqua"', 'serif'],
      },
      fontWeight: {
        light: 300,
        heavy:600
      },
      colors: {
        'lightest-green': '#D6EFD8',
        'light-green':'#80AF81',
        'green':'#508D4E',
        'dark-green':'#1A5319'
      },
      
    },
    

  },
  plugins: [],
}
