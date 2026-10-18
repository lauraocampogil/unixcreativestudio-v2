import { defineEnvVars } from '@sveltejs/kit/env';

// SvelteKit 3 : chaque variable du .env doit être déclarée ici.
// Publiques  → import { ... } from '$app/env/public'
// Privées    → import { ... } from '$app/env/private' (serveur uniquement)
export const variables = defineEnvVars({
	PUBLIC_DIRECTUS_URL: {
		public: true,
		description: 'URL de Directus, ex. http://localhost:8055',
		schema: (value) => {
			if (!value) throw new Error('PUBLIC_DIRECTUS_URL manque dans le fichier .env');
			new URL(value); // lève une erreur claire si l'URL est mal écrite
			return value;
		}
	},
	DIRECTUS_SERVICE_TOKEN: {
		description: 'Token Directus (serveur uniquement)',
		schema: (value) => value || undefined
	},
	RESEND_API_KEY: {
		description: 'Clé API Resend pour le formulaire de contact',
		schema: (value) => value || undefined
	},
	RESEND_FROM: {
		description:
			'Expéditeur des emails, ex. « Unix Creative Studio <hello@unixcreativestudio.com> ». Vide = adresse de test Resend (pas d’email de confirmation).',
		schema: (value) => value || undefined
	}
});
