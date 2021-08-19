const webpack = require("webpack")
const path = require("path")
const externals = require("./node-externals")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  name: "server",
  entry: "./src/App/App.js",
  mode: "development",
  target: "node",
  externals: [externals, nodeExternals()],
  output: {
    path: path.resolve(__dirname, "../dist/node"),
    filename: "[name]-bundle.js",
    chunkFilename: "[name]-chunk.js",
    publicPath: `/dist/node/`,
    libraryTarget: "commonjs2",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "../src/"),
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
}
