const webpack = require('webpack')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV === 'development'

const getEntry = ({ entry }) => {
  return isDev ? [entry, 'webpack-plugin-serve/client'] : entry
}

const getPlugins = ({ output, dotenv, html }) => {
  const plugins = [
    new HtmlWebpackPlugin(html),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]

  if (dotenv) {
    plugins.push(
      new Dotenv({
        ...dotenv,
        safe: true,
      })
    )
  }

  if (isDev) {
    plugins.push(
      new WebpackPluginServe({
        port: process.env.PORT,
        hmr: true,
        historyFallback: true,
        static: [output],
      })
    )
  }

  return plugins
}

module.exports = ({ entry, output, dotenv, html }) => ({
  entry: getEntry({ entry }),
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'cheap-eval-source-map' : false,
  resolve: {
    alias: isDev ? { 'react-dom': '@hot-loader/react-dom' } : {},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  output: {
    path: output,
    publicPath: '/',
    filename: !isDev ? 'bundle.[contenthash].js' : 'bundle.js',
  },
  plugins: getPlugins({ output, dotenv, html }),
  watch: isDev,
})
