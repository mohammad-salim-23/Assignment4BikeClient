/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors : {
        primaryColor: "#212121", // Black
        secondaryColor: "#FF8C00", // orange
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

