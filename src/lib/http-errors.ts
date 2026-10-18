import { errors as en } from '#lib/content/errors/en.ts';
import { errors as fr } from '#lib/content/errors/fr.ts';
import { errors as es } from '#lib/content/errors/es.ts';
import { errors as nl } from '#lib/content/errors/nl.ts';
import { pick } from '#lib/i18n.ts';
import { m } from '#lib/paraglide/messages.js';

// Messages de la page d'erreur, dans la langue actuelle
export const errorMessage = (status: number) => pick({ en, fr, es, nl })[status];

// Titre sous le gros numéro
export const errorTitle = (status: number) =>
	status === 404
		? m.error_title_404()
		: status >= 500
			? m.error_title_server()
			: m.error_title_generic();
