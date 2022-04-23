const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        orange: colors.orange,
        primary: {
          "50": "#f4f7f7",
          "100": "#e1eff5",
          "200": "#bfdfea",
          "300": "#8ec0d0",
          "400": "#569db1",
          "500": "#407d92",
          "600": "#356377",
          "700": "#2c4b5c",
          "800": "#203342",
          "900": "#14202c",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
