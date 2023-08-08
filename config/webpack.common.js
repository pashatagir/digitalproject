const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WebpackBar = require('webpackbar');
const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.js'],
  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.src + '/images',
          to: paths.dist + '/images',
        },
      ],
    }),
  ],
  resolve: {
    modules: [paths.dist, 'node_modules'],
    extensions: ['.js', '.json'],
  },
};
