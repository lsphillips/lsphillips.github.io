function wait (delay)
{
	return new Promise(resolve =>
	{
		setTimeout(resolve, delay);
	});
}

function getTextNode (element)
{
	const nodes = element.childNodes;

	for (let i = 0, l = nodes.length; i < l; ++i)
	{
		if (nodes[i].nodeType === 3)
		{
			return nodes[i];
		}
	}

	return null;
}

function *keyPressSpacer (keyPressDelay, keyPressDelayVariance)
{
	while (true)
	{
		yield Math.floor(
			Math.random() * ((keyPressDelayVariance * 2) + (keyPressDelay - keyPressDelayVariance))
		);
	}
}

async function print (node, phrase, spacer)
{
	for (let i = 0, l = phrase.length; i < l; ++i)
	{
		// Wait.
		await wait(spacer.next().value);

		// Print character.
		node.nodeValue += phrase[i];
	}
}

async function clear (node, spacer)
{
	let value;

	while (
		value = node.nodeValue.trim()
	)
	{
		// Remove character.
		node.nodeValue = value.substring(0, value.length - 1);

		// Wait.
		await wait(spacer.next().value);
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function marquee (element, values, {
	keyPressDelay         = 125,
	keyPressDelayVariance = 50,
	phraseDelay           = 2500
} = {})
{
	const node = getTextNode(element);

	const phrases = [
		...values, node.nodeValue
	];

	const spacer = keyPressSpacer(keyPressDelay, keyPressDelayVariance);

	let phrase = 0;

	while (true)
	{
		// Wait.
		await wait(phraseDelay);

		// Clear.
		await clear(node, spacer);

		// Type phrase.
		await print(node, phrases[phrase], spacer);

		// Calculate next phrase.
		phrase = (phrase === phrases.length - 1) ? 0 : phrase + 1;
	}
}
