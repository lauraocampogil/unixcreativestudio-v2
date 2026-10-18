import type { LegalPages } from './types.ts';
import { MAIL, APD, NAME, ADDRESS, BCE, CLOUDFLARE, OVH } from './shared.ts';

// Pages légales en espagnol
export const legal: LegalPages = {
	cookies: {
		title: 'Política de cookies',
		description: 'Información sobre el uso de cookies en la web de Unix Creative Studio.',
		sections: [
			{
				title: '¿Qué es una cookie?',
				blocks: [
					{
						p: 'Una cookie es un pequeño archivo de texto que se guarda en tu dispositivo cuando visitas una web. Permite que la web recuerde tus acciones y preferencias durante un tiempo determinado.'
					}
				]
			},
			{
				title: 'Cookies que usa esta web',
				blocks: [
					{
						cards: [
							{
								name: 'Cookies de la web',
								badge: 'Sin cookies',
								filled: true,
								text: 'Esta web no guarda ninguna cookie. El idioma se elige con la dirección de la página (/fr, /es, /nl), no con una cookie.'
							},
							{
								name: 'Medición de audiencia',
								badge: 'Sin cookies',
								text: 'No usamos ninguna herramienta de estadísticas que guarde cookies (no usamos Google Analytics). Ningún dato de navegación se vende ni se usa con fines publicitarios.'
							},
							{
								name: 'Reserva de llamada (Google Calendar)',
								badge: 'Web externa',
								text: 'El botón para reservar una llamada de 30 min abre la página de citas de Google Calendar. Esa página pertenece a Google, que puede guardar sus propias cookies según su propia política.'
							}
						]
					}
				]
			},
			{
				title: 'Gestionar tus preferencias',
				blocks: [
					{
						p: 'Como esta web no guarda ninguna cookie, no se muestra ningún aviso de consentimiento. Aun así, puedes configurar tu navegador para bloquear o borrar las cookies de otras webs:'
					},
					{
						links: [
							{
								label: 'Google Chrome',
								url: 'https://support.google.com/chrome/answer/95647?hl=es'
							},
							{
								label: 'Mozilla Firefox',
								url: 'https://support.mozilla.org/es/kb/Borrar%20cookies'
							},
							{
								label: 'Safari',
								url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac'
							},
							{
								label: 'Microsoft Edge',
								url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
							}
						]
					}
				]
			},
			{
				title: 'Contacto',
				blocks: [{ p: `Para cualquier pregunta sobre nuestra política de cookies:<br />${MAIL}` }]
			}
		]
	},

	mentions: {
		title: 'Aviso legal',
		description:
			'Aviso legal de Unix Creative Studio: editor de la web, alojamiento y datos de contacto.',
		sections: [
			{
				title: '1. Editor de la web',
				blocks: [
					{
						p: `Esta web la publica <strong>Unix Creative Studio</strong>, actividad independiente de ${NAME}.`
					},
					{
						p: `<strong>Dirección:</strong> ${ADDRESS}, Bruselas, Bélgica<br /><strong>Número de empresa (BCE/KBO):</strong> ${BCE}<br /><strong>Contacto:</strong> ${MAIL}`
					}
				]
			},
			{ title: '2. Responsable de la publicación', blocks: [{ p: NAME }] },
			{
				title: '3. Alojamiento',
				blocks: [
					{
						p: `La web está alojada por:<br /><strong>Cloudflare, Inc.</strong> (alojamiento y despliegue de la web)<br />${CLOUDFLARE}, Estados Unidos`
					},
					{
						p: `El sistema de gestión de contenidos (Directus) y las solicitudes enviadas con el formulario de contacto están alojados en un servidor privado en:<br /><strong>${OVH}</strong>, Francia`
					}
				]
			},
			{
				title: '4. Propiedad intelectual',
				blocks: [
					{
						p: 'Todo el contenido de esta web (textos, ilustraciones, mascotas, logo, iconos, animaciones, etc.) es propiedad exclusiva de Unix Creative Studio, salvo que se indique lo contrario. Queda prohibida su reproducción, distribución, modificación o publicación sin autorización previa por escrito.'
					},
					{
						p: 'Los proyectos de la sección «Proyectos» se muestran con el permiso de los clientes. Sus nombres, logos e imágenes siguen siendo propiedad de sus respectivos dueños.'
					}
				]
			},
			{
				title: '5. Cookies y medición de audiencia',
				blocks: [
					{
						p: 'Esta web no guarda ninguna cookie ni usa herramientas de estadísticas con cookies. Para más información, consulta nuestra <a href="/cookies">política de cookies</a>.'
					}
				]
			},
			{
				title: '6. Protección de datos personales',
				blocks: [
					{
						p: 'Unix Creative Studio solo recoge datos personales con el formulario de contacto y la reserva de llamadas. Para más información, consulta nuestra <a href="/politique-de-confidentialite">política de privacidad</a>.'
					}
				]
			},
			{
				title: '7. Ley aplicable y jurisdicción',
				blocks: [
					{
						p: 'Este aviso legal se rige por la ley belga. Cualquier conflicto sobre el uso de la web se someterá a la competencia exclusiva de los tribunales del distrito judicial de Bruselas.'
					}
				]
			}
		]
	},

	privacy: {
		title: 'Política de privacidad',
		description:
			'Política de privacidad de Unix Creative Studio: cómo se recogen, usan y protegen tus datos personales.',
		sections: [
			{
				title: '1. Responsable del tratamiento',
				blocks: [{ p: `<strong>Unix Creative Studio</strong> — ${NAME}<br />Contacto: ${MAIL}` }]
			},
			{
				title: '2. Datos personales que recogemos',
				blocks: [
					{ p: 'Cuando rellenas el formulario de contacto, recogemos los siguientes datos:' },
					{
						ul: [
							'Nombre y apellido',
							'El nombre de tu negocio',
							'Los servicios que te interesan y cuándo quieres empezar',
							'La descripción de tu proyecto (opcional)',
							'Email y teléfono (opcional)',
							'Cómo conociste Unix Creative Studio'
						]
					},
					{
						p: 'Si reservas una llamada, Google Calendar te pide tu nombre y tu email para crear la cita.'
					}
				]
			},
			{
				title: '3. Cómo los recogemos',
				blocks: [
					{
						p: 'Los datos se recogen con el formulario de contacto de la web. Se guardan en nuestro sistema de gestión de contenidos (Directus), alojado en un servidor privado en Francia, y nos llegan por email para poder responderte rápido.'
					}
				]
			},
			{
				title: '4. Para qué los usamos',
				blocks: [
					{
						ul: [
							'Responder a tu solicitud y contactarte por email o teléfono',
							'Preparar una propuesta o un presupuesto para tu proyecto',
							'Organizar una llamada si reservas una'
						]
					}
				]
			},
			{
				title: '5. Base legal',
				blocks: [
					{
						p: 'Tratamos tus datos porque tú nos lo pides: es necesario para responderte y preparar una posible colaboración (medidas precontractuales, artículo 6.1.b del RGPD). La pregunta «¿Cómo nos conociste?» se basa en nuestro interés legítimo en saber cómo nos encuentran los clientes.'
					}
				]
			},
			{
				title: '6. Cuánto tiempo los guardamos',
				blocks: [
					{
						p: 'Las solicitudes enviadas con el formulario se guardan 12 meses como máximo si no acaban en una colaboración. Si te conviertes en cliente, tus datos se guardan durante el proyecto y después el tiempo que exigen las obligaciones contables y legales belgas.'
					}
				]
			},
			{
				title: '7. Medición de audiencia',
				blocks: [
					{
						p: 'Esta web no usa ninguna herramienta de estadísticas que recoja datos personales o guarde cookies. Para más detalles, consulta nuestra <a href="/cookies">política de cookies</a>.'
					}
				]
			},
			{
				title: '8. Quién recibe los datos',
				blocks: [
					{
						p: 'Tus datos nunca se venden. Pueden tratarlos los siguientes servicios, que nos ayudan a que la web funcione:'
					},
					{
						ul: [
							'Directus (sistema de gestión de contenidos autoalojado) — servidor OVH, Francia',
							'OVH SAS (alojamiento del servidor) — Francia',
							'Cloudflare (alojamiento de la web) — Estados Unidos, marco de transferencia conforme al RGPD',
							'Resend (envío del email de aviso) — Estados Unidos, marco de transferencia conforme al RGPD',
							'Google LLC (recepción de emails con Gmail, reserva de llamadas con Google Calendar y Google Meet) — Estados Unidos, marco de transferencia conforme al RGPD'
						]
					}
				]
			},
			{
				title: '9. Tus derechos',
				blocks: [
					{ p: 'Según el RGPD, tienes los siguientes derechos:' },
					{
						ul: [
							'Derecho de acceso a tus datos',
							'Derecho de rectificación',
							'Derecho de supresión',
							'Derecho a la limitación del tratamiento',
							'Derecho a la portabilidad de los datos',
							'Derecho de oposición'
						]
					},
					{
						p: `Para ejercer estos derechos: ${MAIL}<br />También puedes presentar una reclamación ante la <a href="${APD}" target="_blank" rel="noopener noreferrer">Autoridad de Protección de Datos de Bélgica</a>.`
					}
				]
			},
			{
				title: '10. Cambios',
				blocks: [
					{
						p: 'Unix Creative Studio puede actualizar esta política en cualquier momento. Cualquier cambio se publicará en esta página.'
					}
				]
			}
		]
	}
};
