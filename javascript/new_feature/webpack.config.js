const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: "development",

    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },

    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ],

    devServer: {
        open: true,
        openPage: 'index.html',
        hot: true,
        port: 9000
    },

    output: {
        path: path.resolve(__dirname, 'dist')
    }
};