const {resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

const extractStyles = new ExtractTextPlugin('styles.css')

const config = {
  entry: {
    app: './src/main.js',
    lib: ['vue', 'vue-router', 'firebase'],
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: extractStyles.extract('css-loader') },
      { test: /\.scss$/, loader: extractStyles.extract('css-loader!sass-loader') },
      { test: /\.(ttf|woff2?|eot|svg)$/, loader: 'file-loader' },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: extractStyles.extract('css-loader!sass-loader')
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'lib' }),
    new HtmlPlugin({ template: './src/index.html' }),
    extractStyles,
  ],
  devtool: 'source-map',
}

if (isProduction) {
  console.log('[INFO] Building for production.')
  config.devtool = undefined
}

module.exports = config
