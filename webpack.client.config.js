const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
    entry: './src/entry-client.js',
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new VueSSRClientPlugin()
    ]
});
