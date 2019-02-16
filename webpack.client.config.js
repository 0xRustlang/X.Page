const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
    entry: {
        app: './src/entry-client.js',
        vendorStyles: [
            'vue-multiselect/dist/vue-multiselect.min.css',
            'bootstrap/scss/bootstrap.scss',
            'bootstrap-vue/dist/bootstrap-vue.css',
            '@fortawesome/fontawesome-svg-core/styles.css',
            'flag-icon-css/sass/flag-icon.scss'
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new VueSSRClientPlugin()
    ]
});
