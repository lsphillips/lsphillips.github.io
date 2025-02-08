import { resolve }              from 'path';
import { readFile }             from 'fs/promises';
import * as yaml                from 'js-yaml';
import CssMinimizerPlugin       from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin     from 'mini-css-extract-plugin';
import TerserPlugin             from 'terser-webpack-plugin';
import HtmlPlugin               from 'html-webpack-plugin';
import CopyPlugin               from 'copy-webpack-plugin';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getPageData (file, settings)
{
	return async () => ({
		...yaml.load(
			await readFile(file, 'utf8')
		),
		'__settings__' : settings
	});
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default async function config ({
	output = 'site', baseUri = '/'
} = {})
{
	return {

		mode : 'production',

		entry :
		{
			'home' : [
				'./src/home.js'
			],

			'404' : [
				'./src/404.js'
			]
		},

		output :
		{
			path : resolve(output),
			library : 'lsp',
			filename : 'js/[contenthash].js',
			assetModuleFilename : 'assets/[contenthash][ext]',
			publicPath : baseUri
		},

		target :
		[
			'web',
			'es5'
		],

		optimization :
		{
			minimizer :
			[
				// JavaScript.
				new TerserPlugin({
					extractComments : false
				}),

				// Stylesheets.
				new CssMinimizerPlugin()
			],

			minimize : true
		},

		module :
		{
			rules :
			[
				{ // JavaScript.
					use :
					[
						{
							loader : 'babel-loader'
						}
					],
					test : /\.js$/
				},

				{ // Stylesheets.
					use :
					[
						MiniCssExtractPlugin.loader,
						{
							loader : 'css-loader'
						},
						{
							loader : 'less-loader'
						}
					],
					test : /\.less$/
				},

				{ // Handlebars.
					use :
					[
						{
							loader : 'handlebars-loader',
							options :
							{
								helperDirs : [
									resolve('./src/templates/helpers')
								],

								partialDirs : [
									resolve('./src/templates/partials')
								]
							}
						}
					],
					test : /\.hbs$/
				},

				{ // File Assets.
					type : 'asset/resource',
					test : /\.(png)$/
				},

				{ // Inline Assets.
					type : 'asset/inline',
					test : /\.(svg)$/
				}
			]
		},

		plugins :
		[
			new MiniCssExtractPlugin({
				filename : 'css/[contenthash].css',
				chunkFilename : 'css/[contenthash].css'
			}),

			new HtmlPlugin({
				filename : 'index.html',
				minify : true,
				template : './src/templates/home.hbs',
				templateParameters : getPageData('data/home.yaml', {
					baseUri
				}),
				chunks : ['home']
			}),

			new HtmlPlugin({
				filename : '404.html',
				minify : true,
				template : './src/templates/404.hbs',
				templateParameters : getPageData('data/404.yaml', {
					baseUri
				}),
				chunks : ['404']
			}),

			new CopyPlugin({
				patterns :
				[
					{ // Assets.
						from : './src/assets',
						to : 'assets'
					},

					{ // Images.
						from : './data/images',
						to : 'images'
					},

					{ // CNAME.
						from : 'CNAME'
					},

					{ // "Well Known".
						from : './data/.well-known',
						to : '.well-known'
					}
				]
			}),

			new WatchExternalFilesPlugin.default({ // eslint-disable-line new-cap
				files : ['./data/**/*']
			})
		],

		devtool : false
	};
}
