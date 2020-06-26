const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    alias: {
      "@server": path.resolve(__dirname, "./src/server")
    }
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin")
  }
};
