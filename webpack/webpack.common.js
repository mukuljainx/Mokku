const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src/");

module.exports = {
  entry: {
    options: path.join(srcDir, "options.ts"),
    background: path.join(srcDir, "background.ts"),
    content_script: path.join(srcDir, "content_script.ts"),
    devtool: path.join(srcDir, "devtool.ts"),
    panel: path.join(srcDir + "panel/index.tsx"),
    dashboard: path.join(srcDir + "dashboard/index.tsx"),
    inject: path.join(srcDir + "inject.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  //   optimization: {
  //     splitChunks: {
  //       name: "vendor",
  //       chunks(chunk) {
  //         return chunk.name !== "background";
  //       },
  //     },
  //   },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};
