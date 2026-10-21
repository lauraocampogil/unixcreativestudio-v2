import { error } from '@sveltejs/kit';
import { PUBLIC_DIRECTUS_URL } from '$app/env/public';
import type { RequestHandler } from './$types';

// Seuls ces réglages d'image passent jusqu'à Directus
const ALLOWED = ['width', 'height', 'quality', 'format'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Les images de Directus passent par le site : /media/<id>?width=…
 * Le navigateur ne parle qu'au site (même adresse, https en production),
 * donc plus d'image bloquée parce que Directus est en http ou sur une autre adresse.
 */
export const GET: RequestHandler = async ({ params, url, fetch, setHeaders }) => {
	if (!UUID.test(params.id)) error(404, 'Image introuvable');

	const query = new URLSearchParams();
	for (const key of ALLOWED) {
		const value = url.searchParams.get(key);
		if (value) query.set(key, value);
	}

	const response = await fetch(`${PUBLIC_DIRECTUS_URL}/assets/${params.id}?${query}`).catch(
		() => null
	);
	if (!response?.ok) error(response?.status === 404 ? 404 : 502, 'Image indisponible');

	// Une image ne change jamais pour un même id : le navigateur peut la garder longtemps
	setHeaders({
		'content-type': response.headers.get('content-type') ?? 'application/octet-stream',
		'cache-control': 'public, max-age=86400, stale-while-revalidate=604800'
	});
	return new Response(response.body);
};
