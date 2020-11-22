const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
})