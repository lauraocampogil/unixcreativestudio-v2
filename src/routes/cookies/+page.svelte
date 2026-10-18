<script lang="ts">
	import Legal from '#lib/components/Legal.svelte';

	const NECESSARY = [
		'PARAGLIDE_LOCALE — mémorise la langue choisie sur le site, conservé 400 jours'
	];
	const BROWSERS = [
		{ label: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
		{
			label: 'Mozilla Firefox',
			url: 'https://support.mozilla.org/fr/kb/activer-desactiver-cookies'
		},
		{ label: 'Safari', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' },
		{
			label: 'Microsoft Edge',
			url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
		}
	];
</script>

<Legal
	title="Politique de cookies"
	description="Informations sur l'utilisation des cookies sur le site de Unix Creative Studio."
	updated="Octobre 2026"
>
	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">Qu'est-ce qu'un cookie ?</h2>
		<p class="text-body">
			Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site
			web. Il permet au site de mémoriser vos actions et préférences pendant une durée déterminée.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">Cookies utilisés sur ce site</h2>
		<div class="flex flex-col gap-2 rounded-card bg-primary/15 p-5">
			<div class="flex flex-wrap items-center justify-between gap-2">
				<h3 class="text-body font-semibold text-primary-dark">Cookies nécessaires</h3>
				<span
					class="rounded-pill bg-primary-dark px-3 py-1 text-caption font-semibold text-background"
					>Toujours actifs</span
				>
			</div>
			<p class="text-body text-dark/70">
				Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.
			</p>
			<ul class="flex flex-col gap-1 pl-4">
				{#each NECESSARY as item (item)}
					<li class="flex items-start gap-2 text-small text-dark/60">
						<span class="text-primary-dark">•</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-col gap-2 rounded-card border border-primary/50 p-5">
			<div class="flex flex-wrap items-center justify-between gap-2">
				<h3 class="text-body font-semibold text-primary-dark">Mesure d'audience</h3>
				<span
					class="rounded-pill border border-primary-dark px-3 py-1 text-caption font-semibold text-primary-dark"
					>Aucun cookie</span
				>
			</div>
			<p class="text-body text-dark/70">
				Nous n'utilisons aucun outil de mesure d'audience qui dépose des cookies (pas de Google
				Analytics). Aucune donnée de navigation n'est revendue ni utilisée à des fins publicitaires.
			</p>
		</div>

		<div class="flex flex-col gap-2 rounded-card border border-primary/50 p-5">
			<div class="flex flex-wrap items-center justify-between gap-2">
				<h3 class="text-body font-semibold text-primary-dark">
					Prise de rendez-vous (Google Agenda)
				</h3>
				<span
					class="rounded-pill border border-primary-dark px-3 py-1 text-caption font-semibold text-primary-dark"
					>Site externe</span
				>
			</div>
			<p class="text-body text-dark/70">
				Le bouton « Let's have a 30 min call » ouvre la page de rendez-vous de Google Agenda. Ce
				site appartient à Google, qui peut y déposer ses propres cookies selon sa propre politique.
			</p>
		</div>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">Gérer vos préférences</h2>
		<p class="text-body">
			Comme ce site n'utilise que des cookies nécessaires, aucun bandeau de consentement n'est
			affiché. Vous pouvez toutefois configurer votre navigateur pour bloquer ou supprimer les
			cookies :
		</p>
		<ul class="flex flex-col gap-1 pl-4">
			{#each BROWSERS as browser (browser.url)}
				<li class="flex items-start gap-2 text-body">
					<span class="text-primary-dark">•</span>
					<a
						href={browser.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
						>{browser.label}</a
					>
				</li>
			{/each}
		</ul>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">Contact</h2>
		<p class="text-body">
			Pour toute question concernant notre politique de cookies :<br />
			<a
				href="mailto:unixcreativestudio@gmail.com"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>unixcreativestudio@gmail.com</a
			>
		</p>
	</section>
</Legal>
