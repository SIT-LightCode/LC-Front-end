/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      'kanit': ['Kanit', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'rampart': ['Rampart One', 'sans-serif']
    },
    colors: {
      'st-grey': '#F2F2F2',
      'st-blue': '#007AFF',
      'st-green': '#6CE9A6',
      'st-red': '#FDA29B',
      'st-yellow': '#FEC84B'
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
              transform: 'rotate(-3deg)'
          },
          '50%': {
              transform: 'rotate(3deg)'
          },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
            },
            "100%": {
              width: "100%"
            }
          },
          blink: {
            "50%": {
              borderColor: "transparent"
            },
            "100%": {
              borderColor: "white"
            }
          }
        },
        animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
          typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
        }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
    
}

