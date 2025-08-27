import {
	posix
} from 'node:path';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function join (base, location, path)
{
	let parts = [location, path];

	if (
		!location.startsWith('/')
	)
	{
		parts.unshift(base);
	}

	return posix.join(...parts);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function createUrlBuilder ({
	base,
	images,
	js,
	css,
	favicons
}, hash)
{
	return {
		script     : path => join(base, js,       path) + '?' + hash,
		stylesheet : path => join(base, css,      path) + '?' + hash,
		image      : path => join(base, images,   path) + '?' + hash,
		favicon    : path => join(base, favicons, path) + '?' + hash
	};
}
