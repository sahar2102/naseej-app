/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'tunis-blue': '#0073E6',
        'tunis-deep': '#003366',
        'tunis-red': '#E70013',
        'tunis-sand': '#FDF5E6',
        'tunis-gold': '#D4AF37',
      },
      borderRadius: {
        'arch': '24px 24px 4px 4px',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
