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
			'Lanzamiento, configuración de Google y búsqueda con IA, CMS y una formación corta'
		]
	},
	{
		slug: 'ai-consulting',
		title: 'Consultoría IA',
		tagline: 'Menos tareas repetitivas. Más negocio.',
		description:
			'Una web bonita y rápida que cuenta quién eres, hace fácil contactarte y te hace aparecer en Google y en las respuestas de la IA.',
		timeline: 'primer sistema funcionando en 2-4 semanas',
		steps: [
			'Una llamada gratis para encontrar tu mayor bloqueo',
			'Un plan claro: qué automatizamos, las horas que te ahorra y el precio',
			'Construimos tu sistema de IA con las herramientas que ya usas',
			'Lanzamiento, una formación corta para ti y tu equipo, y revisión diaria',
			'Cada semana: medimos, mejoramos y elegimos la siguiente tarea a automatizar'
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
		text: 'Día del lanzamiento. Tu web, tu app o tu sistema de IA está en marcha y trabajando para ti.'
	}
];
