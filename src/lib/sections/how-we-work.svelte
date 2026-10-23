<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	type Step = { title: string; text: string };
	let { title = 'How we work', items = [] }: { title?: string; items?: Step[] } = $props();

	let track = $state<HTMLElement>();
	let cards = $state<HTMLElement[]>([]);

	// Inclinaison finale de chaque card (desktop : côte à côte / mobile : empilées)
	const ROT_DESKTOP = [-9, 3, -3, 8];
	const ROT_MOBILE = [-2, 2, -1.5, 2.5];

	$effect(() => {
		if (!track || cards.length !== items.length || !cards.length) return;
		const trackEl = track;
		const els = [...cards];
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();

		// Même animation que Services : la section se bloque, les cards arrivent une par une depuis le bas
		mm.add(
			{
				desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
				mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'
			},
			(ctx) => {
				const rot = ctx.conditions?.desktop ? ROT_DESKTOP : ROT_MOBILE;
				gsap.set(els, {
					y: () => window.innerHeight,
					rotation: (i) => rot[i % rot.length] + 10,
					transformOrigin: '50% 50%'
				});

				const tl = gsap.timeline({
					defaults: { ease: 'power2.out', duration: 1 },
					scrollTrigger: {
						trigger: trackEl,
						start: 'top top',
						end: 'bottom bottom',
						scrub: 1,
						invalidateOnRefresh: true
					}
				});
				els.forEach((card, i) => tl.to(card, { y: 0, rotation: rot[i % rot.length] }));
				tl.to({}, { duration: 0.3 }); // petite pause avant le footer
			}
		);

		// Sans animation : les cards gardent juste leur inclinaison
		mm.add('(prefers-reduced-motion: reduce)', () => {
			gsap.set(els, { rotation: (i) => ROT_MOBILE[i % ROT_MOBILE.length] });
		});

		return () => mm.revert();
	});
</script>

<section data-nav="blue" class="relative bg-background 3xl:container 3xl:mx-auto">
	<div
		bind:this={track}
		class="relative h-[calc(var(--n)*80svh)] motion-reduce:h-auto"
		style="--n: {items.length}"
	>
		<div
			class="grid-section sticky top-0 flex h-svh flex-col items-center justify-start overflow-hidden bg-primary-dark pt-24 pb-6 motion-reduce:static motion-reduce:h-auto xl:content-center lg:justify-center lg:pt-32 lg:pb-16"
		>
			<h2 data-reveal use:reveal class="col-span-8 text-center text-display text-background">
				{title}
			</h2>

			<!-- Mobile : une colonne (cards qui se chevauchent un peu) / desktop : 4 cards côte à côte -->
			<ol
				class="col-span-8 mt-6 flex w-full flex-col lg:mt-16 lg:flex-row lg:items-center lg:justify-center"
			>
				{#each items as item, i (item.title)}
					<li
						bind:this={cards[i]}
						class="relative -mt-4 flex w-full flex-col justify-center gap-1.5 rounded-card bg-primary px-5 py-5 will-change-transform first:mt-0 lg:-mx-2 lg:mt-0 lg:h-100 lg:w-75 lg:items-center lg:rounded-section lg:px-8 lg:text-center"
					>
						<!-- Fleur numérotée, en haut à gauche (à l'intérieur de la card) -->
						<span
							class="absolute top-4 left-4 grid size-11 place-items-center lg:top-6 lg:left-6 lg:size-15"
						>
							<img
								src="/assets/flower-number.svg"
								alt=""
								aria-hidden="true"
								class="absolute inset-0 size-full"
							/>
							<span class="relative text-number text-background">{i + 1}.</span>
						</span>

						<h3 class="pl-14.5 text-h2-sans text-background lg:pl-0">
							{item.title}
						</h3>
						<p class="pl-14.5 text-body font-medium text-background lg:pl-0">
							{item.text}
						</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
