import type { ServiceInfo } from './en.ts';

// Pages « info service » en espagnol
export const services: ServiceInfo[] = [
	{
		slug: 'web-design',
		title: 'Web',
		tagline: 'Tu mejor primera impresión.',
		description: 'Una web bonita y rápida que cuenta quién eres y hace que sea fácil contactarte.',
		timeline: '2-4 semanas',
		steps: [
			'Un formulario corto sobre tu negocio y tus objetivos',
			'Una estructura clara y wireframes',
			'Un diseño a medida que se parece a ti',
			'Una web rápida, en móvil y ordenador',
			'Lanzamiento, configuración de Google, CMS y una formación corta'
		]
	},
	{
		slug: 'seo',
		title: 'SEO',
		tagline: 'Sé el primer nombre que encuentran.',
		description:
			'Ayudamos a que la gente encuentre tu negocio en Google y Google Maps, un poco más cada mes.',
		timeline: 'primeros resultados en 2-3 meses',
		steps: [
			'Una revisión completa de tu web en Google',
			'Tu perfil de Google Business, creado y completo',
			'Mejoras técnicas: velocidad, estructura, móvil',
			'Contenido nuevo cada mes',
			'Un informe mensual sencillo: qué hicimos y qué cambió'
		]
	},
	{
		slug: 'ads',
		title: 'Anuncios',
		tagline: 'Nuevos clientes, desde esta semana.',
		description:
			'Anuncios en Google, Instagram y Facebook que muestran tu negocio a las personas adecuadas.',
		timeline: 'activos en 1 semana aprox.',
		steps: [
			'Tu objetivo y tu presupuesto, definidos juntos',
			'Investigación: quiénes son tus clientes y dónde están',
			'Diseño y textos de los anuncios',
			'Lanzamiento y pequeñas mejoras cada semana',
			'Un informe mensual: cuánto cuesta cada cliente'
		]
	},
	{
		slug: 'mobile-app',
		title: 'App móvil',
		tagline: 'Tu negocio, en su bolsillo.',
		description:
			'Una app para iPhone y Android, para que tus clientes puedan reservar, comprar y volver.',
		timeline: 'primera versión en 8-10 semanas',
		steps: [
			'Tu idea y las funciones más importantes',
			'Pantallas y wireframes',
			'Un diseño a medida',
			'La app, desarrollada para iPhone y Android',
			'Publicada en App Store y Google Play'
		]
	}
];

export const howWeWork = [
	{ title: 'Sembrar', text: 'Rellenas nuestro formulario corto o haces una llamada de 30 min.' },
	{
		title: 'Plantar',
		text: 'Recibe tu plan. En 48 horas: un plan claro, un precio cerrado y una fecha fija, por escrito.'
	},
	{ title: 'Crecer', text: 'Nos ponemos a trabajar. Ves el avance y das el OK en cada paso.' },
	{
		title: 'Florecer',
		text: 'Día de lanzamiento. Tu servicio está online y listo para tus clientes.'
	}
];
