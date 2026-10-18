<script lang="ts">
	import Legal from '#lib/components/Legal.svelte';
</script>

<Legal
	title="Mentions légales"
	description="Mentions légales de Unix Creative Studio : éditeur du site, hébergement et coordonnées de contact."
	updated="Octobre 2026"
>
	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">1. Éditeur du site</h2>
		<p class="text-body">
			Le site est édité par <strong>Unix Creative Studio</strong>.
		</p>
		<p class="text-body">
			<strong>Contact :</strong>
			<a
				href="mailto:unixcreativestudio@gmail.com"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>unixcreativestudio@gmail.com</a
			>
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">2. Directeur de publication</h2>
		<p class="text-body">Laura Ocampo</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">3. Hébergement</h2>
		<p class="text-body">
			Le site est hébergé par :<br />
			<strong>Cloudflare, Inc.</strong> (hébergement et déploiement du site)<br />
			101 Townsend St, San Francisco, CA 94107, États-Unis
		</p>
		<p class="text-body">
			Le système de gestion de contenu (Directus) et les demandes envoyées via le formulaire de
			contact sont hébergés sur un serveur privé chez :<br />
			<strong>OVH SAS</strong> — 2 rue Kellermann, 59100 Roubaix, France
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">4. Propriété intellectuelle</h2>
		<p class="text-body">
			L'ensemble des contenus présents sur ce site (textes, illustrations, mascottes, logo, icônes,
			animations, etc.) est la propriété exclusive de Unix Creative Studio, sauf mention contraire.
			Toute reproduction, distribution, modification ou publication de ces éléments est interdite
			sans accord écrit préalable.
		</p>
		<p class="text-body">
			Les projets présentés dans la section « Our work » sont montrés avec l'accord des clients
			concernés. Leurs noms, logos et visuels restent la propriété de leurs titulaires respectifs.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">5. Cookies et mesure d'audience</h2>
		<p class="text-body">
			Le site utilise uniquement un cookie nécessaire qui mémorise la langue choisie. Aucun outil de
			mesure d'audience avec cookies n'est utilisé. Pour plus d'informations, consultez notre
			<a
				href="/cookies"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>politique de cookies</a
			>.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">6. Protection des données personnelles</h2>
		<p class="text-body">
			Unix Creative Studio collecte des données personnelles uniquement via le formulaire de contact
			et la prise de rendez-vous. Pour plus d'informations, consultez notre
			<a
				href="/politique-de-confidentialite"
				class="text-primary-accent underline underline-offset-2 hover:text-primary-dark"
				>politique de confidentialité</a
			>.
		</p>
	</section>

	<div class="border-t border-dashed border-primary/50"></div>

	<section class="flex flex-col gap-3">
		<h2 class="text-subtitle text-primary-dark">7. Loi applicable et juridiction</h2>
		<p class="text-body">
			Les présentes mentions légales sont soumises au droit belge. Tout litige relatif à
			l'utilisation du site sera soumis à la compétence exclusive des tribunaux de l'arrondissement
			de Bruxelles.
		</p>
	</section>
</Legal>
