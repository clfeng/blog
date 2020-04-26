const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { 
                from: path.resolve(__dirname, './static'), 
                to: path.resolve(__dirname, 'dist') 
            }
          ]),
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