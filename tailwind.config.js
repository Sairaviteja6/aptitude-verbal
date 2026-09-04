/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#e5d1cb',
          300: '#d4b1a7',
          400: '#c28c7f',
          500: '#b86955', // Terracotta warm accent
          600: '#a3533f',
          700: '#87402f',
          800: '#71372a',
          900: '#5f3227',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e3ebe5',
          200: '#c8d7cd',
          300: '#a3bfae',
          400: '#7aa28b',
          500: '#5b8c71', // Warm sage green
          600: '#467059',
          700: '#395948',
          800: '#30483c',
          900: '#293d33',
        },
        sand: {
          50: '#faf9f5',
          100: '#f3f0e6',
          200: '#e6dfcb',
          300: '#d7caaa',
          400: '#c6b083',
          500: '#b79a65',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card-hover': '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
