const config = require("./loadYaml.js");

// Dark mode
//       colors: {
//         white: '#1F1F1F',
//         primary: '#00FFC5',
//         accent: '#007ACE',
//         "base-back": '#121212',
//         "base-font": '#FAFAFA',
//         "base-gray": '#3F3F3F',
//         "base-gray-light": '#4E4E4E'
//       },
// Light mode
// colors: {
//   white: '#FFFFFF',
//       primary: '#00FFC5',
//       accent: '#007ACE',
//       "base-back": '#ebebeb',
//       "base-font": '#141414',
//       "base-gray": '#282828',
//       "base-gray-light": '#E2E8F0'
// },

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
