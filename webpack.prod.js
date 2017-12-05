const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const base = require('./webpack.base.js')

const sourcePath = path.join(__dirname, './src')

module.exports = Object.assign(base, {
  devtool: false,

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: sourcePath,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      ...base.module.rules,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    ...base.plugins,
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('css/main.css'),
  ],
})

