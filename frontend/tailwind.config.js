/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'acid-green': '#ccff00',
        'electric-purple': '#7000ff',
        'hot-pink': '#ff0099',
        'deep-black': '#0a0a0a',
        'off-white': '#f5f5f0',
        'mid-gray': '#d4d4d4',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px #0a0a0a',
        'brutal-hover': '8px 8px 0px #0a0a0a',
        'brutal-focus': '6px 6px 0px #7000ff',
        'brutal-active': '3px 3px 0px #0a0a0a',
        'brutal-sm': '4px 4px 0px #0a0a0a',
      },
      transitionTimingFunction: {
        'bouncy': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }
    },
  },
  plugins: [],
}
