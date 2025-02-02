module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#296249",
        "gray-light": "#F8F9FA",
        button: "#356966",
        primary: "#2f7053",
        "primary-dark": "#22312f",
        "primary-hover": "#347c73",
        "primary-light": "#357e5e",
        "primary-extralight": "#409972",
        "cal-header": "#eaf1f0",
      },

      fontFamily: {
        geist: ["Geist", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
