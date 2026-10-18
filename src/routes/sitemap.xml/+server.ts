import { locales, localizeHref } from '#lib/paraglide/runtime.js';
import { PAGES, SITE_URL } from '#lib/seo.ts';
import type { RequestHandler } from './$types';

// sitemap.xml : chaque page dans les 4 langues, avec les liens entre les versions (hreflang)
export const GET: RequestHandler = () => {
	const url = (path: string, locale: (typeof locales)[number]) =>
		`${SITE_URL}${localizeHref(path, { locale }).replace(/\/$/, '')}` || SITE_URL;
	const today = new Date().toISOString().slice(0, 10);

	const entries = PAGES.flatMap(({ path, priority }) =>
		locales.map((locale) => {
			const alternates = locales
				.map((l) => `\t\t<xhtml:link rel="alternate" hreflang="${l}" href="${url(path, l)}" />`)
				.concat(`\t\t<xhtml:link rel="alternate" hreflang="x-default" href="${url(path, 'en')}" />`)
				.join('\n');
			return `\t<url>\n\t\t<loc>${url(path, locale)}</loc>\n\t\t<lastmod>${today}</lastmod>\n\t\t<priority>${priority.toFixed(1)}</priority>\n${alternates}\n\t</url>`;
		})
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'max-age=3600' }
	});
};
