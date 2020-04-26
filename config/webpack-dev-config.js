const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("../public/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const paths = require('./paths');
const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    app: [paths.appIndexJs],
    content: [paths.appContentJs],
    background: [paths.appBackgroundJs],
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  plugins: [
    new CopyPlugin([
      {
        from: "public/icons",
        to: "icons"
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
module.exports = config;
