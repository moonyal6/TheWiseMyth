/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#F2B6C1',
          magenta: '#D9259A',
          navy: '#2C2287',
          purple: '#542EA3',
          coral: '#EF7979',
          peach: '#EFAF79',
          cream: '#F2E2D5',
        }
      },
    },
  },
  plugins: [],
}; 