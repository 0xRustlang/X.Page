'use strict';

const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const resolve = (...paths) => path.join(__dirname, ...paths);

module.exports = {
    mode: 'development',
    entry: [
        './src/app.js'
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            }
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
        new VueLoaderPlugin()
    ]
};
