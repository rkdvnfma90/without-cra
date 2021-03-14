const path = require('path')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-cheap-source-map',

  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    port: 3000,
    overlay: true,
    writeToDisk: true,
  },

  plugins: [
    new Dotenv({
      path: path.resolve('./.env.development'),
    }),
  ],
})
