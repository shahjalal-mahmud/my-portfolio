/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // dark mode default
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    animation: {
      float: "float 6s ease-in-out infinite",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
  },
},
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"], // you can change themes here
  },
}
