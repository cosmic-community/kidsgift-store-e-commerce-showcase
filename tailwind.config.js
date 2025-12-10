/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          50: '#FFE5E5',
          100: '#FFD1D1',
          200: '#FFA3A3',
          300: '#FF7575',
          400: '#FF4747',
          500: '#FF6B6B',
          600: '#FF1919',
          700: '#E60000',
          800: '#B30000',
          900: '#800000',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          50: '#E8F9F8',
          100: '#D1F3F1',
          200: '#A3E7E3',
          300: '#75DBD5',
          400: '#47CFC7',
          500: '#4ECDC4',
          600: '#1FA99F',
          700: '#178077',
          800: '#0F574F',
          900: '#072E27',
        },
        accent: {
          DEFAULT: '#FFE66D',
          50: '#FFFCF0',
          100: '#FFF8E1',
          200: '#FFF1C3',
          300: '#FFEAA5',
          400: '#FFE387',
          500: '#FFE66D',
          600: '#FFD91F',
          700: '#D6B600',
          800: '#A38B00',
          900: '#706000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}