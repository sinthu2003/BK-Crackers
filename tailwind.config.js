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
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'firework': 'firework 4s ease-out infinite',
        'rocket': 'rocket 2s ease-in-out infinite',
        'burst': 'burst 1.5s ease-out infinite',
        'trail': 'trail 2s linear infinite',
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
        },
        sparkle: {
          '0%, 100%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '0'
          },
          '50%': { 
            transform: 'scale(1) rotate(180deg)',
            opacity: '1'
          }
        },
        firework: {
          '0%': { 
            transform: 'translateY(0) scale(0)',
            opacity: '1'
          },
          '15%': { 
            transform: 'translateY(-50px) scale(0.3)',
            opacity: '1'
          },
          '30%': { 
            transform: 'translateY(-100px) scale(0.6)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translateY(-150px) scale(1)',
            opacity: '1'
          },
          '70%': { 
            transform: 'translateY(-100px) scale(1.2)',
            opacity: '0.7'
          },
          '100%': { 
            transform: 'translateY(0) scale(0)',
            opacity: '0'
          }
        },
        rocket: {
          '0%': { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: '0'
          },
          '20%': { 
            transform: 'translateY(-30px) rotate(5deg)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translateY(-60px) rotate(-5deg)',
            opacity: '1'
          },
          '80%': { 
            transform: 'translateY(-30px) rotate(3deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: '0'
          }
        },
        burst: {
          '0%': { 
            transform: 'scale(0)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.5)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'scale(3)',
            opacity: '0'
          }
        },
        trail: {
          '0%': { 
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100px)',
            opacity: '0'
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