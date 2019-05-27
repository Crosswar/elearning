const { resolve } = require('path')

const config = require('@ibsel/webpack')

module.exports = config({
  entry: './src/index.tsx',
  output: resolve(__dirname, 'dist'),
  html: {
    template: resolve(__dirname, 'public', 'index.html'),
    favicon: resolve(__dirname, 'public', 'favicon.ico'),
  },
})
