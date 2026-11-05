import type { HomeContent } from './en.ts';

// Contenu de l'accueil en néerlandais (contenu par défaut si Directus n'a pas de traduction)
export const home = {
	hero: {
		title: 'Plant je idee. Zie je bedrijf groeien.',
		subtitle:
			'We zijn een kleine, vriendelijke studio in Brussel. We maken websites en apps, en zetten AI aan het werk in je bedrijf. Duidelijke prijzen, geen vakjargon, geen stress.'
	},
	titleLine: {
		title: 'Jij runt het. Wij laten het groeien'
	},
	whatWeDo: {
		tag: 'Wat we doen',
		intro:
			'Je hoeft niets te weten over websites of AI. Je wilt gewoon meer klanten en meer tijd. Dat is precies wat we bouwen.',
		items: [
			{
				title: 'Mensen vinden je',
				text: 'Op dit moment zoekt iemand in je buurt naar wat jij doet, op Google of door het aan ChatGPT te vragen. Laten we zorgen dat jouw naam eerst verschijnt, niet die van je concurrent.'
			},
			{
				title: 'Mensen vertrouwen je',
				text: 'Online heb je maar een paar seconden om een goede eerste indruk te maken. Wij laten die seconden tellen, met een website die echt bij je past.'
			},
			{
				title: 'Je krijgt je tijd terug',
				text: 'Steeds dezelfde vragen beantwoorden, offertes opvolgen, gegevens overtypen… Dat werk geven we aan AI, zodat jij je op je klanten kunt richten.'
			}
		]
	},
	services: {
		title: 'Diensten',
		items: [
			{
				title: 'Webdesign & ontwikkeling',
				problem:
					'Op dit moment zoekt iemand naar wat jij doet, op Google of in ChatGPT. Zonder goede website kiest hij iemand anders. Laten we zorgen dat hij jou vindt en jou kiest.',
				href: '/services/web-design'
			},
			{
				title: 'AI-consulting',
				problem:
					'Je verliest elke week uren aan taken die een computer kan doen. We vinden je grootste tijdvreter en bouwen het AI-systeem dat het van je overneemt.',
				href: '/services/ai-consulting'
			},
			{
				title: 'Mobiele app',
				problem:
					'Je klanten zitten uren op hun telefoon. Een app houdt je op één tik afstand, zodat ze bij jou terugkomen en niet bij een ander.',
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
			},
			{
				question: 'Ik weet niets van AI. Is dat een probleem?',
				answer:
					'Helemaal niet. We leggen alles in eenvoudige woorden uit, zetten alles voor je op en jij ziet alleen het resultaat: elke week uren bespaard.'
			}
		]
	},
	marquee: {
		items: [
			'Laat je bedrijf bloeien',
			'Word gevonden',
			'Vind klanten',
			'Bespaar tijd',
			'Minder stress'
		]
	}
} satisfies HomeContent;
