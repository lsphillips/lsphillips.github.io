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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class Marquee
{
	#node                  = null;
	#phrase                = 0;
	#phrases               = [];
	#keyPressDelay         = 0;
	#keyPressDelayVariance = 0;
	#phraseDelay           = 0;
	#running               = false;

	constructor (element, phrases, {
		keyPressDelay         = 125,
		keyPressDelayVariance = 50,
		phraseDelay           = 2500
	} = {})
	{
		this.#keyPressDelay         = keyPressDelay;
		this.#keyPressDelayVariance = keyPressDelayVariance;
		this.#phraseDelay           = phraseDelay;
		this.#phrases               = phrases;
		this.#node                  = getTextNode(element);

		if (this.#node)
		{
			this.#phrases.push(this.#node.nodeValue);
		}
		else
		{
			this.#node = element.appendChild(
				document.createTextNode('')
			);
		}
	}

	async start ()
	{
		this.#running = true;

		while (this.#running)
		{
			// Wait.
			await wait(this.#phraseDelay);

			// Clear.
			await this.#clear();

			// Type phrase.
			await this.#print(
				this.#phrases[this.#phrase]
			);

			this.#phrase = (this.#phrase === this.#phrases.length - 1) ? 0 : this.#phrase + 1;
		}
	}

	pause ()
	{
		this.#running = false;
	}

	#getKeyDelay ()
	{
		return Math.floor(
			Math.random() * ((this.#keyPressDelayVariance * 2) + (this.#keyPressDelay - this.#keyPressDelayVariance))
		);
	}

	async #print (phrase)
	{
		for (let i = 0, l = phrase.length; i < l; ++i)
		{
			// Wait.
			await wait(
				this.#getKeyDelay()
			);

			// Print character.
			this.#node.nodeValue += phrase[i];
		}
	}

	async #clear ()
	{
		let value;

		while (
			value = this.#node.nodeValue.trim()
		)
		{
			// Remove character.
			this.#node.nodeValue = value.substring(0, value.length - 1);

			// Wait.
			await wait(
				this.#getKeyDelay()
			);
		}
	}
}
