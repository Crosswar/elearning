const { resolve } = require('path')

const config = require('@ibsel/webpack')

module.exports = config({
  entry: './src/index.tsx',
  output: resolve(__dirname, 'dist'),
  dotenv: {
    path: resolve(__dirname, '.env'),
  },
  html: {
    template: resolve(__dirname, 'public', 'index.html'),
    favicon: resolve(__dirname, 'public', 'favicon.ico'),
  },
})
