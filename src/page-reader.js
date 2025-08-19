import {
	join,
	basename
} from 'node:path';
import {
	glob,
	readFile
} from 'node:fs/promises';
import * as yaml from 'js-yaml';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function readYamlFile (path)
{
	const file = await readFile(path, 'utf8');

	return yaml.load(file);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function readPages (datadir)
{
	const pattern = join(datadir, '*.yaml');

	const pages = [];

	for await (
		const file of glob(pattern)
	)
	{
		let name = basename(file, '.yaml');

		// Special case.
		if (name === 'home')
		{
			name = 'index';
		}

		pages.push({
			name, data : await readYamlFile(file)
		});
	}

	return {
		pages, images : join(datadir, 'images')
	};
}
