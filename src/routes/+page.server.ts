import { safeSingleton } from '#lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const hero = await safeSingleton('Hero', {
		title: 'Plant your idea. Watch your business grow.',
		subtitle:
			'We are a small, friendly studio in Brussels. We make websites, apps and Google work for you. Clear prices, no tech talk, no stress.'
	});

	const blocks = [{ type: 'HeroBlock', props: hero }];

	return { blocks };
};
