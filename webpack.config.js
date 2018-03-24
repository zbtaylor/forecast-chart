const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './react/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/public/javascripts')
	},
	// plugins: [
	// 	new UglifyJSPlugin()
	// ],
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
                	cacheDirectory: true,
              	},
			}],
		}],
	},
};