/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-delay': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 300ms infinite',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
};
