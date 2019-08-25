const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader'
            }
        }]

    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
}