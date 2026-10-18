<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	// Structure commune des pages légales (cookies, mentions, confidentialité)
	type Props = { title: string; description: string; updated: string; children: Snippet };
	let { title, description, updated, children }: Props = $props();
</script>

<svelte:head>
	<title>{title} — Unix Creative Studio</title>
	<meta name="description" content={description} />
	<meta name="robots" content="noindex" />
</svelte:head>

<main
	class="grid-section min-h-svh bg-background pt-37.5 pb-24 xl:pt-50 xl:pb-40 3xl:container 3xl:mx-auto"
>
	<div class="col-span-8 mx-auto w-full max-w-3xl">
		<a
			href="/"
			class="mb-8 inline-flex items-center gap-2 text-small text-dark-light transition-colors hover:text-primary-dark"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 256 256"
				aria-hidden="true"
			>
				<path
					d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
				/>
			</svg>
			Retour
		</a>

		<h1 data-reveal use:reveal class="mb-3 text-cta text-balance text-primary-dark">{title}</h1>
		<p class="mb-10 text-caption text-dark-light">Dernière mise à jour : {updated}</p>

		<div class="legal flex flex-col gap-8 text-dark">
			{@render children()}
		</div>
	</div>
</main>
