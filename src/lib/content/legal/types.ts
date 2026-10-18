// Structure des pages légales (cookies, mentions légales, confidentialité).
// Les textes « p » peuvent contenir du HTML simple : <strong>, <br />, <a href="…">, <mark> (à compléter).
export type LegalCard = {
	name: string;
	badge: string;
	filled?: boolean;
	text: string;
	items?: string[];
};

export type LegalBlock =
	| { p: string }
	| { ul: string[] }
	| { cards: LegalCard[] }
	| { links: { label: string; url: string }[] };

export type LegalSection = { title: string; blocks: LegalBlock[] };

export type LegalPage = { title: string; description: string; sections: LegalSection[] };

export type LegalPages = { cookies: LegalPage; mentions: LegalPage; privacy: LegalPage };
