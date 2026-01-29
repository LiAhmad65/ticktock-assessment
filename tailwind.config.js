/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary-600": "#1C64F2",
        "primary-700": "#1A56DB",
        "white": "#FFFFFF",
        "gray-200":"#E5E7EB",
        "gray-300":"#D1D5DB",
        "gray-500":"#6B7280",
        "gray-900":"#111928",
        "green-100": "#DEF7EC",
        "green-800": "#065F46",
        "yellow-100": "#FDF6B2",
        "yellow-800": "#92400E",
        "pink-100": "#FCE8F3",
        "pink-800": "#99154B",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


