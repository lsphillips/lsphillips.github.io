import './styles/404.less';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Marquee from './enhancements/marquee.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function enhance ({
	excuses
})
{
	new Marquee(document.querySelector('.not-found__byline'), excuses)
		.start();
}
