<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { page } from '$app/state';

	// Lien Google Agenda « prise de rendez-vous » (Google Meet, avec tes horaires dispo)
	// → Google Agenda > Créer > Planning de rendez-vous > Partager > copier le lien
	const BOOKING_URL = 'https://calendar.app.google/JgfoukgBXh57z2n48';

	// On garde le service recommandé par le quiz (?service=…&when=…) pour le formulaire
	const formHref = $derived(`/contact/form${page.url.search}`);

	const actions = $derived([
		{ lines: ['Let’s have a', '30 min call'], href: BOOKING_URL, external: true },
		{ lines: ['Don’t have time?', 'Text us'], href: formHref, external: false }
	]);
</script>

<svelte:head>
	<title>Contact — Unix Creative Studio</title>
	<meta
		name="description"
		content="Ready to grow your business? Book a free 30 min call or send us a message. We usually respond on the same day."
	/>
</svelte:head>

<main
	class="grid-section relative min-h-svh overflow-hidden bg-background pt-37.5 pb-30 xl:content-start xl:pt-67.5 3xl:container 3xl:mx-auto"
>
	<!-- Grande mascotte : en desktop elle touche le haut et le bas, on n'en voit que la moitié (comme Services) -->
	<img
		src="/assets/flower-contact.svg"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute top-77.5 right-[-55%] w-[110%] max-w-none select-none sm:top-65 sm:right-[-35%] sm:w-[80%] lg:inset-y-0 lg:right-0 lg:h-full lg:w-auto lg:translate-x-1/2"
	/>

	<div class="relative col-span-8 max-w-160 xl:col-span-4 xl:max-w-none">
		<h1 data-reveal use:reveal
			class="text-title text-primary-dark lg:max-w-140"
		>
			Ready to grow your business?
		</h1>

		<hr class="mt-10 border-primary lg:mt-14" />

		<ul class="mt-6 flex flex-col gap-5 sm:flex-row sm:gap-10 lg:mt-8">
			{#each actions as action (action.href)}
				<li>
					<a
						href={action.href}
						target={action.external ? '_blank' : undefined}
						rel={action.external ? 'noopener' : undefined}
						class="group flex items-center gap-3 px-1.5"
					>
						<!-- Texte sur 2 lignes fixes : le bouton reste collé au texte -->
						<span class="text-body font-semibold whitespace-nowrap text-dark">
							{action.lines[0]}<br />{action.lines[1]}
						</span>
						<!-- Bouton fleur 50px, comme sur les reviews -->
						<span
							class="relative grid w-12.5 shrink-0 place-items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
						>
							<img src="/assets/flower-button.svg" alt="" aria-hidden="true" class="w-full" />
							<img src="/assets/arrow-right.svg" alt="" aria-hidden="true" class="absolute w-5" />
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>
