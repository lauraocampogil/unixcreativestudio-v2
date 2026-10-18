import { error } from '@sveltejs/kit';
import { SERVICES, HOW_WE_WORK } from '#lib/services-data.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const service = SERVICES.find((s) => s.slug === params.slug);
	if (!service) error(404, 'Service not found');
	return { service, howWeWork: HOW_WE_WORK };
};
