const config = require("./loadYaml.js");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: config.siteDesign.primary,
        secondary: '#5c6ac4',
        accent: '#007ace',
        "base-font": '#141414',
        "base-gray": '#282828',
        "base-gray-light": '#E2E8F0'
      },
    },
  },
  variants: {},
  plugins: [],
}
