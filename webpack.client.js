const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  console.log(
    `Building with backend host: ${env ? env.BACKEND_HOST : undefined}`
  );

  return {
    entry: "./src/client/index.tsx",
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
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
      alias: {
        "@client": path.resolve(__dirname, "./src/client"),
        "@common": path.resolve(__dirname, "./src/common")
      }
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Simple Event Logger"
      }),
      new webpack.DefinePlugin({
        BACKEND_HOST: env ? JSON.stringify(env.BACKEND_HOST) : undefined
      })
    ]
  };
};
