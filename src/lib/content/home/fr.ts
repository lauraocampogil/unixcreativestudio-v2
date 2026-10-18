import type { HomeContent } from './en.ts';

// Contenu de l'accueil en français (contenu par défaut si Directus n'a pas de traduction)
export const home = {
	hero: {
		title: 'Plantez votre idée. Regardez votre entreprise grandir.',
		subtitle:
			'Nous sommes un petit studio sympa à Bruxelles. Nous faisons travailler les sites web, les apps et Google pour vous. Des prix clairs, sans jargon, sans stress.'
	},
	titleLine: {
		title: 'Vous la gérez. Nous l’aidons à grandir'
	},
	whatWeDo: {
		tag: 'Ce que nous faisons',
		intro:
			'Pas besoin de connaître les sites web, Google ou la publicité. Vous voulez juste qu’on vous trouve et qu’on vous contacte. C’est exactement ce que nous construisons.',
		items: [
			{
				title: 'On vous trouve',
				text: 'En ce moment, quelqu’un près de chez vous cherche ce que vous faites. Faisons en sorte que votre nom apparaisse en premier, pas celui de votre concurrent.'
			},
			{
				title: 'On vous fait confiance',
				text: 'En ligne, vous n’avez que quelques secondes pour faire bonne impression. Nous faisons compter ces secondes, avec un site qui vous ressemble.'
			},
			{
				title: 'On vous contacte',
				text: 'Un visiteur qui ne trouve pas votre bouton, c’est un client perdu. Nous rendons le contact facile : un clic pour appeler, écrire ou réserver.'
			}
		]
	},
	services: {
		title: 'Services',
		items: [
			{
				title: 'Création de site web',
				problem:
					'En ce moment, quelqu’un cherche ce que vous faites. Sans un bon site, il choisit quelqu’un d’autre. Faisons en sorte qu’il vous choisisse.',
				href: '/services/web-design'
			},
			{
				title: 'SEO',
				problem:
					'Chaque jour, des gens cherchent votre service sur Google. Si vous n’êtes pas en première page, ce sont vos concurrents qui reçoivent l’appel.',
				href: '/services/seo'
			},
			{
				title: 'Publicités',
				problem:
					'Vos concurrents sont déjà sur l’écran de vos clients. La publicité vous y met aussi, dès la première semaine.',
				href: '/services/ads'
			},
			{
				title: 'Application mobile',
				problem:
					'Vos clients passent des heures sur leur téléphone. Une app vous garde à un clic, pour qu’ils reviennent vers vous, pas vers quelqu’un d’autre.',
				href: '/services/mobile-app'
			}
		]
	},
	ourWork: {
		tag: 'Nos projets',
		title: 'Des entreprises que nous avons aidées à grandir',
		items: [
			{
				name: 'Brussels Summit Academy',
				category: 'Académie de football',
				type: 'Site web',
				tagline: 'Un site sportif qui attire de nouveaux joueurs',
				image: '/images/work/bsa.webp',
				href: 'https://brussels-summitacademy.be/'
			},
			{
				name: 'Shiynelly Lashes',
				category: 'Studio de cils',
				type: 'Site web',
				tagline: 'Un site élégant avec réservation en ligne',
				image: '/images/work/shiynelly.webp',
				href: 'https://shiynellylashes.com/'
			},
			{
				name: 'Entraide Bruxelles',
				category: 'Association',
				type: 'Site web',
				tagline: 'Un site frais et facile à lire',
				image: '/images/work/entraide.webp',
				href: 'https://www.entraide-bruxelles.be/'
			},
			{
				name: 'Yaniswash',
				category: 'Lavage auto',
				type: 'Site web',
				tagline: 'Réserver un lavage en quelques clics',
				image: '/images/work/yaniswash.webp',
				href: 'https://yaniswash.be'
			},
			{
				name: 'Inesscoach',
				category: 'Coaching mental football',
				type: 'Site web',
				tagline: 'Réserver et payer une séance en ligne',
				image: '/images/work/inesscoach.webp',
				href: 'https://www.iness-coach.com/'
			}
		]
	},
	quiz: {
		tag: 'Quiz',
		title: 'Vous ne savez pas par où commencer ?',
		intro:
			'C’est normal, la plupart des gens non plus. Répondez à 3 petites questions et nous vous montrons la bonne direction. Pas besoin d’appel.',
		questionsLabel: 'Questions',
		recommendationLabel: 'Notre conseil',
		cta: 'C’est parti'
	},
	// ⚠️ Avis d'exemple : à remplacer par les vrais avis des clients (ou à leur faire valider) avant la mise en ligne
	reviews: {
		label: 'Ce que disent nos clients',
		items: [
			{
				quote:
					'La meilleure designer de la ville : du bon travail, une personne en or, toujours à l’écoute. Grâce à Unix, nous avons beaucoup plus de visites de partout.',
				name: 'InessCoach',
				role: 'Fondatrice',
				logo: '/images/reviews/inesscoach.png'
			},
			{
				quote:
					'Notre nouveau site est clair et facile à lire pour tout le monde. Les familles trouvent nos activités en quelques secondes, et nous avons plus d’inscriptions chaque mois.',
				name: 'Entraide Bruxelles',
				role: 'Coordinatrice',
				logo: '/images/reviews/entraide.png'
			},
			{
				quote:
					'Unix a tout de suite compris notre académie. Le site est sportif et fier, et les nouveaux joueurs s’inscrivent maintenant directement en ligne.',
				name: 'Brussels Summit Academy',
				role: 'Fondateur',
				logo: '/images/reviews/bsa.png'
			}
		]
	},
	faq: {
		tag: 'FAQ',
		title: 'Bon à savoir',
		text: 'Vous ne trouvez pas votre question ? Nous répondons en général le jour même.',
		linkLabel: 'Contactez-nous',
		linkHref: '/contact',
		items: [
			{
				question: 'Je ne sais pas ce dont j’ai besoin. Par où commencer ?',
				answer:
					'Par le quiz en 3 questions. Il vous dit quel service vous convient et ce qu’il coûte.'
			},
			{
				question: 'Est-ce que je dois vous appeler ?',
				answer:
					'Pas du tout. Le formulaire, l’email ou WhatsApp, c’est très bien. Nous appelons seulement si vous le souhaitez.'
			},
			{
				question: 'Est-ce que je peux modifier les textes moi-même plus tard ?',
				answer:
					'Oui. Si vous le voulez, nous ajoutons un éditeur simple pour changer vous-même les textes et les photos.'
			},
			{
				question: 'À qui appartient le site ?',
				answer: 'À vous. Le site, le nom de domaine et tous les comptes sont à votre nom.'
			},
			{
				question: 'Et si quelque chose ne marche plus ?',
				answer:
					'Pendant un an après la mise en ligne, nous corrigeons gratuitement tout bug technique.'
			}
		]
	},
	marquee: {
		items: [
			'Faites fleurir votre entreprise',
			'Soyez trouvé',
			'Trouvez des clients',
			'Grandissez en ligne',
			'Moins de stress'
		]
	}
} satisfies HomeContent;
