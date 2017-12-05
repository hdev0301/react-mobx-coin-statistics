const webpack = require('webpack')

const base = require('./webpack.base.js')

module.exports = Object.assign(base, {
  devtool: 'eval',

  entry: {
    main: [
      'react-hot-loader/patch',
      ...base.entry.main,
    ]
  },

  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    ...base.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
})

