const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: "development",
	entry: {
		"app": "./src/index.tsx"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"]
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [{	loader: "ts-loader"}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 3000
	}
};

