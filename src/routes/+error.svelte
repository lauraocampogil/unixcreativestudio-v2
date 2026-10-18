<script lang="ts">
	import { page } from '$app/state';
	import { gsap } from 'gsap';
	import Button from '#lib/components/Button.svelte';
	import { httpErrors, errorTitle } from '#lib/http-errors.ts';

	const status = $derived(page.status);
	const title = $derived(errorTitle(status));
	const message = $derived(httpErrors[status] ?? page.error?.message ?? 'Something went wrong');

	// Les blobs du hero, en SVG inline pour pouvoir les animer
	const svgs = import.meta.glob(
		[
			'/static/assets/blob-top.svg',
			'/static/assets/blob-top-mobile.svg',
			'/static/assets/blob-bottom.svg',
			'/static/assets/blob-bottom-mobile.svg'
		],
		{
			query: '?raw',
			import: 'default',
			eager: true
		}
	) as Record<string, string>;
	// Chaque blob reçoit un filtre « vague » qui déforme TOUTES ses formes ensemble :
	// le blob bouge en un seul bloc, sans espace entre les couches.
	const svg = (name: string, i: number) =>
		(svgs[`/static/assets/${name}.svg`] ?? '')
			.replace(
				/(<svg[^>]*>)/,
				`$1<defs><filter id="wave-${i}" x="-15%" y="-15%" width="130%" height="130%">` +
					`<feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="1" seed="${i + 3}" result="noise" />` +
					`<feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />` +
					`</filter></defs><g filter="url(#wave-${i})">`
			)
			.replace('</svg>', '</g></svg>');

	// Les blobs dépassent un peu de l'écran : la vague ne laisse jamais de trou sur les bords
	const BLOBS = [
		{ file: 'blob-top-mobile', side: 'top', class: '-top-4 -left-4 w-[calc(100%+2rem)] lg:hidden' },
		{ file: 'blob-top', side: 'top', class: '-top-6 -left-6 hidden w-[calc(67.5%+3rem)] lg:block' },
		{
			file: 'blob-bottom-mobile',
			side: 'bottom',
			class: '-bottom-4 -left-4 w-[calc(100%+2rem)] lg:hidden'
		},
		{
			file: 'blob-bottom',
			side: 'bottom',
			class: '-right-6 -bottom-6 hidden w-[calc(65.5%+3rem)] lg:block'
		}
	];

	let root = $state<HTMLElement>();

	// Vague sans fin :
	// 1. le bruit du filtre change doucement → les bords du blob ondulent comme de l'eau
	// 2. le blob entier respire (s'étire depuis son coin), toutes les couches ensemble
	$effect(() => {
		if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const ctx = gsap.context(() => {
			root!.querySelectorAll<HTMLElement>('[data-blob]').forEach((blob, i) => {
				const top = blob.dataset.blob === 'top';
				const noise = blob.querySelector('feTurbulence');
				const map = blob.querySelector('feDisplacementMap');

				gsap.to(noise, {
					attr: { baseFrequency: '0.006 0.0035' },
					duration: 5 + i * 0.6,
					ease: 'sine.inOut',
					yoyo: true,
					repeat: -1
				});
				gsap.fromTo(
					map,
					{ attr: { scale: 25 } },
					{
						attr: { scale: 55 },
						duration: 3.5 + i * 0.4,
						ease: 'sine.inOut',
						yoyo: true,
						repeat: -1
					}
				);
				gsap.set(blob, { transformOrigin: top ? '0% 0%' : '100% 100%' });
				gsap.to(blob, {
					scaleY: 1.06,
					scaleX: 1.02,
					duration: 3 + i * 0.3,
					ease: 'sine.inOut',
					yoyo: true,
					repeat: -1
				});
			});
		}, root);
		return () => ctx.revert();
	});
</script>

<svelte:head>
	<title>{status} — {title} — Unix Creative Studio</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main
	bind:this={root}
	data-nav="blue"
	class="grid-section relative flex min-h-svh items-center justify-center overflow-hidden bg-primary xl:content-center 3xl:container 3xl:mx-auto"
>
	<!-- Blobs (mobile / desktop) -->
	<div aria-hidden="true" class="pointer-events-none select-none">
		{#each BLOBS as blob, i (blob.file)}
			<div
				data-blob={blob.side}
				class="absolute {blob.class} [&_svg]:h-auto [&_svg]:w-full [&_svg]:overflow-visible"
			>
				<!-- SVG locaux du dossier static (pas de contenu externe) -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html svg(blob.file, i)}
			</div>
		{/each}
	</div>

	<div class="relative col-span-8 flex flex-col items-center text-center text-background">
		<p class="font-display text-[clamp(7rem,4rem+14vw,15rem)] leading-[0.85] font-black">
			{status}
		</p>
		<h1 class="mt-4 text-h2-sans font-medium">{title}</h1>
		<p class="mt-3 max-w-60 text-body-hero">{message}</p>
		<Button href="/" variant="light" class="mt-6" data-sveltekit-reload>Go to home</Button>
	</div>
</main>
