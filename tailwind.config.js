/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 10px  20px -20px rgba(0, 0, 0, 0.5)",
        businessShadow: "20px 5px 25px -25px rgba(0, 0, 0, 0.9)",
        businessShadowEn: "-20px -5px 25px -25px rgba(0, 0, 0, 0.9)",
        heroBtn: "20px 5px  150px -15px rgba(0, 0, 0, 0.9)",
        darkModeBtn: "-10px -10px  10px -10px rgba(0, 0, 0, 0.5)",
        navbarBtn : " 0px 1px 0px rgba(0, 0, 0, 0.9)",
        videoShadow : " 1px 1px 20px 1px rgba(0, 0, 0, 0.9)",
      },
      colors: {
        primary: "#00040f",
        light: "#FEFCF3",
        secondary: "#62f7fc",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
