/**
 * Common configuration file for webpack build
 */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractLess = new ExtractTextPlugin({ filename: '[name].[chunkhash].css' })	// [name] resolves to name of bundle (e.g., authenticate, objects)

// Paths are relative to the client folder, not to this config file, as this is where node is run from

const commonConfig = {
	context: path.resolve('./src'),
	entry: {
		app: './'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.less$/,
				use: extractLess.extract({
					use: [
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
						},
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' }
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.ttf$/,
				use: 'file-loader'
			},
			{
				test: /\.(svg|png)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	},
	output: {
		filename: '[name].[chunkhash].js',	// [name] resolves to name of bundle (e.g., authenticate, objects)
		publicPath: '/static/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		extractLess,
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: 'template.html'
		})
	],
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		],
		symlinks: false	// linked dependency peer dependencies resolve correctly
	},
	target: 'web'
}

module.exports = commonConfig
