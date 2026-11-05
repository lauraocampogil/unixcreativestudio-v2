import type { HomeContent } from './en.ts';

// Contenu de l'accueil en espagnol (contenu par défaut si Directus n'a pas de traduction)
export const home = {
	hero: {
		title: 'Planta tu idea. Mira cómo crece tu negocio.',
		subtitle:
			'Somos un estudio pequeño y cercano en Bruselas. Creamos webs y apps, y ponemos la IA a trabajar en tu negocio. Precios claros, sin tecnicismos, sin estrés.'
	},
	titleLine: {
		title: 'Tú lo diriges. Nosotros lo hacemos crecer'
	},
	whatWeDo: {
		tag: '¿Qué hacemos?',
		intro:
			'No necesitas saber de webs ni de IA. Solo quieres más clientes y más tiempo. Eso es justo lo que construimos.',
		items: [
			{
				title: 'Te encuentran',
				text: 'Ahora mismo, alguien cerca de ti busca lo que haces, en Google o preguntándole a ChatGPT. Hagamos que tu nombre salga primero, no el de tu competencia.'
			},
			{
				title: 'Confían en ti',
				text: 'En internet solo tienes unos segundos para causar buena impresión. Hacemos que cuenten, con una web que se parece a ti.'
			},
			{
				title: 'Recuperas tu tiempo',
				text: 'Responder las mismas preguntas, perseguir presupuestos, copiar datos… Ese trabajo se lo damos a la IA, para que tú te centres en tus clientes.'
			}
		]
	},
	services: {
		title: 'Servicios',
		items: [
			{
				title: 'Diseño y desarrollo web',
				problem:
					'Ahora mismo, alguien busca lo que haces, en Google o en ChatGPT. Sin una buena web, elige a otro. Hagamos que te encuentre y te elija a ti.',
				href: '/services/web-design'
			},
			{
				title: 'Consultoría IA',
				problem:
					'Pierdes horas cada semana en tareas que podría hacer un ordenador. Encontramos lo que más tiempo te quita y construimos el sistema de IA que lo hace por ti.',
				href: '/services/ai-consulting'
			},
			{
				title: 'App móvil',
				problem:
					'Tus clientes pasan horas con el móvil. Una app te mantiene a un toque, para que vuelvan a ti y no a otro.',
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
				image: '',
				href: 'https://brussels-summitacademy.be/'
			},
			{
				name: 'Shiynelly Lashes',
				category: 'Estudio de pestañas',
				type: 'Web',
				tagline: 'Una web elegante con reservas online',
				image: '',
				href: 'https://shiynellylashes.com/'
			},
			{
				name: 'Entraide Bruxelles',
				category: 'Asociación sin ánimo de lucro',
				type: 'Web',
				tagline: 'Una web fresca y fácil de leer',
				image: '',
				href: 'https://www.entraide-bruxelles.be/'
			},
			{
				name: 'Yaniswash',
				category: 'Lavado de coches',
				type: 'Web',
				tagline: 'Reserva un lavado en pocos clics',
				image: '',
				href: 'https://yaniswash.be'
			},
			{
				name: 'Inesscoach',
				category: 'Coaching mental de fútbol',
				type: 'Web',
				tagline: 'Reserva y paga una sesión online',
				image: '',
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
				logo: ''
			},
			{
				quote:
					'Nuestra nueva web es clara y fácil de leer para todos. Las familias encuentran nuestras actividades en segundos y cada mes tenemos más inscripciones.',
				name: 'Entraide Bruxelles',
				role: 'Coordinadora',
				logo: ''
			},
			{
				quote:
					'Unix entendió nuestra academia desde el primer momento. La web es deportiva y transmite orgullo, y ahora los nuevos jugadores se inscriben directamente online.',
				name: 'Brussels Summit Academy',
				role: 'Fundador',
				logo: ''
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
			},
			{
				question: 'No sé nada de IA. ¿Es un problema?',
				answer:
					'Para nada. Te lo explicamos todo con palabras sencillas, lo dejamos todo funcionando y tú solo ves el resultado: horas ahorradas cada semana.'
			}
		]
	},
	marquee: {
		items: [
			'Haz florecer tu negocio',
			'Que te encuentren',
			'Consigue clientes',
			'Ahorra tiempo',
			'Menos estrés'
		]
	}
} satisfies HomeContent;
