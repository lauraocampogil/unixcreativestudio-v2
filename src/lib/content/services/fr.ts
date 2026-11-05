import type { ServiceInfo } from './en.ts';

// Pages « info service » en français
export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Site web',
		tagline: 'Votre meilleure première impression.',
		description:
			'Un beau site rapide qui dit qui vous êtes, qui permet de vous contacter facilement, et qui vous fait trouver sur Google et dans les réponses des IA.',
		timeline: '2 à 4 semaines',
		steps: [
			'Un court formulaire sur votre entreprise et vos objectifs',
			'Une structure claire et des wireframes',
			'Un design sur mesure qui vous ressemble',
			'Un site rapide, sur téléphone et ordinateur',
			'Mise en ligne, configuration Google et recherche IA, CMS et une courte formation'
		]
	},
	{
		slug: 'ai-consulting',
		title: 'Consulting IA',
		tagline: 'Moins de tâches répétitives. Plus de business.',
		description:
			'Nous trouvons la tâche qui ralentit le plus votre entreprise, puis nous construisons un système IA qui la fait pour vous : répondre aux clients, relancer les devis, trier les emails, prendre les rendez-vous.',
		timeline: 'premier système en place en 2 à 4 semaines',
		steps: [
			'Un appel gratuit pour trouver ce qui vous bloque le plus',
			'Un plan clair : ce que nous automatisons, les heures gagnées, le prix',
			'Nous construisons votre système IA avec les outils que vous utilisez déjà',
			'Mise en place, une courte formation pour vous et votre équipe, et un contrôle chaque jour',
			'Chaque semaine : nous mesurons, améliorons et choisissons la prochaine tâche à automatiser'
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
		text: 'Le jour du lancement. Votre site, votre app ou votre système IA est en ligne et travaille pour vous.'
	}
];
