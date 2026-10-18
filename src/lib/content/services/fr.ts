import type { ServiceInfo } from './en.ts';

// Pages « info service » en français
export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Site web',
		tagline: 'Votre meilleure première impression.',
		description:
			'Un beau site rapide qui dit qui vous êtes, et qui permet de vous contacter facilement.',
		timeline: '2 à 4 semaines',
		steps: [
			'Un court formulaire sur votre entreprise et vos objectifs',
			'Une structure claire et des wireframes',
			'Un design sur mesure qui vous ressemble',
			'Un site rapide, sur téléphone et ordinateur',
			'Mise en ligne, configuration Google, CMS et une courte formation'
		]
	},
	{
		slug: 'seo',
		title: 'SEO',
		tagline: 'Soyez le nom qu’on trouve en premier.',
		description:
			'Nous aidons les gens à trouver votre entreprise sur Google et Google Maps, un peu plus chaque mois.',
		timeline: 'premiers résultats en 2 à 3 mois',
		steps: [
			'Une analyse complète de votre site sur Google',
			'Votre fiche Google Business, créée et complète',
			'Corrections techniques : vitesse, structure, mobile',
			'Du nouveau contenu chaque mois',
			'Un rapport mensuel simple : ce que nous avons fait, ce qui a changé'
		]
	},
	{
		slug: 'ads',
		title: 'Publicités',
		tagline: 'De nouveaux clients, dès cette semaine.',
		description:
			'Des publicités sur Google, Instagram et Facebook qui montrent votre entreprise aux bonnes personnes.',
		timeline: 'en ligne en 1 semaine environ',
		steps: [
			'Votre objectif et votre budget, fixés ensemble',
			'Recherche : qui sont vos clients et où ils se trouvent',
			'Création des visuels et des textes',
			'Lancement, puis de petites améliorations chaque semaine',
			'Un rapport mensuel : ce que coûte chaque client'
		]
	},
	{
		slug: 'mobile-app',
		title: 'Application mobile',
		tagline: 'Votre entreprise, dans leur poche.',
		description:
			'Une app pour iPhone et Android, pour que vos clients puissent réserver, acheter et revenir.',
		timeline: 'première version en 8 à 10 semaines',
		steps: [
			'Votre idée et les fonctions qui comptent le plus',
			'Les écrans et les wireframes',
			'Un design sur mesure',
			'L’app, développée pour iPhone et Android',
			'Publiée sur l’App Store et Google Play'
		]
	}
];

export const howWeWork = [
	{ title: 'Semer', text: 'Vous remplissez notre court formulaire ou prenez un appel de 30 min.' },
	{
		title: 'Planter',
		text: 'Recevez votre plan. Sous 48 heures : un plan clair, un prix fixe et une date fixe, par écrit.'
	},
	{
		title: 'Grandir',
		text: 'Nous nous mettons au travail. Vous voyez l’avancement et vous validez chaque étape.'
	},
	{
		title: 'Fleurir',
		text: 'Le jour du lancement. Votre service est en ligne et prêt pour vos clients.'
	}
];
