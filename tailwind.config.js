const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cinzel)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        magical: ['var(--font-great-vibes)', 'cursive'],
      },
      colors: {
        golden: '#ffd700',
        maroon: '#800000',
        midnight: '#191654',
        parchment: '#FFF7E6',
        gryffindor: {
          red: '#740001',
          gold: '#D3A625',
        },
        hogwarts: {
          dark: '#1A472A',
          light: '#2A623D',
          accent: '#5D5D5D',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spell': 'spell 2s ease-out forwards',
        'appear': 'appear 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spell: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: 1 },
        },
        appear: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }
      },
    },
  },
  plugins: [],
};