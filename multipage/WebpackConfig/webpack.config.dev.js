const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
//console.log(commonConfig)
module.exports = (env) => {
    return merge(commonConfig, {
        mode: 'development',
    })
}
