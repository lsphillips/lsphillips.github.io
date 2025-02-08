import protectMeFromMyStupidity             from 'eslint-config-protect-me-from-my-stupidity';
import andFromWritingStupidNodeApplications from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-node-applications';
import andFromWritingStupidWebApplications  from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-web-applications';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default [
	{
		ignores : ['site/**/*']
	},
	...protectMeFromMyStupidity(),
	...andFromWritingStupidWebApplications([
		'src/scripts/**/*.js'
	]),
	...andFromWritingStupidNodeApplications([
		'*.config.js',
		'src/templates/helpers/**/*.js'
	])
];
