const path = require('path')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.resolve('./dist'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minSize: 10000,
          maxSize: 250000,
        },
      },
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  plugins: [
    new Dotenv({
      path: path.resolve('./.env.production'),
    }),
  ],
})
