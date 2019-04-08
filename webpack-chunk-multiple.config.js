const APP = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */

module.exports = {
    context: APP,
    entry: {
        login: path.resolve(__dirname, './app/multiple/login/index.js'),
        home: path.resolve(__dirname, './app/multiple/home/index.js')
    },
    output: {
        filename: '[name].js',
        chunkFilename: "[name].js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.html'],
        modules: [path.resolve('node_modules')],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"

                ]
            },

            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name]/[hash].[ext]"
            },
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.png$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
        ]
    },
    optimization: {
        splitChunks: {
            chunks:"all"
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),

        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            excludeChunks:['home'],
            title:"Login"
        }),

        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'home.html',
            template: path.resolve(__dirname, 'index.html'),
            excludeChunks:['login'],
            title:"CHUNK"
        })
    ]
};













// commons: {
//     name:"common",
//         chunks: "initial",
//         minChunks: 2,
//         maxInitialRequests: 5, // The default limit is too small to showcase the effect
//         minSize: 0 // This is example is too small to create commons chunks
// },