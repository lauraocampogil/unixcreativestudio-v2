import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';
import { PUBLIC_DIRECTUS_URL } from '$app/env/public';

const directus = createDirectus(PUBLIC_DIRECTUS_URL).with(rest());

interface AssetOptions {
	width?: number;
	height?: number;
	quality?: number;
	format?: 'webp' | 'avif' | 'jpg' | 'png';
}

export const assetUrl = (id: string | null | undefined, options: AssetOptions = {}) => {
	if (!id) return null;
	const { width, height, quality = 80, format = 'webp' } = options;
	const params = new URLSearchParams();
	if (width) params.set('width', String(width));
	if (height) params.set('height', String(height));
	params.set('quality', String(quality));
	params.set('format', format);
	// Passe par le site (src/routes/media/[id]) : même adresse que la page, donc jamais bloquée
	return `/media/${id}?${params.toString()}`;
};

// Champs techniques de Directus qu'on ne veut pas mélanger au contenu
const META = new Set([
	'id',
	'languages_code',
	'translations',
	'user_created',
	'user_updated',
	'date_created',
	'date_updated'
]);

/** Garde seulement les vrais champs remplis (une valeur vide dans Directus = on garde le texte par défaut). */
const clean = (obj: Record<string, unknown> | null | undefined) =>
	Object.fromEntries(
		Object.entries(obj ?? {}).filter(
			([key, value]) => !META.has(key) && !key.endsWith('_id') && value !== null && value !== ''
		)
	);

/**
 * Lit un singleton dans la langue demandée, sans faire planter la page si Directus est vide ou hors ligne.
 * Ordre de priorité : traduction Directus (collection « <Nom>_translations ») → champs du singleton → texte par défaut du code.
 */
export async function safeSingleton<T extends Record<string, unknown>>(
	name: string,
	fallback: T,
	locale = 'en'
): Promise<T> {
	try {
		// 1. Avec les traductions (filtrées sur la langue)
		const data = (await directus.request(
			readSingleton(
				name as never,
				{
					fields: ['*', { translations: ['*'] }],
					deep: { translations: { _filter: { languages_code: { _eq: locale } } } }
				} as never
			)
		)) as (Record<string, unknown> & { translations?: Record<string, unknown>[] }) | null;
		const translation = Array.isArray(data?.translations) ? data.translations[0] : undefined;
		return { ...fallback, ...clean(data), ...clean(translation) } as T;
	} catch {
		try {
			// 2. Le singleton n'a pas (encore) de champ « translations »
			const data = (await directus.request(readSingleton(name as never))) as Record<
				string,
				unknown
			> | null;
			return { ...fallback, ...clean(data) } as T;
		} catch (e) {
			console.warn(`[directus] ${name} indisponible, contenu par défaut utilisé`, e);
			return fallback;
		}
	}
}

/**
 * Lit une collection (ex. « projects ») dans la langue demandée, triée par « sort ».
 * Chaque élément = ses champs + ceux de sa traduction. Renvoie null si Directus est vide ou hors ligne.
 */
export async function safeCollection(
	name: string,
	locale = 'en'
): Promise<Record<string, unknown>[] | null> {
	try {
		const rows = (await directus.request(
			readItems(
				name as never,
				{
					fields: ['*', { translations: ['*'] }],
					deep: { translations: { _filter: { languages_code: { _eq: locale } } } },
					sort: ['sort']
				} as never
			)
		)) as (Record<string, unknown> & { translations?: Record<string, unknown>[] })[];
		if (!rows?.length) return null;
		return rows.map((row) => ({ ...clean(row), ...clean(row.translations?.[0]) }));
	} catch (e) {
		console.warn(`[directus] ${name} indisponible, contenu par défaut utilisé`, e);
		return null;
	}
}

/** Image : fichier Directus (id) → URL ; sinon on garde l'image par défaut du code. */
export const imageOrFallback = (id: unknown, fallback: string, options: AssetOptions = {}) =>
	typeof id === 'string' && id ? (assetUrl(id, options) ?? fallback) : fallback;

export default directus;
export { readItems, readSingleton };
