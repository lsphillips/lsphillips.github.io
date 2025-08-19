import {
	join
} from 'node:path';
import {
	mkdir,
	writeFile
} from 'node:fs/promises';
import nano from 'htmlnano';
import {
	createUrlBuilder
} from './url-builder.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function renderPage (name, data, urls)
{
	const {
		render
	} = await import(`./templates/${name}.js`);

	if (!render)
	{
		throw new Error(`Template ${name} does not export a render method.`);
	}

	const page = await nano.process(
		render(data, urls),
		{
			collapseAttributeWhitespace : true,
			collapseWhitespace          : 'aggressive',
			deduplicateAttributeValues  : true,
			removeComments              : 'all',
			removeEmptyAttributes       : true,
			removeAttributeQuotes       : false,
			removeUnusedCss             : true,
			minifyCss                   : false,
			minifyJs                    : false,
			minifyJson                  : true,
			minifySvg                   : false,
			minifyConditionalComments   : true,
			removeRedundantAttributes   : true,
			collapseBooleanAttributes   : true,
			mergeStyles                 : false,
			mergeScripts                : false,
			sortAttributesWithLists     : false,
			sortAttributes              : true,
			minifyUrls                  : false,
			removeOptionalTags          : false,
			normalizeAttributeValues    : false
		}
	);

	return page.html;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function renderPages (outdir, pages, {
	paths,
	timestamp
})
{
	// Ensure output directory exists.
	await mkdir(outdir, {
		recursive : true
	});

	const urls = createUrlBuilder(paths, timestamp);

	for (const { name, data } of pages)
	{
		const html = await renderPage(name, data, urls);

		await writeFile(join(outdir, `${name}.html`), html, 'utf8');
	}
}
