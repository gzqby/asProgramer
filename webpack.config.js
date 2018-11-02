const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		index:'./src/app.js',
		another: './src/another-module.js'
	},
	output: {
		filename: '[name].bundle.js',
      		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	optimization: {
	     splitChunks: {
	       chunks: 'all'
	     }
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
				use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader']
                }) 
			},
			{
				test: /\.less$/,
				use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'less-loader']
                }) 
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
            template: './src/index.html',
            hash: true
        }),
        // new CopyWebackPlugin([
        //     {
        //         from: './src/images',
        //         to: 'images'
        //     }
        // ]),
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
	historyApiFallback: true
    },
    mode:'development', 
};
