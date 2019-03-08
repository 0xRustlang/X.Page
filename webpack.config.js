'use strict';

const { VueLoaderPlugin } = require('vue-loader');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const resolve = (...paths) => path.join(__dirname, ...paths);

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: resolve('dist'),
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'vue-style-loader'
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        data: '@import "main";',
                                        includePaths: [
                                            resolve('src', 'assets')
                                        ]
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    fallback: 'file-loader',
                    limit: 10 * 1024,
                    noquotes: true,
                    outputPath: 'images'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                data: '@import "main";',
                                includePaths: [
                                    resolve('src', 'assets')
                                ]
                            }
                        }
                    ],
                    fallback: 'vue-style-loader'
                }),
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            allChunks: true,
            filename: '[name].[chunkhash].css'
        }),
        new CompressionPlugin()
    ]
};
