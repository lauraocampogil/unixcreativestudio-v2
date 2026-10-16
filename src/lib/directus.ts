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
	return `${PUBLIC_DIRECTUS_URL}/assets/${id}?${params.toString()}`;
};

/** Lit un singleton sans faire planter la page si Directus est vide ou hors ligne. */
export async function safeSingleton<T extends Record<string, unknown>>(
	name: string,
	fallback: T
): Promise<T> {
	try {
		const data = (await directus.request(readSingleton(name as never))) as Partial<T> | null;
		return { ...fallback, ...(data ?? {}) };
	} catch (e) {
		console.warn(`[directus] ${name} indisponible, contenu par défaut utilisé`, e);
		return fallback;
	}
}

export default directus;
export { readItems, readSingleton };
