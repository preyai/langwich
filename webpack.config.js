// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const autoprefixer = require('autoprefixer');
const fs = require('fs')

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir), {withFileTypes: true})
    return templateFiles.filter(item => item.isFile()).map(item => {
        // Split names and extension
        const parts = item.name.split('.')
        const name = parts[0]
        const extension = parts[1]
        // Create new HTMLWebpackPlugin with option
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        })
    })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/template')
console.log(htmlPlugins)

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = !isProduction ? "style-loader" : MiniCssExtractPlugin.loader;

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, isProduction ? "docs" : "dist"),
    },
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: htmlPlugins.concat([

        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin(),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ]),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|gif)$/i,
                type: "asset",
            },
            {
                test: /\.(|png|jpg)$/i,
                type: "asset",
                // use: [
                //     {
                //         loader: `img-optimize-loader`,
                //         options: {
                //             compress: {
                //                 // This will transform your png/jpg into webp.
                //                 webp: true,
                //                 disableOnDevelopment: true,
                //             },
                //         },
                //     },
                // ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
