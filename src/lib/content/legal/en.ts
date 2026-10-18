import type { LegalPages } from './types.ts';
import { MAIL, NAME, ADDRESS, BCE, CLOUDFLARE, OVH } from './shared.ts';

// Pages légales en anglais
export const legal: LegalPages = {
	cookies: {
		title: 'Cookie policy',
		description: 'How cookies are used on the Unix Creative Studio website.',
		sections: [
			{
				title: 'What is a cookie?',
				blocks: [
					{
						p: 'A cookie is a small text file placed on your device when you visit a website. It lets the website remember your actions and preferences for a set period of time.'
					}
				]
			},
			{
				title: 'Cookies used on this website',
				blocks: [
					{
						cards: [
							{
								name: 'Website cookies',
								badge: 'No cookies',
								filled: true,
								text: 'This website does not place any cookies. The language is chosen through the page address (/fr, /es, /nl), not with a cookie.'
							},
							{
								name: 'Audience measurement',
								badge: 'No cookies',
								text: 'We do not use any analytics tool that places cookies (no Google Analytics). No browsing data is sold or used for advertising.'
							},
							{
								name: 'Booking a call (Google Calendar)',
								badge: 'External website',
								text: 'The button to book a 30 min call opens the Google Calendar booking page. That page belongs to Google, which may place its own cookies according to its own policy.'
							}
						]
					}
				]
			},
			{
				title: 'Managing your preferences',
				blocks: [
					{
						p: 'Since this website does not place any cookies, no consent banner is shown. You can still set your browser to block or delete cookies from other websites:'
					},
					{
						links: [
							{
								label: 'Google Chrome',
								url: 'https://support.google.com/chrome/answer/95647?hl=en'
							},
							{
								label: 'Mozilla Firefox',
								url: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop'
							},
							{
								label: 'Safari',
								url: 'https://support.apple.com/en-gb/guide/safari/sfri11471/mac'
							},
							{
								label: 'Microsoft Edge',
								url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
							}
						]
					}
				]
			},
			{
				title: 'Contact',
				blocks: [{ p: `For any question about our cookie policy:<br />${MAIL}` }]
			}
		]
	},

	mentions: {
		title: 'Legal notice',
		description:
			'Legal notice of Unix Creative Studio: website publisher, hosting and contact details.',
		sections: [
			{
				title: '1. Website publisher',
				blocks: [
					{
						p: `This website is published by <strong>Unix Creative Studio</strong>, the self-employed business of ${NAME}.`
					},
					{
						p: `<strong>Address:</strong> ${ADDRESS}, Brussels, Belgium<br /><strong>Company number (BCE/KBO):</strong> ${BCE}<br /><strong>Contact:</strong> ${MAIL}`
					}
				]
			},
			{ title: '2. Publishing director', blocks: [{ p: NAME }] },
			{
				title: '3. Hosting',
				blocks: [
					{
						p: `The website is hosted by:<br /><strong>Cloudflare, Inc.</strong> (website hosting and deployment)<br />${CLOUDFLARE}, United States`
					},
					{
						p: `The content management system (Directus) and the requests sent through the contact form are hosted on a private server at:<br /><strong>${OVH}</strong>, France`
					}
				]
			},
			{
				title: '4. Intellectual property',
				blocks: [
					{
						p: 'All content on this website (texts, illustrations, mascots, logo, icons, animations, etc.) is the exclusive property of Unix Creative Studio, unless stated otherwise. Any reproduction, distribution, modification or publication of this content is forbidden without prior written consent.'
					},
					{
						p: 'The projects shown in the “Our work” section are shown with the agreement of the clients concerned. Their names, logos and visuals remain the property of their respective owners.'
					}
				]
			},
			{
				title: '5. Cookies and audience measurement',
				blocks: [
					{
						p: 'This website does not place any cookies and does not use any analytics tool with cookies. For more information, see our <a href="/cookies">cookie policy</a>.'
					}
				]
			},
			{
				title: '6. Personal data protection',
				blocks: [
					{
						p: 'Unix Creative Studio only collects personal data through the contact form and the call booking. For more information, see our <a href="/politique-de-confidentialite">privacy policy</a>.'
					}
				]
			},
			{
				title: '7. Applicable law and jurisdiction',
				blocks: [
					{
						p: 'This legal notice is governed by Belgian law. Any dispute about the use of this website falls under the exclusive jurisdiction of the courts of the judicial district of Brussels.'
					}
				]
			}
		]
	},

	privacy: {
		title: 'Privacy policy',
		description:
			'Privacy policy of Unix Creative Studio: how your personal data is collected, used and protected.',
		sections: [
			{
				title: '1. Data controller',
				blocks: [{ p: `<strong>Unix Creative Studio</strong> — ${NAME}<br />Contact: ${MAIL}` }]
			},
			{
				title: '2. Personal data we collect',
				blocks: [
					{ p: 'When you fill in the contact form, we collect the following data:' },
					{
						ul: [
							'First and last name',
							'The name of your business',
							'The services you are interested in and when you would like to start',
							'The description of your project (optional)',
							'Email address and phone number (optional)',
							'How you heard about Unix Creative Studio'
						]
					},
					{
						p: 'If you book a call, Google Calendar asks for your name and email address to create the appointment.'
					}
				]
			},
			{
				title: '3. How we collect it',
				blocks: [
					{
						p: 'The data is collected through the contact form on this website. It is saved in our content management system (Directus), hosted on a private server in France, and sent to us by email so we can answer you quickly.'
					}
				]
			},
			{
				title: '4. Why we use it',
				blocks: [
					{
						ul: [
							'To answer your request and contact you by email or phone',
							'To prepare a proposal or a quote for your project',
							'To organise a discovery call if you book one'
						]
					}
				]
			},
			{
				title: '5. Legal basis',
				blocks: [
					{
						p: 'We process your data because you asked us to: it is needed to answer you and prepare a possible collaboration (pre-contractual measures, article 6.1.b GDPR). The question “How did you hear about us?” is based on our legitimate interest in understanding how clients find us.'
					}
				]
			},
			{
				title: '6. How long we keep it',
				blocks: [
					{
						p: 'Requests sent through the form are kept for 12 months at most if they do not lead to a collaboration. If you become a client, your data is kept for the length of the project, then for the time required by Belgian accounting and legal obligations.'
					}
				]
			},
			{
				title: '7. Audience measurement',
				blocks: [
					{
						p: 'This website does not use any analytics tool that collects personal data or places cookies. For more details, see our <a href="/cookies">cookie policy</a>.'
					}
				]
			},
			{
				title: '8. Who receives the data',
				blocks: [
					{
						p: 'Your data is never sold. It may be processed by the following services, which help us run the website:'
					},
					{
						ul: [
							'Directus (self-hosted content management system) — OVH server, France',
							'OVH SAS (server hosting) — France',
							'Cloudflare (website hosting) — United States, GDPR-compliant transfer framework',
							'Resend (sending the notification email) — United States, GDPR-compliant transfer framework',
							'Google LLC (receiving emails with Gmail, call booking with Google Calendar and Google Meet) — United States, GDPR-compliant transfer framework'
						]
					}
				]
			},
			{
				title: '9. Your rights',
				blocks: [
					{ p: 'Under the GDPR, you have the following rights:' },
					{
						ul: [
							'Right of access to your data',
							'Right to rectification',
							'Right to erasure',
							'Right to restriction of processing',
							'Right to data portability',
							'Right to object'
						]
					},
					{
						p: `To use these rights: ${MAIL}<br />You can also file a complaint with the <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer">Data Protection Authority</a>.`
					}
				]
			},
			{
				title: '10. Changes',
				blocks: [
					{
						p: 'Unix Creative Studio may update this policy at any time. Any change will be published on this page.'
					}
				]
			}
		]
	}
};
