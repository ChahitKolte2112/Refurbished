/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:"red",
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  }
}

