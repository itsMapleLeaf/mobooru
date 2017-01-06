const {resolve} = require('path')
const BabiliPlugin = require('babili-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
      { test: /\.(ttf|woff2?|eot|svg)$/, loader: 'file-loader' },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract('css-loader!sass-loader')
          }
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  devtool: 'source-map',
}

if (isProduction) {
  console.log('[INFO] Building for production.')
  config.devtool = undefined
  config.plugins.push(new BabiliPlugin())
}

module.exports = config
