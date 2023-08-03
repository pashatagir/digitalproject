const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: "./index.js", analytics: "./analytics.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dijital Project",
      template: "./index.html",
      minify: { collapseWhitespace: isDev },
    }),
    // new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
