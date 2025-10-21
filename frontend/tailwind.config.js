module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reliability-high': '#10b981',
        'reliability-medium': '#f59e0b',
        'reliability-low': '#ef4444',
        'reliability-very-low': '#dc2626',
      }
    },
  },
  plugins: [],
}
