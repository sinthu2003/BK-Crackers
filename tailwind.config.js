/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Garderobe theme colors - minimalist black and white with red accent
        'garderobe-black': '#131117',
        'garderobe-red': '#e8363c',
        'garderobe-gray': {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e6e6e6',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          }
        }
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      }
    },
  },
  plugins: [],
}