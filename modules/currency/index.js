const { resolve } = require('path');

module.exports = function nuxtVueCurrencyFilter(moduleOptions) {
    this.addPlugin({
        ssr: true,
        src: resolve(__dirname, 'plugin.template.js'),
        moduleOptions
    })
};
