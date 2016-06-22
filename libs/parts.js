const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')

exports.devServer = function(options) {
	return {
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: options.host,
			port: options.port
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	}
}

exports.setupCSS = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loaders: ['style?sourceMap', 'css?sourceMap', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded'],
					include: paths
				}
			]
		}
	}
}

exports.minify = function() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	}
}

exports.setFreeVariable = function(key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	}
}

exports.extractBundle = function(options) {
	const entry = {};
	entry[options.name] = options.entries; 

	return {
		entry: entry,
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.name, 'manifest']
			})
		]
	}
}

exports.clean = function(path) {
	return {
		plugins: [
			// root allows us to point to our project
			// process.cwd() returns the current working directory 
			new CleanWebpackPlugin([path], {
				root: process.cwd()
			})
		]
	}
}

exports.extractCSS = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style?sourceMap', 'css?sourceMap', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded'),
					include: paths
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	}
}

exports.purifyCSS = function(paths) {
	return {
		plugins: [
			new PurifyCSSPlugin({
				purifyOptions: { info: true },
				basePath: process.cwd(), // points to the parts of purifyCSS that aren't visible to webpack
				paths: paths
			})
		]
	}
}

// exports.defineJSX = function(paths) {
// 	test: /\.jsx?$/,
// 	loader: 'babel',
// 	query: {
// 		cacheDirectory: true,
// 		presets: ['react', 'es2015']
// 	},
// 	include: paths
// }