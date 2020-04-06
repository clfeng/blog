const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {

    mode: 'development',

    devtool: 'source-map',

    entry: {
        index: "./src/index.js",
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },

    plugins: [
        new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html')
		})
    ],

    devServer: {
        hot: true,
        open: true,
        openPage: 'index.html',
        port: 9000
    }
}
