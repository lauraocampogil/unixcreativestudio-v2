import type { ServiceInfo } from './en.ts';

// Pages « info service » en néerlandais
export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Website',
		tagline: 'Je beste eerste indruk.',
		description:
			'Een mooie, snelle website die vertelt wie je bent en waarmee mensen je makkelijk kunnen contacteren.',
		timeline: '2 à 4 weken',
		steps: [
			'Een kort formulier over je bedrijf en je doelen',
			'Een duidelijke structuur en wireframes',
			'Een design op maat dat bij je past',
			'Een snelle website, op gsm en computer',
			'Lancering, Google-instellingen, CMS en een korte opleiding'
		]
	},
	{
		slug: 'seo',
		title: 'SEO',
		tagline: 'Wees de naam die ze eerst vinden.',
		description:
			'We helpen mensen je bedrijf te vinden op Google en Google Maps, elke maand een beetje meer.',
		timeline: 'eerste resultaten na 2 à 3 maanden',
		steps: [
			'Een volledige check van je website op Google',
			'Je Google-bedrijfsprofiel, ingesteld en volledig',
			'Technische verbeteringen: snelheid, structuur, mobiel',
			'Elke maand nieuwe content',
			'Een eenvoudig maandrapport: wat we deden en wat er veranderde'
		]
	},
	{
		slug: 'ads',
		title: 'Advertenties',
		tagline: 'Nieuwe klanten, vanaf deze week.',
		description:
			'Advertenties op Google, Instagram en Facebook die je bedrijf aan de juiste mensen tonen.',
		timeline: 'live binnen ongeveer 1 week',
		steps: [
			'Je doel en budget, samen bepaald',
			'Onderzoek: wie je klanten zijn en waar ze zitten',
			'Design en teksten van de advertenties',
			'Lancering, daarna elke week kleine verbeteringen',
			'Een maandrapport: wat elke klant kost'
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
	{ title: 'Bloeien', text: 'Lanceringsdag. Je dienst staat online en is klaar voor klanten.' }
];
