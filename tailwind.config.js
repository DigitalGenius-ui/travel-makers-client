/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),url('/banner.jpg')",
        pageBanner:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.55)),url('/pageBanner.jpg')",
        assistance:
          "linear-gradient(to right, rgba(0,0,0,0.60), rgba(0,0,0,0.30)),url('/help.jpg')",
        gradient: "linear-gradient(to right, #00639b, #90e0e7)",
      },
      gridTemplateColumns: {
        resCol: "repeat(auto-fit, minmax(300px, 1fr))",
        social: "repeat(auto-fit, minmax(150px, 1fr))",
      },
      colors: {
        darkBlue: "#04246b",
      },
      fontFamily: {
        banner: "'Montserrat', sans-serif",
        page: "'Anton', sans-serif",
      },
      screens: {
        tablet: "1090px",
      },
    },
  },
  plugins: [],
};
