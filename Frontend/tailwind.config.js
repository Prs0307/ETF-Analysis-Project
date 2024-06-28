/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [ /* Add 'no-scrollbar' to the safelist if needed */
    'no-scrollbar',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'grey': '#808080',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'main': {
        dark: '#0f172a',
        DEFAULT: '#06b6d4',
        light: '#22d3ee',
      },
      'primary':'#0f172a',
      'secondary': '#0ea5e9',
      'orange': '#ED7117',
      'DAISY':'#FAFAFA',
      'pebble':'#333333'

    },
  },
  plugins: [],
}

