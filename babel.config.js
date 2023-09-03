export default function config (api)
{
	api.cache(true);

	return {

		presets :
		[
			['@babel/env', {
				useBuiltIns : 'entry',
				targets     : 'last 2 major versions and >0.25% and not ie >= 0',
				corejs      : '3.32'
			}]
		],

		ignore :
		[
			/(node_modules)/
		]
	};
}
