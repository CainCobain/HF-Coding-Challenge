var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'bundle.js'
    },
    watch : true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react','babel-preset-es2015','babel-preset-stage-1']
                }
            },
          
        ]
    },
};