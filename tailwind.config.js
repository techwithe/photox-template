module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        xxl: "1900px",
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },
      },
    },
  },
  plugins: [],
}
