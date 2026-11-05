import type { Locale } from '#lib/i18n.ts';

// Infos du site utilisées pour le SEO (balises meta, schema.org, sitemap)
export const SITE_URL = 'https://unixcreativestudio.com';
export const SITE_NAME = 'Unix Creative Studio';
export const EMAIL = 'unixcreativestudio@gmail.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const PUBLISHER = SITE_NAME;

/** Adresse complète et unique d'une page : https://unixcreativestudio.com/ pour l'accueil, sans « / » final ailleurs. */
export const pageUrl = (path: string) => {
	const clean = path.replace(/\/+$/, '');
	return clean ? `${SITE_URL}${clean}` : `${SITE_URL}/`;
};

// Mots-clés par langue (balise meta keywords, lue surtout par Bing ; Google se base sur le contenu)
export const KEYWORDS: Record<Locale, string> = {
	en: 'web design Brussels, website creation Brussels, web agency Brussels, web developer Brussels, AI consulting Brussels, AI automation for small business, AI agency Belgium, mobile app development Belgium, small business website, Unix Creative Studio',
	fr: 'création site internet Bruxelles, agence web Bruxelles, webdesigner Bruxelles, développeur web Bruxelles, consultant IA Bruxelles, automatisation IA PME, agence IA Belgique, application mobile Belgique, site web petite entreprise, Unix Creative Studio',
	es: 'diseño web Bruselas, creación de páginas web Bruselas, agencia web Bruselas, desarrollador web Bruselas, consultoría IA Bruselas, automatización con IA para pymes, agencia de IA Bélgica, desarrollo de apps móviles Bélgica, web para pequeñas empresas, Unix Creative Studio',
	nl: 'webdesign Brussel, website laten maken Brussel, webbureau Brussel, webdeveloper Brussel, AI-consulting Brussel, AI-automatisering kmo, AI-bureau België, app ontwikkeling België, website kleine onderneming, Unix Creative Studio'
};

// Langue au format Open Graph (Facebook, LinkedIn, WhatsApp…)
export const OG_LOCALE: Record<Locale, string> = {
	en: 'en_US',
	fr: 'fr_BE',
	es: 'es_ES',
	nl: 'nl_BE'
};

// Réseaux sociaux : utilisés dans le menu, le footer et schema.org (« sameAs »)
export const SOCIAL_LINKS = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/unix-studio-934090445/' },
	{ label: 'Instagram', href: 'https://www.instagram.com/unix_studio_/' },
	{ label: 'TikTok', href: 'https://www.tiktok.com/@unixcreativestudio' }
];
// Ajoute ici le lien de ta fiche Google Business Profile (bouton « Partager » sur ta fiche)
const GOOGLE_BUSINESS = 'https://www.google.com/search?kgmid=/g/11zyj33hcq';
export const SOCIALS: string[] = [
	...SOCIAL_LINKS.map((s) => s.href),
	...(GOOGLE_BUSINESS ? [GOOGLE_BUSINESS] : [])
];

// Pages publiques, pour le sitemap (sans la langue : /fr, /es, /nl sont ajoutés automatiquement)
export const PAGES = [
	{ path: '/', priority: 1.0 },
	{ path: '/contact', priority: 0.8 },
	{ path: '/services/web-design', priority: 0.9 },
	{ path: '/services/ai-consulting', priority: 0.9 },
	{ path: '/services/mobile-app', priority: 0.9 }
];

// schema.org : l'entreprise (repris sur toutes les pages)
export const organization = (description: string) => ({
	'@type': 'ProfessionalService',
	'@id': `${SITE_URL}/#organization`,
	name: SITE_NAME,
	url: SITE_URL,
	logo: `${SITE_URL}/icon-512.png`,
	image: OG_IMAGE,
	email: EMAIL,
	description,
	address: { '@type': 'PostalAddress', addressLocality: 'Brussels', addressCountry: 'BE' },
	areaServed: [
		{ '@type': 'City', name: 'Brussels' },
		{ '@type': 'Country', name: 'Belgium' }
	],
	knowsLanguage: ['en', 'fr', 'es', 'nl'],
	priceRange: '€€',
	...(SOCIALS.length ? { sameAs: SOCIALS } : {})
});

/** Balise <script type="application/ld+json"> sûre (le « < » est échappé). */
export const jsonLd = (data: unknown) =>
	`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...(data as object) }).replace(/</g, '\\u003c')}</script>`;
