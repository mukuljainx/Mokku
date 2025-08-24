const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "../src/";
const scripts = "../src/scripts/";

module.exports = {
    entry: {
        background: path.join(__dirname, scripts + "service-worker.ts"),
        content_script: path.join(__dirname, scripts + "content/index.ts"),
        app_script: path.join(__dirname, scripts + "app-script.ts"),
        hook: path.join(__dirname, scripts + "hook.ts"),
        devtool: path.join(__dirname, srcDir + "devtool.ts"),
        panel: path.join(__dirname, srcDir + "panel/index.tsx"),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [`style-loader`, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|ttf)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.join(__dirname, srcDir),
        },
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin({ resourceRegExp: /moment\/locale\// }),
        new CopyPlugin([{ from: ".", to: "../" }], { context: "public" }),
    ],
};
