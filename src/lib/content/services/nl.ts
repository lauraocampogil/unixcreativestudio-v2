import type { ServiceInfo } from './en.ts';

// Pages « info service » en néerlandais
export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Website',
		tagline: 'Je beste eerste indruk.',
		description:
			'Een mooie, snelle website die vertelt wie je bent, het makkelijk maakt om je te contacteren en je laat vinden op Google en in AI-antwoorden.',
		timeline: '2 à 4 weken',
		steps: [
			'Een kort formulier over je bedrijf en je doelen',
			'Een duidelijke structuur en wireframes',
			'Een design op maat dat bij je past',
			'Een snelle website, op gsm en computer',
			'Lancering, Google- en AI-zoekinstellingen, CMS en een korte opleiding'
		]
	},
	{
		slug: 'ai-consulting',
		title: 'AI-consulting',
		tagline: 'Minder routinewerk. Meer business.',
		description:
			'We vinden de taak die je bedrijf het meest vertraagt en bouwen een AI-systeem dat het voor je doet: klanten antwoorden, offertes opvolgen, e-mails sorteren, afspraken inplannen.',
		timeline: 'eerste systeem live in 2-4 weken',
		steps: [
			'Een gratis gesprek om je grootste knelpunt te vinden',
			'Een duidelijk plan: wat we automatiseren, hoeveel uur het je bespaart, de prijs',
			'We bouwen je AI-systeem met de tools die je al gebruikt',
			'Lancering, een korte opleiding voor jou en je team, en dagelijkse controle',
			'Elke week: we meten, verbeteren en kiezen de volgende taak om te automatiseren'
		]
	},
	{
		slug: 'mobile-app',
		title: 'Mobiele app',
		tagline: 'Je bedrijf, in hun broekzak.',
		description:
			'Een app voor iPhone en Android, zodat je klanten kunnen boeken, kopen en terugkomen.',
		timeline: 'eerste versie na 8 à 10 weken',
		steps: [
			'Je idee en de functies die het meest tellen',
			'Schermen en wireframes',
			'Een design op maat',
			'De app, gebouwd voor iPhone en Android',
			'Gepubliceerd in de App Store en Google Play'
		]
	}
];

export const howWeWork = [
	{ title: 'Zaaien', text: 'Je vult ons korte formulier in of plant een gesprek van 30 min.' },
	{
		title: 'Planten',
		text: 'Krijg je plan. Binnen 48 uur: een duidelijk plan, een vaste prijs en een vaste datum, op papier.'
	},
	{
		title: 'Groeien',
		text: 'We gaan aan de slag. Je ziet de vooruitgang en geeft bij elke stap je OK.'
	},
	{
		title: 'Bloeien',
		text: 'Lanceringsdag. Je website, app of AI-systeem staat live en werkt voor jou.'
	}
];
