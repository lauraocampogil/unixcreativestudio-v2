import type { HomeContent } from './en.ts';

// Contenu de l'accueil en espagnol (contenu par défaut si Directus n'a pas de traduction)
export const home = {
	hero: {
		title: 'Planta tu idea. Mira cómo crece tu negocio.',
		subtitle:
			'Somos un estudio pequeño y cercano en Bruselas. Hacemos que las webs, las apps y Google trabajen para ti. Precios claros, sin tecnicismos, sin estrés.'
	},
	titleLine: {
		title: 'Tú lo diriges. Nosotros lo hacemos crecer'
	},
	whatWeDo: {
		tag: 'Qué hacemos',
		intro:
			'No necesitas saber de webs, Google ni anuncios. Solo quieres que te encuentren y que te contacten. Eso es exactamente lo que construimos.',
		items: [
			{
				title: 'Te encuentran',
				text: 'Ahora mismo, alguien cerca de ti está buscando lo que haces. Hagamos que tu nombre salga primero, no el de tu competencia.'
			},
			{
				title: 'Confían en ti',
				text: 'En internet solo tienes unos segundos para causar buena impresión. Hacemos que esos segundos cuenten, con una web que se parece a ti.'
			},
			{
				title: 'Te contactan',
				text: 'Un visitante que no encuentra tu botón es un cliente perdido. Hacemos que contactarte sea fácil: un toque para llamar, escribir o reservar.'
			}
		]
	},
	services: {
		title: 'Servicios',
		items: [
			{
				title: 'Diseño y desarrollo web',
				problem:
					'Ahora mismo, alguien busca lo que haces. Sin una buena web, elige a otro. Hagamos que te elija a ti.',
				href: '/services/web-design'
			},
			{
				title: 'SEO',
				problem:
					'Cada día, la gente busca tu servicio en Google. Si no estás en la primera página, la llamada se la lleva tu competencia.',
				href: '/services/seo'
			},
			{
				title: 'Anuncios',
				problem:
					'Tu competencia ya está en la pantalla de tus clientes. Los anuncios te ponen ahí también, desde la primera semana.',
				href: '/services/ads'
			},
			{
				title: 'App móvil',
				problem:
					'Tus clientes pasan horas en el móvil. Una app te mantiene a un toque, para que vuelvan a ti y no a otro.',
				href: '/services/mobile-app'
			}
		]
	},
	ourWork: {
		tag: 'Proyectos',
		title: 'Negocios que hemos ayudado a crecer',
		items: [
			{
				name: 'Brussels Summit Academy',
				category: 'Academia de fútbol',
				type: 'Web',
				tagline: 'Una web deportiva que atrae nuevos jugadores',
				image: '/images/work/bsa.webp',
				href: 'https://brussels-summitacademy.be/'
			},
			{
				name: 'Shiynelly Lashes',
				category: 'Estudio de pestañas',
				type: 'Web',
				tagline: 'Una web elegante con reservas online',
				image: '/images/work/shiynelly.webp',
				href: 'https://shiynellylashes.com/'
			},
			{
				name: 'Entraide Bruxelles',
				category: 'Asociación sin ánimo de lucro',
				type: 'Web',
				tagline: 'Una web fresca y fácil de leer',
				image: '/images/work/entraide.webp',
				href: 'https://www.entraide-bruxelles.be/'
			},
			{
				name: 'Yaniswash',
				category: 'Lavado de coches',
				type: 'Web',
				tagline: 'Reserva un lavado en pocos clics',
				image: '/images/work/yaniswash.webp',
				href: 'https://yaniswash.be'
			},
			{
				name: 'Inesscoach',
				category: 'Coaching mental de fútbol',
				type: 'Web',
				tagline: 'Reserva y paga una sesión online',
				image: '/images/work/inesscoach.webp',
				href: 'https://www.iness-coach.com/'
			}
		]
	},
	quiz: {
		tag: 'Quiz',
		title: '¿No sabes por dónde empezar?',
		intro:
			'Es normal, a la mayoría le pasa. Responde a 3 preguntas rápidas y te mostraremos el camino. Sin necesidad de llamada.',
		questionsLabel: 'Preguntas',
		recommendationLabel: 'Nuestra recomendación',
		cta: 'Vamos'
	},
	// ⚠️ Avis d'exemple : à remplacer par les vrais avis des clients (ou à leur faire valider) avant la mise en ligne
	reviews: {
		label: 'Lo que dicen nuestros clientes',
		items: [
			{
				quote:
					'La mejor diseñadora de la ciudad: buen trabajo, buena persona, siempre escucha. Gracias a Unix tenemos muchas más visitas de todas partes.',
				name: 'InessCoach',
				role: 'Fundadora',
				logo: '/images/reviews/inesscoach.png'
			},
			{
				quote:
					'Nuestra nueva web es clara y fácil de leer para todos. Las familias encuentran nuestras actividades en segundos y cada mes tenemos más inscripciones.',
				name: 'Entraide Bruxelles',
				role: 'Coordinadora',
				logo: '/images/reviews/entraide.png'
			},
			{
				quote:
					'Unix entendió nuestra academia desde el primer momento. La web es deportiva y transmite orgullo, y ahora los nuevos jugadores se inscriben directamente online.',
				name: 'Brussels Summit Academy',
				role: 'Fundador',
				logo: '/images/reviews/bsa.png'
			}
		]
	},
	faq: {
		tag: 'FAQ',
		title: 'Bueno saberlo',
		text: '¿No encuentras tu pregunta? Solemos responder el mismo día.',
		linkLabel: 'Escríbenos',
		linkHref: '/contact',
		items: [
			{
				question: 'No sé lo que necesito. ¿Por dónde empiezo?',
				answer: 'Por el quiz de 3 preguntas. Te dice qué servicio te conviene y cuánto cuesta.'
			},
			{
				question: '¿Tengo que llamaros?',
				answer:
					'Para nada. El formulario, el email o WhatsApp funcionan perfectamente. Solo llamamos si tú quieres.'
			},
			{
				question: '¿Podré cambiar los textos yo mismo más adelante?',
				answer:
					'Sí. Si quieres, añadimos un editor sencillo para que cambies tú mismo los textos y las fotos.'
			},
			{
				question: '¿De quién es la web?',
				answer: 'Tuya. La web, el dominio y todas las cuentas están a tu nombre.'
			},
			{
				question: '¿Y si algo deja de funcionar?',
				answer: 'Durante un año después del lanzamiento, arreglamos gratis cualquier fallo técnico.'
			}
		]
	},
	marquee: {
		items: [
			'Haz florecer tu negocio',
			'Que te encuentren',
			'Consigue clientes',
			'Crece online',
			'Menos estrés'
		]
	}
} satisfies HomeContent;
