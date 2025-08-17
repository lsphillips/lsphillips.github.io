import { marquee } from './marquee.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function enhance ({
	characterizations
})
{
	marquee(document.querySelector('.profile__title'), characterizations);
}
