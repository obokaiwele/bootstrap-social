const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');

module.exports = merge(webpackBaseConfig, {
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ]
    }
})
