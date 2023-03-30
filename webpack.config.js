const path = require("path");
const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");
const webpack = require("webpack");
module.exports = {
    context: ROOT,
    entry: "./index.ts",
    target: "node",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            // Compile JavaScript files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /colyseus/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [ROOT, "node_modules"],
    },
    output: {
        filename: "[name].bundle.js",
        path: DESTINATION,
    },
    devServer: {
        static: DESTINATION,
        compress: true,
        port: 9000,
    },
    externals: [{ pg: { commonjs: "pg" } }],
};
