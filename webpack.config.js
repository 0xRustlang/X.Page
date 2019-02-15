'use strict';

const { VueLoaderPlugin } = require('vue-loader');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const resolve = (...paths) => path.join(__dirname, ...paths);

module.exports = {
    mode: 'production',
    output: {
        path: resolve('dist'),
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
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
                use: [
                    'vue-style-loader',
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
                ]
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
        new CompressionPlugin()
    ]
};
