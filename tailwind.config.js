/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F8F8F8',
          100: '#D2D1D1',
          300: '#989FA3',
          500: '#6D7986',
          900: '#2D4258',
          800: '#323F47',
        },
        red: {
          200: "#FC5C65"
        },
        primary: {
          dark: '#30898A',
          light: '#54D3C2',
          hover: '#A9E9E0BF',
        }
      },
      fontSize: {
        sm: ['14px', '18px'],
        md: ['18px', '21px'],
        xl: ['28px', '44px'],
        lg: '24px',
        md: ['20px', '44px'],
      },
      borderRadius: {
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '56px'
      }
    },
  },
  plugins: [],
}

