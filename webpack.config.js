const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: {
        app: "./src/index.tsx",
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                options: {
                    // We use ForkTsCheckerWebpackPlugin for typechecking
                    transpileOnly: true,
                },
            },
            {
                test: /\.s[ac]ss$/i,
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

    plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],

    devServer: {
        static: "./dist",
        open: true,
        port: 3000,
        historyApiFallback: true,
    },
};
