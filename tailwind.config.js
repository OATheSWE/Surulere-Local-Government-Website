/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}" ],
  theme: {
    extend: {
      colors: {
        primary: "#98CD5B",
        secondary: "#BAD29D",
        accent: "#",
      },
      fontFamily: {
        sans: "Poppins",
      },
      screens: {
        lg: "992px",
      },
      listStyleType: {
        disc: "disc",
        decimal: "decimal",
      },
    },
  },
  plugins: [],
};
