const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin")
  },
  target: "node"
};
