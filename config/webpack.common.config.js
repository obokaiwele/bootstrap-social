const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    entry: {
        'bootstrap-social': './src/scss/bootstrap-social.scss',
    },

    module: {
        rules: [
            {
                test: [/.css$|.scss$/],
                use:[
                    MiniCssExtractPlugin.loader,    // Extract syles into external file
                    'css-loader',                   // Translates CSS into CommonJS
                    {
                        loader: 'sass-loader',      // Compiles Sass to CSS
                        options: {
                            implementation: require('node-sass'),     // Prefer `node-sass`
                        },
                    },
                    'postcss-loader'                // Transform CSS using plugins
                ]
            },
        ]
    },

    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].min.css'
        }),
        new CleanWebpackPlugin()
    ]
}
