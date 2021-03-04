const path = require('path')
require('@babel/polyfill')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    devtool: false,
    entry: {
        main: [
            '@babel/polyfill',
            './src/index.js',
            './src/assets/styles/style.scss'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: true,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },
            {
                test: /\.ico$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.ttf/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                devServer: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img'),
                    noErrorOnMissing: true
                },
            ]
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['bundle.js'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            favicon: "./src/assets/img/favicon.ico"
        }),
    ]
}