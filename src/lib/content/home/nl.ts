import type { HomeContent } from './en.ts';

// Contenu de l'accueil en néerlandais (contenu par défaut si Directus n'a pas de traduction)
export const home = {
	hero: {
		title: 'Plant je idee. Zie je bedrijf groeien.',
		subtitle:
			'Wij zijn een kleine, vriendelijke studio in Brussel. We laten websites, apps en Google voor je werken. Duidelijke prijzen, geen vakjargon, geen stress.'
	},
	titleLine: {
		title: 'Jij runt het. Wij laten het groeien'
	},
	whatWeDo: {
		tag: 'Wat we doen',
		intro:
			'Je hoeft niets te weten over websites, Google of advertenties. Je wil gewoon dat mensen je vinden en contact opnemen. Dat is precies wat we bouwen.',
		items: [
			{
				title: 'Mensen vinden je',
				text: 'Op dit moment zoekt iemand in je buurt naar wat jij doet. Laten we zorgen dat jouw naam eerst verschijnt, niet die van je concurrent.'
			},
			{
				title: 'Mensen vertrouwen je',
				text: 'Online heb je maar een paar seconden voor een goede eerste indruk. Wij laten die seconden tellen, met een website die echt bij je past.'
			},
			{
				title: 'Mensen nemen contact op',
				text: 'Een bezoeker die je knop niet vindt, is een klant die je verliest. Wij maken contact makkelijk: één tik om te bellen, te schrijven of te boeken.'
			}
		]
	},
	services: {
		title: 'Diensten',
		items: [
			{
				title: 'Webdesign & ontwikkeling',
				problem:
					'Op dit moment zoekt iemand naar wat jij doet. Zonder goede website kiest die persoon iemand anders. Laten we zorgen dat ze voor jou kiezen.',
				href: '/services/web-design'
			},
			{
				title: 'SEO',
				problem:
					'Elke dag zoeken mensen op Google naar jouw dienst. Sta je niet op de eerste pagina, dan krijgt je concurrent het telefoontje.',
				href: '/services/seo'
			},
			{
				title: 'Advertenties',
				problem:
					'Je concurrenten staan al op het scherm van je klanten. Met advertenties sta jij er ook, vanaf de eerste week.',
				href: '/services/ads'
			},
			{
				title: 'Mobiele app',
				problem:
					'Je klanten zitten uren op hun telefoon. Met een app ben je maar één tik ver, zodat ze bij jou terugkomen en niet bij een ander.',
				href: '/services/mobile-app'
			}
		]
	},
	ourWork: {
		tag: 'Projecten',
		title: 'Bedrijven die we hielpen groeien',
		items: [
			{
				name: 'Brussels Summit Academy',
				category: 'Voetbalacademie',
				type: 'Website',
				tagline: 'Een sportieve website die nieuwe spelers aantrekt',
				image: '',
				href: 'https://brussels-summitacademy.be/'
			},
			{
				name: 'Shiynelly Lashes',
				category: 'Wimperstudio',
				type: 'Website',
				tagline: 'Een elegante website met online boeken',
				image: '',
				href: 'https://shiynellylashes.com/'
			},
			{
				name: 'Entraide Bruxelles',
				category: 'Vzw',
				type: 'Website',
				tagline: 'Een frisse website die makkelijk leest',
				image: '',
				href: 'https://www.entraide-bruxelles.be/'
			},
			{
				name: 'Yaniswash',
				category: 'Carwash',
				type: 'Website',
				tagline: 'Een wasbeurt boeken in een paar klikken',
				image: '',
				href: 'https://yaniswash.be'
			},
			{
				name: 'Inesscoach',
				category: 'Mentale coaching voetbal',
				type: 'Website',
				tagline: 'Een sessie online boeken en betalen',
				image: '',
				href: 'https://www.iness-coach.com/'
			}
		]
	},
	quiz: {
		tag: 'Quiz',
		title: 'Weet je niet waar te beginnen?',
		intro:
			'Geen probleem, de meeste mensen weten het niet. Beantwoord 3 korte vragen en we wijzen je de juiste weg. Geen gesprek nodig.',
		questionsLabel: 'Vragen',
		recommendationLabel: 'Ons advies',
		cta: 'Aan de slag'
	},
	// ⚠️ Avis d'exemple : à remplacer par les vrais avis des clients (ou à leur faire valider) avant la mise en ligne
	reviews: {
		label: 'Wat onze klanten zeggen',
		items: [
			{
				quote:
					'De beste designer van de stad: goed werk, een fijn persoon, luistert altijd. Dankzij Unix krijgen we veel meer bezoekers van overal.',
				name: 'InessCoach',
				role: 'Oprichtster',
				logo: ''
			},
			{
				quote:
					'Onze nieuwe website is duidelijk en voor iedereen makkelijk te lezen. Gezinnen vinden onze activiteiten in een paar seconden, en we krijgen elke maand meer inschrijvingen.',
				name: 'Entraide Bruxelles',
				role: 'Coördinator',
				logo: ''
			},
			{
				quote:
					'Unix begreep onze academie meteen. De website voelt sportief en trots, en nieuwe spelers schrijven zich nu rechtstreeks online in.',
				name: 'Brussels Summit Academy',
				role: 'Oprichter',
				logo: ''
			}
		]
	},
	faq: {
		tag: 'FAQ',
		title: 'Goed om te weten',
		text: 'Staat je vraag er niet tussen? We antwoorden meestal dezelfde dag.',
		linkLabel: 'Neem contact op',
		linkHref: '/contact',
		items: [
			{
				question: 'Ik weet niet wat ik nodig heb. Waar begin ik?',
				answer: 'Met de quiz van 3 vragen. Die vertelt je welke dienst bij je past en wat het kost.'
			},
			{
				question: 'Moet ik jullie bellen?',
				answer:
					'Helemaal niet. Het formulier, e-mail of WhatsApp werkt prima. We bellen alleen als jij dat wil.'
			},
			{
				question: 'Kan ik de teksten later zelf aanpassen?',
				answer:
					'Ja. Als je wil, voegen we een eenvoudige editor toe zodat je zelf teksten en foto’s kan aanpassen.'
			},
			{
				question: 'Van wie is de website?',
				answer: 'Van jou. De website, de domeinnaam en alle accounts staan op jouw naam.'
			},
			{
				question: 'Wat als er iets kapotgaat?',
				answer: 'Tot een jaar na de lancering lossen we elke technische bug gratis op.'
			}
		]
	},
	marquee: {
		items: [
			'Laat je bedrijf bloeien',
			'Word gevonden',
			'Vind klanten',
			'Groei online',
			'Minder stress'
		]
	}
} satisfies HomeContent;
