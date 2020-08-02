const config = require("./loadYaml.js");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    borderRadius: {
      'sm': '0.125rem',
      default: config.siteDesign.rounded,
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
    },
    extend: {
      colors: {
        white: config.siteDesign.white,
        primary: config.siteDesign.primary,
        accent: config.siteDesign.accent,
        "base-back": config.siteDesign.baseBack,
        "base-font": config.siteDesign.baseFont,
        "base-gray": config.siteDesign.baseGray,
        "base-gray-light": config.siteDesign.baseGrayLight
      },
      fill: {
        "base-font": config.siteDesign.baseFont,
      }
    },
  },
  variants: {},
  plugins: [],
};
