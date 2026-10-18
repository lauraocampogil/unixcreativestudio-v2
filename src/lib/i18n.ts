import { getLocale, localizeHref, type Locale } from '#lib/paraglide/runtime.js';

export type { Locale };
export { getLocale };

/** Lien interne dans la langue actuelle : "/contact" → "/fr/contact". Les liens externes ne changent pas. */
export const l = (href: string) => (href.startsWith('/') ? localizeHref(href) : href);

/** Choisit la version d'un contenu dans la langue actuelle (anglais si la langue manque). */
export const pick = <T>(byLocale: Record<Locale, T>): T => byLocale[getLocale()] ?? byLocale.en;
