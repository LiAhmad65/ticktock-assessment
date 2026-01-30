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
        "primary-100":"#E1EFFE",
        "primary-600": "#1C64F2",
        "primary-700": "#1A56DB",
        "primary-800":"#1E429F",
        "white": "#FFFFFF",
        "gray-50":"#F9FAFB",
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
        "text-brand":"#1447E6",
        "orange-400":"#FF8A4C",
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


