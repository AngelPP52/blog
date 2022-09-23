const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders'), path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['loader-a', 'loader-b', 'loader-c']
            }
        ]
    }
}