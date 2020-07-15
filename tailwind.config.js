module.exports = {
  purge: [],
  theme: {
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '970px': '970px',
    }),
    extend: {},
  },
  variants: {},
  plugins: [],
}
