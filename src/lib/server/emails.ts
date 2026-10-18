import { m } from '#lib/paraglide/messages.js';

// Email automatique envoyé à la personne qui a rempli le formulaire (dans sa langue).
// Les textes sont dans messages/*.json (clés « email_… »).

export type ContactData = {
	first_name: string;
	services: string[];
	when: string;
};

const escape = (s: string) =>
	s.replace(
		/[&<>"']/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
	);

const SERVICE_LABEL: Record<string, () => string> = {
	website: m.form_opt_website,
	google: m.form_opt_google,
	ads: m.form_opt_ads,
	app: m.form_opt_app,
	unsure: m.form_opt_unsure
};
const WHEN_LABEL: Record<string, () => string> = {
	asap: m.when_asap,
	soon: m.when_soon,
	norush: m.when_norush
};

// ✍️ Ta signature email (HTML). Colle ici celle de Gmail (Paramètres → Signature) quand tu l'as.
// Les images doivent être en ligne (URL https), pas des fichiers sur ton ordinateur.
export const SIGNATURE_HTML = `<p style="margin:0;">Laura<br />Unix Creative Studio<br /><a href="https://unixcreativestudio.com">unixcreativestudio.com</a></p>`;
const SIGNATURE_TEXT = 'Laura\nUnix Creative Studio\nhttps://unixcreativestudio.com';

export function confirmationEmail(data: ContactData) {
	const name = data.first_name;
	const services = data.services.map((s) => SERVICE_LABEL[s]?.() ?? s).join(', ');
	const when = WHEN_LABEL[data.when]?.() ?? data.when;

	const subject = m.email_subject({ name });

	const text = [
		m.email_hello({ name }),
		'',
		m.email_p1(),
		m.email_p2(),
		'',
		`${m.email_services()} ${services}`,
		`${m.email_when()} ${when}`,
		'',
		m.email_questions(),
		'',
		m.email_signoff(),
		'',
		SIGNATURE_TEXT
	].join('\n');

	// Email simple, comme un email écrit à la main : pas de design, juste le texte et ta signature
	const p = (t: string) => `<p style="margin:0 0 14px;">${t}</p>`;
	const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#222;">
${p(escape(m.email_hello({ name })))}
${p(escape(m.email_p1()))}
${p(escape(m.email_p2()))}
${p(`${escape(m.email_services())} ${escape(services)}<br />${escape(m.email_when())} ${escape(when)}`)}
${p(escape(m.email_questions()))}
${p(escape(m.email_signoff()))}
${SIGNATURE_HTML}
</div>`;

	return { subject, html, text };
}
