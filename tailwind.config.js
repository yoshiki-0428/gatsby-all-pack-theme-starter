const config = require("./loadYaml.js");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        primary: '#00FFC5',
        accent: '#007ACE',
        "base-back": '#ebebeb',
        "base-font": '#141414',
        "base-gray": '#282828',
        "base-gray-light": '#E2E8F0'
      },
    },
  },
  variants: {},
  plugins: [],
}
