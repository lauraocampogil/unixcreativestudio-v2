// Pages « info service » (/services/[slug]) en anglais.
// Plus tard, on pourra le déplacer dans une collection Directus « services ».
export type ServiceInfo = {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	timeline: string;
	steps: string[];
};

export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Website',
		tagline: 'Your best first impression.',
		description:
			'A beautiful, fast website that tells people who you are, makes it easy to contact you, and gets you found on Google and in AI answers.',
		timeline: '2-4 weeks',
		steps: [
			'A short form about your business and goals',
			'Clear structure and wireframes',
			'A custom design that feels like you',
			'A fast build, on phone and computer',
			'Launch, Google & AI search setup, CMS and a short training'
		]
	},
	{
		slug: 'ai-consulting',
		title: 'AI consulting',
		tagline: 'Less busywork. More business.',
		description:
			'We find the task that slows your business down the most, then build an AI system that does it for you: answering clients, following up on quotes, sorting emails, booking appointments.',
		timeline: 'first system live in 2-4 weeks',
		steps: [
			'A free call to find your biggest bottleneck',
			'A clear plan: what we automate, the hours it saves you, the price',
			'We build your AI system with the tools you already use',
			'Launch, a short training for you and your team, and daily checks',
			'Every week: we measure, improve and pick the next task to automate'
		]
	},
	{
		slug: 'mobile-app',
		title: 'Mobile app',
		tagline: 'Your business, in their pocket.',
		description: 'An app for iPhone and Android, so your clients can book, buy and come back.',
		timeline: 'first version in 8-10 weeks',
		steps: [
			'Your idea and the features that matter the most',
			'Screens and wireframes',
			'A custom design',
			'The app, built for iPhone and Android',
			'Published on the App Store and Google Play'
		]
	}
];

export const howWeWork = [
	{ title: 'Seed', text: 'You fill in our short form or take a 30 min call.' },
	{
		title: 'Plant',
		text: 'Get your plan. Within 48 hours: a clear plan, a fixed price and a fixed date, in writing.'
	},
	{ title: 'Grow', text: 'We get to work. You see the progress and say OK at every step.' },
	{
		title: 'Bloom',
		text: 'Launch day. Your website, app or AI system is live and working for you.'
	}
];
