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
			'A beautiful, fast website that tells people who you are, and makes it easy for them to contact you.',
		timeline: '2-4 weeks',
		steps: [
			'A short form about your business and goals',
			'Clear structure and wireframes',
			'A custom design that feels like you',
			'A fast build, on phone and computer',
			'Launch, Google setup, CMS and a short training'
		]
	},
	{
		slug: 'seo',
		title: 'SEO',
		tagline: 'Be the name they find first.',
		description:
			'We help people find your business on Google and Google Maps, a little more every month.',
		timeline: 'first results in 2-3 months',
		steps: [
			'A full check of your website on Google',
			'Your Google Business Profile, set up and complete',
			'Technical fixes: speed, structure, mobile',
			'New content every month',
			'A simple monthly report: what we did, what changed'
		]
	},
	{
		slug: 'ads',
		title: 'Ads',
		tagline: 'New clients, starting this week.',
		description:
			'Ads on Google, Instagram and Facebook that show your business to the right people.',
		timeline: 'live in about 1 week',
		steps: [
			'Your goal and budget, set together',
			'Research: who your clients are and where they are',
			'Ad design and text',
			'Launch, then small improvements every week',
			'A monthly report: what each client costs'
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
	{ title: 'Bloom', text: 'Launch day. Your service is live and ready for clients.' }
];
