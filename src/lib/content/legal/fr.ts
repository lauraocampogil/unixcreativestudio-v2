import type { LegalPages } from './types.ts';
import { MAIL, APD, NAME, ADDRESS, BCE, CLOUDFLARE, OVH } from './shared.ts';

// Pages légales en français
export const legal: LegalPages = {
	cookies: {
		title: 'Politique de cookies',
		description: "Informations sur l'utilisation des cookies sur le site de Unix Creative Studio.",
		sections: [
			{
				title: "Qu'est-ce qu'un cookie ?",
				blocks: [
					{
						p: 'Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site web. Il permet au site de mémoriser vos actions et préférences pendant une durée déterminée.'
					}
				]
			},
			{
				title: 'Cookies utilisés sur ce site',
				blocks: [
					{
						cards: [
							{
								name: 'Cookies du site',
								badge: 'Aucun cookie',
								filled: true,
								text: 'Ce site ne dépose aucun cookie. La langue est choisie grâce à l’adresse de la page (/fr, /es, /nl), pas avec un cookie.'
							},
							{
								name: "Mesure d'audience",
								badge: 'Aucun cookie',
								text: "Nous n'utilisons aucun outil de mesure d'audience qui dépose des cookies (pas de Google Analytics). Aucune donnée de navigation n'est revendue ni utilisée à des fins publicitaires."
							},
							{
								name: 'Prise de rendez-vous (Google Agenda)',
								badge: 'Site externe',
								text: 'Le bouton pour réserver un appel de 30 min ouvre la page de rendez-vous de Google Agenda. Ce site appartient à Google, qui peut y déposer ses propres cookies selon sa propre politique.'
							}
						]
					}
				]
			},
			{
				title: 'Gérer vos préférences',
				blocks: [
					{
						p: "Comme ce site ne dépose aucun cookie, aucun bandeau de consentement n'est affiché. Vous pouvez toutefois configurer votre navigateur pour bloquer ou supprimer les cookies des autres sites :"
					},
					{
						links: [
							{
								label: 'Google Chrome',
								url: 'https://support.google.com/chrome/answer/95647?hl=fr'
							},
							{
								label: 'Mozilla Firefox',
								url: 'https://support.mozilla.org/fr/kb/activer-desactiver-cookies'
							},
							{
								label: 'Safari',
								url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac'
							},
							{
								label: 'Microsoft Edge',
								url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
							}
						]
					}
				]
			},
			{
				title: 'Contact',
				blocks: [{ p: `Pour toute question concernant notre politique de cookies :<br />${MAIL}` }]
			}
		]
	},

	mentions: {
		title: 'Mentions légales',
		description:
			'Mentions légales de Unix Creative Studio : éditeur du site, hébergement et coordonnées de contact.',
		sections: [
			{
				title: '1. Éditeur du site',
				blocks: [
					{
						p: `Le site est édité par <strong>Unix Creative Studio</strong>, activité indépendante de ${NAME}.`
					},
					{
						p: `<strong>Adresse :</strong> ${ADDRESS}, Bruxelles, Belgique<br /><strong>Numéro d'entreprise (BCE) :</strong> ${BCE}<br /><strong>Contact :</strong> ${MAIL}`
					}
				]
			},
			{ title: '2. Directeur de publication', blocks: [{ p: NAME }] },
			{
				title: '3. Hébergement',
				blocks: [
					{
						p: `Le site est hébergé par :<br /><strong>Cloudflare, Inc.</strong> (hébergement et déploiement du site)<br />${CLOUDFLARE}, États-Unis`
					},
					{
						p: `Le système de gestion de contenu (Directus) et les demandes envoyées via le formulaire de contact sont hébergés sur un serveur privé chez :<br /><strong>${OVH}</strong>, France`
					}
				]
			},
			{
				title: '4. Propriété intellectuelle',
				blocks: [
					{
						p: "L'ensemble des contenus présents sur ce site (textes, illustrations, mascottes, logo, icônes, animations, etc.) est la propriété exclusive de Unix Creative Studio, sauf mention contraire. Toute reproduction, distribution, modification ou publication de ces éléments est interdite sans accord écrit préalable."
					},
					{
						p: "Les projets présentés dans la section « Nos projets » sont montrés avec l'accord des clients concernés. Leurs noms, logos et visuels restent la propriété de leurs titulaires respectifs."
					}
				]
			},
			{
				title: "5. Cookies et mesure d'audience",
				blocks: [
					{
						p: "Le site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience avec cookies. Pour plus d'informations, consultez notre <a href=\"/cookies\">politique de cookies</a>."
					}
				]
			},
			{
				title: '6. Protection des données personnelles',
				blocks: [
					{
						p: 'Unix Creative Studio collecte des données personnelles uniquement via le formulaire de contact et la prise de rendez-vous. Pour plus d\'informations, consultez notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.'
					}
				]
			},
			{
				title: '7. Loi applicable et juridiction',
				blocks: [
					{
						p: "Les présentes mentions légales sont soumises au droit belge. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de l'arrondissement de Bruxelles."
					}
				]
			}
		]
	},

	privacy: {
		title: 'Politique de confidentialité',
		description:
			'Politique de confidentialité de Unix Creative Studio : comment vos données personnelles sont collectées, utilisées et protégées.',
		sections: [
			{
				title: '1. Responsable du traitement',
				blocks: [{ p: `<strong>Unix Creative Studio</strong> — ${NAME}<br />Contact : ${MAIL}` }]
			},
			{
				title: '2. Données personnelles collectées',
				blocks: [
					{
						p: 'Lorsque vous remplissez le formulaire de contact, nous collectons les données suivantes :'
					},
					{
						ul: [
							'Prénom et nom',
							'Nom de votre entreprise ou activité',
							'Les services qui vous intéressent et le délai souhaité',
							'La description de votre projet (facultatif)',
							'Adresse email et numéro de téléphone (facultatif)',
							'Comment vous avez connu Unix Creative Studio'
						]
					},
					{
						p: 'Si vous réservez un appel, Google Agenda vous demande votre nom et votre adresse email pour créer le rendez-vous.'
					}
				]
			},
			{
				title: '3. Mode de collecte',
				blocks: [
					{
						p: 'Les données sont collectées via le formulaire de contact du site. Elles sont enregistrées dans notre système de gestion de contenu (Directus), hébergé sur un serveur privé en France, et nous sont envoyées par email pour que nous puissions vous répondre rapidement.'
					}
				]
			},
			{
				title: '4. Finalités du traitement',
				blocks: [
					{
						ul: [
							'Répondre à votre demande et vous recontacter par email ou téléphone',
							'Préparer une proposition ou un devis adapté à votre projet',
							'Organiser un appel de découverte si vous en réservez un'
						]
					}
				]
			},
			{
				title: '5. Base légale',
				blocks: [
					{
						p: 'Le traitement est fondé sur votre demande : il est nécessaire pour vous répondre et préparer une éventuelle collaboration (mesures précontractuelles, article 6.1.b du RGPD). La question « Comment nous avez-vous connus ? » repose sur notre intérêt légitime à comprendre comment nos clients nous trouvent.'
					}
				]
			},
			{
				title: '6. Durée de conservation',
				blocks: [
					{
						p: "Les demandes reçues via le formulaire sont conservées 12 mois maximum si elles n'aboutissent pas à une collaboration. Si vous devenez client, vos données sont conservées pendant la durée du projet, puis le temps imposé par les obligations comptables et légales belges."
					}
				]
			},
			{
				title: "7. Mesure d'audience",
				blocks: [
					{
						p: 'Le site n\'utilise aucun outil de mesure d\'audience qui collecte des données personnelles ou dépose des cookies. Pour plus de détails, consultez notre <a href="/cookies">politique de cookies</a>.'
					}
				]
			},
			{
				title: '8. Destinataires des données',
				blocks: [
					{
						p: 'Vos données ne sont jamais vendues. Elles peuvent être traitées par les services suivants, qui nous permettent de faire fonctionner le site :'
					},
					{
						ul: [
							'Directus (système de gestion de contenu auto-hébergé) — serveur OVH, France',
							'OVH SAS (hébergement du serveur) — France',
							'Cloudflare (hébergement du site) — États-Unis, cadre de transfert conforme au RGPD',
							"Resend (envoi de l'email de notification) — États-Unis, cadre de transfert conforme au RGPD",
							'Google LLC (réception des emails via Gmail, prise de rendez-vous via Google Agenda et Google Meet) — États-Unis, cadre de transfert conforme au RGPD'
						]
					}
				]
			},
			{
				title: '9. Vos droits',
				blocks: [
					{ p: 'Conformément au RGPD, vous disposez des droits suivants :' },
					{
						ul: [
							"Droit d'accès à vos données",
							'Droit de rectification',
							"Droit à l'effacement",
							'Droit à la limitation du traitement',
							'Droit à la portabilité des données',
							"Droit d'opposition"
						]
					},
					{
						p: `Pour exercer ces droits : ${MAIL}<br />Vous pouvez également introduire une réclamation auprès de l'<a href="${APD}" target="_blank" rel="noopener noreferrer">Autorité de protection des données</a>.`
					}
				]
			},
			{
				title: '10. Modifications',
				blocks: [
					{
						p: 'Unix Creative Studio se réserve le droit de mettre à jour cette politique à tout moment. Toute modification sera publiée sur cette page.'
					}
				]
			}
		]
	}
};
