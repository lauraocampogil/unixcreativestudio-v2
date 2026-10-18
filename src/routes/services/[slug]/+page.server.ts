import { error } from '@sveltejs/kit';
import { SERVICES } from '#lib/content/services/index.ts';
import { getLocale } from '#lib/i18n.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
	void url.pathname; // recharge quand la langue (dans l'URL) change
	const { services, howWeWork } = SERVICES[getLocale()];
	const service = services.find((s) => s.slug === params.slug);
	if (!service) error(404, 'Service not found');
	return { service, howWeWork };
};
