/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors:{
        "main" : "#0E1826",
        "bg" : "#25314050",
        "border" : "#4F5F73",
        "second" : "#F2F2F250",
        "text" : "#F2F2F2",
      }
    },
  },
  plugins: [],
}