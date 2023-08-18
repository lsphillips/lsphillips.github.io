import './styles/home.less';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Marquee from './enhancements/marquee.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function enhance ({
	characterizations
})
{
	new Marquee(document.querySelector('.profile__title'), characterizations)
		.start();
}
