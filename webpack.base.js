const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildPath = path.join(__dirname, './build/')
const sourcePath = path.join(__dirname, './src')

module.exports = {
  entry: {
    main: [
      './src/index.jsx',
    ],
  },

  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?limit=20480&name=images/[name].[ext]',
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?limit=10000&mimetype=video/mp4&name=images/[name].[ext]',
      },
    ],
  },

  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),

    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.ejs'),
      path: buildPath,
      filename: 'index.html',
      target: process.env.TARGET,
    }),
  ],
}

