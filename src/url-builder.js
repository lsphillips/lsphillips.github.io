export function createUrlBuilder ({
	base,
	images,
	js,
	css,
	favicons
}, hash)
{
	return {
		script     : path => base + [js,       path].join('/') + '?' + hash,
		stylesheet : path => base + [css,      path].join('/') + '?' + hash,
		favicon    : path => base + [favicons, path].join('/') + '?' + hash,
		image      : path => base + [images,   path].join('/')
	};
}
