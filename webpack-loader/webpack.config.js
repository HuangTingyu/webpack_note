const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                // placeholder占位符
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        }]

    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
}