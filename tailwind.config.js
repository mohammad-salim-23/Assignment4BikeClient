/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors : {
        primaryColor: "#D32F2F", // Red
        secondaryColor: "#212121", // Black
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

