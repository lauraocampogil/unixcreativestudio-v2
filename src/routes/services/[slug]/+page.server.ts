import { error, redirect } from '@sveltejs/kit';
import { localizeHref } from '#lib/paraglide/runtime.js';
import { SERVICES } from '#lib/content/services/index.ts';
import { getLocale } from '#lib/i18n.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
	void url.pathname; // recharge quand la langue (dans l'URL) change
	const { services, howWeWork } = SERVICES[getLocale()];
	// Anciens services (déjà connus de Google) → redirection définitive vers le nouveau
	const MOVED: Record<string, string> = { seo: 'web-design', ads: 'ai-consulting' };
	if (MOVED[params.slug]) redirect(301, localizeHref(`/services/${MOVED[params.slug]}`));
	const service = services.find((s) => s.slug === params.slug);
	if (!service) error(404, 'Service not found');
	return { service, howWeWork };
};
