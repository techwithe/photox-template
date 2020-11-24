module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      screens: {
        'xxl' : '1900px',
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'}
        // => @media (orientation: portrait) { ... }
      }
    },
  },
  variants: {},
  plugins: [],
}
