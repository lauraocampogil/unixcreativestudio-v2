<script lang="ts">
	import Legal from '#lib/components/Legal.svelte';

	const COLLECTED = [
		'Prénom et nom',
		'Nom de votre entreprise ou activité',
		'Les services qui vous intéressent et le délai souhaité',
		'La description de votre projet (facultatif)',
		'Adresse email et numéro de téléphone (facultatif)',
		'Comment vous avez connu Unix Creative Studio'
	];
	const PURPOSES = [
		'Répondre à votre demande et vous recontacter par email ou téléphone',
		'Préparer une proposition ou un devis adapté à votre projet',
		'Organiser un appel de découverte si vous en réservez un'
	];
	const RECIPIENTS = [
		'Directus (système de gestion de contenu auto-hébergé) — serveur OVH, France',
		'OVH SAS (hébergement du serveur) — France',
		'Cloudflare (hébergement du site) — États-Unis, cadre de transfert conforme au RGPD',
		'Resend (envoi de l’email de notification) — États-Unis, cadre de transfert conforme au RGPD',
		'Google LLC (réception des emails via Gmail, prise de rendez-vous via Google Agenda et Google Meet) — États-Unis, cadre de transfert conforme au RGPD'
	];
	const RIGHTS = [
		"Droit d'accès à vos données",
		'Droit de rectification',
		"Droit à l'effacement",
		'Droit à la limitation du traitement',
		'Droit à la portabilité des données',
		"Droit d'opposition"
	];
</script>

<Legal
	title="Politique de confidentialité"
	description="Politique de confidentialité de Unix Creative Studio : comment vos données personnelles sont collectées, utilisées et protégées."
	updated="Octobre 2026"
>
	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">1. Responsable du traitement</h2>
		<p class="text-body">
			<strong>Unix Creative Studio</strong>
			Contact :
			<a
				href="mailto:unixcreativestudio@gmail.com"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>unixcreativestudio@gmail.com</a
			>
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">2. Données personnelles collectées</h2>
		<p class="text-body">
			Lorsque vous remplissez le formulaire de contact, nous collectons les données suivantes :
		</p>
		<ul class="flex flex-col gap-1 pl-4">
			{#each COLLECTED as item (item)}
				<li class="flex items-start gap-2 text-body">
					<span class="text-primary-dark">•</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
		<p class="text-body">
			Si vous réservez un appel, Google Agenda vous demande votre nom et votre adresse email pour
			créer le rendez-vous.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">3. Mode de collecte</h2>
		<p class="text-body">
			Les données sont collectées via le formulaire de contact du site. Elles sont enregistrées dans
			notre système de gestion de contenu (Directus), hébergé sur un serveur privé en France, et
			nous sont envoyées par email pour que nous puissions vous répondre rapidement.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">4. Finalités du traitement</h2>
		<ul class="flex flex-col gap-1 pl-4">
			{#each PURPOSES as item (item)}
				<li class="flex items-start gap-2 text-body">
					<span class="text-primary-dark">•</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">5. Base légale</h2>
		<p class="text-body">
			Le traitement est fondé sur votre demande : il est nécessaire pour vous répondre et préparer
			une éventuelle collaboration (mesures précontractuelles, article 6.1.b du RGPD). Le champ «
			Comment nous avez-vous connus ? » repose sur notre intérêt légitime à comprendre comment nos
			clients nous trouvent.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">6. Durée de conservation</h2>
		<p class="text-body">
			Les demandes reçues via le formulaire sont conservées 12 mois maximum si elles n'aboutissent
			pas à une collaboration. Si vous devenez client, vos données sont conservées pendant la durée
			du projet, puis le temps imposé par les obligations comptables et légales belges.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">7. Mesure d'audience</h2>
		<p class="text-body">
			Le site n'utilise aucun outil de mesure d'audience qui collecte des données personnelles ou
			dépose des cookies. Pour plus de détails, consultez notre
			<a
				href="/cookies"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>politique de cookies</a
			>.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">8. Destinataires des données</h2>
		<p class="text-body">
			Vos données ne sont jamais vendues. Elles peuvent être traitées par les services suivants, qui
			nous permettent de faire fonctionner le site :
		</p>
		<ul class="flex flex-col gap-1 pl-4">
			{#each RECIPIENTS as item (item)}
				<li class="flex items-start gap-2 text-body">
					<span class="text-primary-dark">•</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">9. Vos droits</h2>
		<p class="text-body">Conformément au RGPD, vous disposez des droits suivants :</p>
		<ul class="flex flex-col gap-1 pl-4">
			{#each RIGHTS as item (item)}
				<li class="flex items-start gap-2 text-body">
					<span class="text-primary-dark">•</span>
					<span>{item}</span>
				</li>
			{/each}
		</ul>
		<p class="text-body">
			Pour exercer ces droits :
			<a
				href="mailto:unixcreativestudio@gmail.com"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>unixcreativestudio@gmail.com</a
			><br />
			Vous pouvez également introduire une réclamation auprès de l'<a
				href="https://www.autoriteprotectiondonnees.be"
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>Autorité de protection des données</a
			>.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">10. Modifications</h2>
		<p class="text-body">
			Unix Creative Studio se réserve le droit de mettre à jour cette politique à tout moment. Toute
			modification sera publiée sur cette page.
		</p>
	</section>
</Legal>
