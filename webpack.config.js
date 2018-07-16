const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['url-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['url-loader']
			}
		]
	},
	plugins: [
        new ExtractTextWebpackPlugin({
            filename:'css/index.css',
        }),
        new CleanWebpackPlugin(['./dist']), 
		new HtmlWebpackPlugin({
            filename: 'index.html',
			title: 'production',
            template: './index.html',
            hash: true,
            chunks: ['app'],
        }),
        new CopyWebackPlugin([
            {
                from: './src/images',
                to: 'images'
            }
        ]),
		// hot 检测文件改动替换plugin
		new webpack.NamedModulesPlugin(),      
		new webpack.HotModuleReplacementPlugin()		
	],
       // webpack-dev-server 配置
	devServer: {
		contentBase: './dist',
        hot: true,
        open:true,
        port: '8080',
        compress:true,
    },
    mode:'development', 
};