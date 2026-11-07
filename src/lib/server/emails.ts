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
	ai: m.form_opt_ai,
	// anciennes demandes (avant le passage au consulting IA)
	google: () => 'Google / SEO',
	ads: () => 'Ads',
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
// Logo : static/email-logo.png (PNG, car Gmail et Outlook n'affichent pas les SVG)
export const SIGNATURE_HTML = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;">
<tr>
<td style="padding-right:14px;vertical-align:middle;">
<a href="https://unixcreativestudio.com"><img src="https://unixcreativestudio.com/email-logo.png" width="96" height="42" alt="Unix Creative Studio" style="display:block;border:0;" /></a>
</td>
<td style="border-left:2px solid #94ADFF;padding-left:14px;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#222;">
<strong>Laura</strong><br />Unix Creative Studio<br />
<a href="https://unixcreativestudio.com" style="color:#466FF8;text-decoration:none;">unixcreativestudio.com</a>
</td>
</tr>
</table>`;
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
