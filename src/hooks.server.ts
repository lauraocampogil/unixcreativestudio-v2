import type { Handle } from '@sveltejs/kit/hooks';
import { getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		return resolve(
			{ ...event, request },
			{
				transformPageChunk: ({ html }) =>
					html
						.replace('%paraglide.lang%', locale)
						.replace('%paraglide.dir%', getTextDirection(locale))
			}
		);
	});

// Tant que le site est sur une adresse temporaire (ex. *.workers.dev), Google ne doit pas l'indexer :
// sinon il garderait cette adresse au lieu de unixcreativestudio.com.
const PRODUCTION_HOSTS = ['unixcreativestudio.com', 'www.unixcreativestudio.com'];

export const handle: Handle = async ({ event, resolve }) => {
	const response = await handleParaglide({ event, resolve });
	if (!PRODUCTION_HOSTS.includes(event.url.hostname)) {
		// try : certaines réponses (redirections) ont des en-têtes non modifiables
		try {
			response.headers.set('x-robots-tag', 'noindex, nofollow');
		} catch {
			/* rien à faire */
		}
	}
	return response;
};
