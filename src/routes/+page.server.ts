import { safeSingleton } from '#lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const hero = await safeSingleton('Hero', {
		title: 'Plant your idea. Watch your business grow.',
		subtitle:
			'We are a small, friendly studio in Brussels. We make websites, apps and Google work for you. Clear prices, no tech talk, no stress.'
	});

	const titleLine = await safeSingleton('TitleLine', {
		title: 'You run it. We help it grow'
	});

	const whatWeDo = await safeSingleton('WhatWeDo', {
		tag: 'What we do?',
		intro:
			"You don't need to know about websites, Google or ads. You just want people to find you, and get in touch. That's exactly what we build.",
		items: [
			{
				title: 'People find you',
				text: "Right now, someone near you is searching for what you do. Let's make sure your name shows up first, not your competitor's."
			},
			{
				title: 'People trust you',
				text: 'You only get a few seconds to make a good first impression online. We make those seconds count, with a website that feels just like you.'
			},
			{
				title: 'People contact you',
				text: "A visitor who can't find your button is a client you lose. We make reaching you easy: one tap to call, write or book."
			}
		]
	});

	const blocks = [
		{ type: 'HeroBlock', props: hero },
		{ type: 'TitleLineBlock', props: titleLine },
		{ type: 'WhatWeDoBlock', props: whatWeDo }
	];

	return { blocks };
};
