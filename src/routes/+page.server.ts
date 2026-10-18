import { safeSingleton, safeCollection, imageOrFallback } from '#lib/directus.ts';
import { HOME } from '#lib/content/home/index.ts';
import { getLocale } from '#lib/i18n.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// La langue vient de l'URL (/fr, /es, /nl) : lire « url » recharge le contenu quand elle change
	void url.pathname;
	const locale = getLocale();
	const home = HOME[locale];

	// Chaque section : traduction Directus si elle existe, sinon le texte par défaut du code
	const [
		hero,
		titleLine,
		whatWeDo,
		services,
		ourWork,
		quiz,
		reviews,
		faq,
		marquee,
		projects,
		reviewItems
	] = await Promise.all([
		safeSingleton('Hero', home.hero, locale),
		safeSingleton('TitleLine', home.titleLine, locale),
		safeSingleton('WhatWeDo', home.whatWeDo, locale),
		safeSingleton('Services', home.services, locale),
		safeSingleton('OurWork', home.ourWork, locale),
		safeSingleton('Quiz', home.quiz, locale),
		safeSingleton('Reviews', home.reviews, locale),
		safeSingleton('Faq', home.faq, locale),
		safeSingleton('Marquee', home.marquee, locale),
		// Projets et avis : une collection chacun, avec une vraie image (fichier) par élément
		safeCollection('projects', locale),
		safeCollection('reviews', locale)
	]);

	// Si Directus a des projets / avis, ils remplacent ceux du code.
	// Pas encore d'image dans Directus → on garde l'image du code (même nom).
	if (projects) {
		ourWork.items = projects.map((p) => {
			const fallback = home.ourWork.items.find((f) => f.name === p.name);
			return {
				name: String(p.name ?? ''),
				category: String(p.category ?? fallback?.category ?? ''),
				type: String(p.type ?? fallback?.type ?? ''),
				tagline: String(p.tagline ?? fallback?.tagline ?? ''),
				image: imageOrFallback(p.image, fallback?.image ?? '', { width: 1600 }),
				href: String(p.href ?? fallback?.href ?? '')
			};
		});
	}
	if (reviewItems) {
		reviews.items = reviewItems.map((r) => {
			const fallback = home.reviews.items.find((f) => f.name === r.name);
			return {
				quote: String(r.quote ?? fallback?.quote ?? ''),
				name: String(r.name ?? ''),
				role: String(r.role ?? fallback?.role ?? ''),
				logo: imageOrFallback(r.logo, fallback?.logo ?? '', { width: 160, format: 'png' })
			};
		});
	}

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
