/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: ({ theme }) => ({
        ...theme('spacing'),
        screen: '100dvh',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
