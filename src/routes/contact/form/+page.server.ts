import { fail } from '@sveltejs/kit';
import { PUBLIC_DIRECTUS_URL } from '$app/env/public';
import { RESEND_API_KEY, DIRECTUS_SERVICE_TOKEN } from '$app/env/private';
import { m } from '#lib/paraglide/messages.js';
import type { Actions } from './$types';

const TO = 'unixcreativestudio@gmail.com';
// Tant que ton domaine n'est pas vérifié dans Resend, on envoie depuis l'adresse de test Resend
const FROM = 'Unix website <onboarding@resend.dev>';

const SERVICES: Record<string, string> = {
	website: 'A website',
	google: 'Being found on Google',
	ads: 'Ads',
	app: 'A mobile app',
	unsure: 'Not sure yet'
};
const WHEN: Record<string, string> = { asap: 'As soon as possible', soon: 'In 1 - 2 months', norush: 'No rush' };

const escape = (s: string) =>
	s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();
		const get = (k: string) => String(form.get(k) ?? '').trim().slice(0, 2000);

		// Piège à robots : ce champ est caché, un humain ne le remplit jamais
		if (get('website_url')) return { success: true };

		const data = {
			first_name: get('first_name'),
			last_name: get('last_name'),
			business: get('business'),
			services: form.getAll('services').map(String).filter((s) => s in SERVICES),
			about: get('about'),
			when: get('when'),
			email: get('email'),
			phone: get('phone'),
			source: get('source')
		};

		// Vérification côté serveur (la page vérifie déjà à chaque étape)
		if (
			!data.first_name ||
			!data.last_name ||
			!data.business ||
			!data.services.length ||
			!(data.when in WHEN) ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
			!data.source
		) {
			return fail(400, { error: m.form_error_missing() });
		}

		const results = await Promise.allSettled([
			// 1. Email via Resend
			RESEND_API_KEY
				? fetch('https://api.resend.com/emails', {
						method: 'POST',
						headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
						body: JSON.stringify({
							from: FROM,
							to: [TO],
							reply_to: data.email,
							subject: `New request: ${data.first_name} ${data.last_name} (${data.business})`,
							html: `
								<h2>New request from the website 🌸</h2>
								<p><b>Name:</b> ${escape(data.first_name)} ${escape(data.last_name)}</p>
								<p><b>Business:</b> ${escape(data.business)}</p>
								<p><b>Help with:</b> ${data.services.map((s) => SERVICES[s]).join(', ')}</p>
								<p><b>About:</b> ${escape(data.about) || '—'}</p>
								<p><b>Start:</b> ${WHEN[data.when]}</p>
								<p><b>Email:</b> ${escape(data.email)}</p>
								<p><b>Phone:</b> ${escape(data.phone) || '—'}</p>
								<p><b>Heard about us:</b> ${escape(data.source)}</p>`
						})
					}).then((r) => {
						if (!r.ok) throw new Error(`Resend ${r.status}`);
					})
				: Promise.reject(new Error('RESEND_API_KEY manquante')),

			// 2. Copie dans Directus (collection « contact_requests »)
			DIRECTUS_SERVICE_TOKEN
				? fetch(`${PUBLIC_DIRECTUS_URL}/items/contact_requests`, {
						method: 'POST',
						headers: { Authorization: `Bearer ${DIRECTUS_SERVICE_TOKEN}`, 'Content-Type': 'application/json' },
						body: JSON.stringify(data)
					}).then((r) => {
						if (!r.ok) throw new Error(`Directus ${r.status}`);
					})
				: Promise.reject(new Error('DIRECTUS_SERVICE_TOKEN manquant'))
		]);

		results.forEach((r) => r.status === 'rejected' && console.warn('[contact]', r.reason));

		// Si ni l'email ni Directus n'ont marché, on prévient la personne
		if (results.every((r) => r.status === 'rejected')) {
			return fail(500, {
				error: m.form_error_send({ email: TO })
			});
		}

		return { success: true };
	}
};
