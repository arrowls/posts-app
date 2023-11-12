/** @type {import('tailwindcss').Config} */

function toRem(value) {
  return `${value / 16}rem`;
}

export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: toRem(32),
        lg: toRem(120),
      },
    },
  },
}

