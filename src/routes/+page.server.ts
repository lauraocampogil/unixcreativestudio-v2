import { safeSingleton } from '#lib/directus.ts';
import { HOME } from '#lib/content/home/index.ts';
import { getLocale } from '#lib/i18n.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// La langue vient de l'URL (/fr, /es, /nl) : lire « url » recharge le contenu quand elle change
	void url.pathname;
	const locale = getLocale();
	const home = HOME[locale];

	// Chaque section : traduction Directus si elle existe, sinon le texte par défaut du code
	const [hero, titleLine, whatWeDo, services, ourWork, quiz, reviews, faq, marquee] =
		await Promise.all([
			safeSingleton('Hero', home.hero, locale),
			safeSingleton('TitleLine', home.titleLine, locale),
			safeSingleton('WhatWeDo', home.whatWeDo, locale),
			safeSingleton('Services', home.services, locale),
			safeSingleton('OurWork', home.ourWork, locale),
			safeSingleton('Quiz', home.quiz, locale),
			safeSingleton('Reviews', home.reviews, locale),
			safeSingleton('Faq', home.faq, locale),
			safeSingleton('Marquee', home.marquee, locale)
		]);

	const blocks = [
		{ type: 'HeroBlock', props: hero },
		{ type: 'TitleLineBlock', props: titleLine },
		{ type: 'WhatWeDoBlock', props: whatWeDo },
		{ type: 'ServicesBlock', props: services },
		{ type: 'OurWorkBlock', props: ourWork },
		{ type: 'QuizBlock', props: quiz },
		{ type: 'ReviewsBlock', props: reviews },
		{ type: 'FaqBlock', props: faq },
		{ type: 'MarqueeBlock', props: marquee }
	];

	return { blocks };
};
