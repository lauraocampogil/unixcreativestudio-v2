import type { LegalPages } from './types.ts';
import { MAIL, NAME, ADDRESS, BCE, CLOUDFLARE, OVH } from './shared.ts';

// Pages légales en néerlandais
export const legal: LegalPages = {
	cookies: {
		title: 'Cookiebeleid',
		description: 'Informatie over het gebruik van cookies op de website van Unix Creative Studio.',
		sections: [
			{
				title: 'Wat is een cookie?',
				blocks: [
					{
						p: 'Een cookie is een klein tekstbestand dat op je toestel wordt geplaatst wanneer je een website bezoekt. Zo kan de website je acties en voorkeuren een tijdje onthouden.'
					}
				]
			},
			{
				title: 'Cookies op deze website',
				blocks: [
					{
						cards: [
							{
								name: 'Cookies van de website',
								badge: 'Geen cookies',
								filled: true,
								text: 'Deze website plaatst geen cookies. De taal wordt gekozen via het adres van de pagina (/fr, /es, /nl), niet met een cookie.'
							},
							{
								name: 'Bezoekersstatistieken',
								badge: 'Geen cookies',
								text: 'We gebruiken geen statistiektool die cookies plaatst (geen Google Analytics). Geen enkel surfgegeven wordt verkocht of gebruikt voor reclame.'
							},
							{
								name: 'Een gesprek boeken (Google Agenda)',
								badge: 'Externe website',
								text: 'De knop om een gesprek van 30 min te boeken opent de afsprakenpagina van Google Agenda. Die pagina is van Google, dat er volgens zijn eigen beleid cookies kan plaatsen.'
							}
						]
					}
				]
			},
			{
				title: 'Je voorkeuren beheren',
				blocks: [
					{
						p: 'Omdat deze website geen cookies plaatst, tonen we geen toestemmingsbanner. Je kan je browser wel instellen om cookies van andere websites te blokkeren of te verwijderen:'
					},
					{
						links: [
							{
								label: 'Google Chrome',
								url: 'https://support.google.com/chrome/answer/95647?hl=nl'
							},
							{
								label: 'Mozilla Firefox',
								url: 'https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen'
							},
							{
								label: 'Safari',
								url: 'https://support.apple.com/nl-be/guide/safari/sfri11471/mac'
							},
							{
								label: 'Microsoft Edge',
								url: 'https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
							}
						]
					}
				]
			},
			{
				title: 'Contact',
				blocks: [{ p: `Heb je een vraag over ons cookiebeleid?<br />${MAIL}` }]
			}
		]
	},

	mentions: {
		title: 'Wettelijke vermeldingen',
		description:
			'Wettelijke vermeldingen van Unix Creative Studio: uitgever, hosting en contactgegevens.',
		sections: [
			{
				title: '1. Uitgever van de website',
				blocks: [
					{
						p: `Deze website wordt uitgegeven door <strong>Unix Creative Studio</strong>, zelfstandige activiteit van ${NAME}.`
					},
					{
						p: `<strong>Adres:</strong> ${ADDRESS}, Brussel, België<br /><strong>Ondernemingsnummer (KBO):</strong> ${BCE}<br /><strong>Contact:</strong> ${MAIL}`
					}
				]
			},
			{ title: '2. Verantwoordelijke uitgever', blocks: [{ p: NAME }] },
			{
				title: '3. Hosting',
				blocks: [
					{
						p: `De website wordt gehost door:<br /><strong>Cloudflare, Inc.</strong> (hosting en publicatie van de website)<br />${CLOUDFLARE}, Verenigde Staten`
					},
					{
						p: `Het contentbeheersysteem (Directus) en de aanvragen via het contactformulier staan op een private server bij:<br /><strong>${OVH}</strong>, Frankrijk`
					}
				]
			},
			{
				title: '4. Intellectuele eigendom',
				blocks: [
					{
						p: 'Alle inhoud op deze website (teksten, illustraties, mascottes, logo, iconen, animaties, enz.) is exclusief eigendom van Unix Creative Studio, tenzij anders vermeld. Elke reproductie, verspreiding, wijziging of publicatie zonder voorafgaande schriftelijke toestemming is verboden.'
					},
					{
						p: 'De projecten in de sectie “Projecten” worden getoond met toestemming van de betrokken klanten. Hun namen, logo’s en beelden blijven eigendom van hun respectieve eigenaars.'
					}
				]
			},
			{
				title: '5. Cookies en bezoekersstatistieken',
				blocks: [
					{
						p: 'Deze website plaatst geen cookies en gebruikt geen statistiektool met cookies. Meer info vind je in ons <a href="/cookies">cookiebeleid</a>.'
					}
				]
			},
			{
				title: '6. Bescherming van persoonsgegevens',
				blocks: [
					{
						p: 'Unix Creative Studio verzamelt persoonsgegevens alleen via het contactformulier en het boeken van een gesprek. Meer info vind je in ons <a href="/politique-de-confidentialite">privacybeleid</a>.'
					}
				]
			},
			{
				title: '7. Toepasselijk recht en bevoegde rechtbank',
				blocks: [
					{
						p: 'Deze wettelijke vermeldingen vallen onder het Belgisch recht. Elk geschil over het gebruik van de website valt onder de exclusieve bevoegdheid van de rechtbanken van het gerechtelijk arrondissement Brussel.'
					}
				]
			}
		]
	},

	privacy: {
		title: 'Privacybeleid',
		description:
			'Privacybeleid van Unix Creative Studio: hoe je persoonsgegevens worden verzameld, gebruikt en beschermd.',
		sections: [
			{
				title: '1. Verwerkingsverantwoordelijke',
				blocks: [{ p: `<strong>Unix Creative Studio</strong> — ${NAME}<br />Contact: ${MAIL}` }]
			},
			{
				title: '2. Welke gegevens we verzamelen',
				blocks: [
					{ p: 'Wanneer je het contactformulier invult, verzamelen we de volgende gegevens:' },
					{
						ul: [
							'Voornaam en achternaam',
							'De naam van je bedrijf',
							'De diensten die je interesseren en wanneer je wil beginnen',
							'De beschrijving van je project (optioneel)',
							'E-mailadres en telefoonnummer (optioneel)',
							'Hoe je Unix Creative Studio hebt gevonden'
						]
					},
					{
						p: 'Als je een gesprek boekt, vraagt Google Agenda je naam en e-mailadres om de afspraak te maken.'
					}
				]
			},
			{
				title: '3. Hoe we ze verzamelen',
				blocks: [
					{
						p: 'De gegevens worden verzameld via het contactformulier op de website. Ze worden bewaard in ons contentbeheersysteem (Directus), op een private server in Frankrijk, en per e-mail naar ons gestuurd zodat we je snel kunnen antwoorden.'
					}
				]
			},
			{
				title: '4. Waarvoor we ze gebruiken',
				blocks: [
					{
						ul: [
							'Je aanvraag beantwoorden en je contacteren per e-mail of telefoon',
							'Een voorstel of offerte voor je project voorbereiden',
							'Een kennismakingsgesprek organiseren als je er een boekt'
						]
					}
				]
			},
			{
				title: '5. Rechtsgrond',
				blocks: [
					{
						p: 'We verwerken je gegevens omdat jij erom vraagt: het is nodig om je te antwoorden en een mogelijke samenwerking voor te bereiden (precontractuele maatregelen, artikel 6.1.b AVG). De vraag “Hoe heb je ons gevonden?” steunt op ons gerechtvaardigd belang om te begrijpen hoe klanten ons vinden.'
					}
				]
			},
			{
				title: '6. Hoe lang we ze bewaren',
				blocks: [
					{
						p: 'Aanvragen via het formulier bewaren we maximaal 12 maanden als ze niet tot een samenwerking leiden. Word je klant, dan bewaren we je gegevens tijdens het project en daarna zo lang als de Belgische boekhoudkundige en wettelijke verplichtingen vereisen.'
					}
				]
			},
			{
				title: '7. Bezoekersstatistieken',
				blocks: [
					{
						p: 'Deze website gebruikt geen statistiektool die persoonsgegevens verzamelt of cookies plaatst. Meer info vind je in ons <a href="/cookies">cookiebeleid</a>.'
					}
				]
			},
			{
				title: '8. Wie de gegevens ontvangt',
				blocks: [
					{
						p: 'Je gegevens worden nooit verkocht. Ze kunnen verwerkt worden door de volgende diensten, die ons helpen de website te laten werken:'
					},
					{
						ul: [
							'Directus (zelf gehost contentbeheersysteem) — OVH-server, Frankrijk',
							'OVH SAS (hosting van de server) — Frankrijk',
							'Cloudflare (hosting van de website) — Verenigde Staten, AVG-conform doorgiftekader',
							'Resend (verzending van de meldingsmail) — Verenigde Staten, AVG-conform doorgiftekader',
							'Google LLC (ontvangst van e-mails via Gmail, gesprekken boeken via Google Agenda en Google Meet) — Verenigde Staten, AVG-conform doorgiftekader'
						]
					}
				]
			},
			{
				title: '9. Je rechten',
				blocks: [
					{ p: 'Volgens de AVG heb je de volgende rechten:' },
					{
						ul: [
							'Recht op inzage in je gegevens',
							'Recht op verbetering',
							'Recht op verwijdering',
							'Recht op beperking van de verwerking',
							'Recht op overdraagbaarheid van gegevens',
							'Recht van bezwaar'
						]
					},
					{
						p: `Om deze rechten uit te oefenen: ${MAIL}<br />Je kan ook een klacht indienen bij de <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">Gegevensbeschermingsautoriteit</a>.`
					}
				]
			},
			{
				title: '10. Wijzigingen',
				blocks: [
					{
						p: 'Unix Creative Studio kan dit beleid op elk moment bijwerken. Elke wijziging wordt op deze pagina gepubliceerd.'
					}
				]
			}
		]
	}
};
