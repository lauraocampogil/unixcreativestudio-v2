<script lang="ts">
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
			class="grid-section sticky top-0 flex h-svh flex-col items-center justify-start overflow-hidden rounded-section bg-primary-dark pt-24 pb-6 lg:justify-center lg:pt-32 lg:pb-16 motion-reduce:static motion-reduce:h-auto xl:content-center"
		>
			<h2
				class="col-span-8 text-center font-display text-[clamp(2.5rem,1.1862rem+5.3486vw,6rem)] leading-[0.95] font-black text-background uppercase"
			>
				{title}
			</h2>

			<!-- Mobile : une colonne (cards qui se chevauchent un peu) / desktop : 4 cards côte à côte -->
			<ol class="col-span-8 mt-6 flex w-full flex-col lg:mt-16 lg:flex-row lg:items-center lg:justify-center">
				{#each items as item, i (item.title)}
					<li
						bind:this={cards[i]}
						class="relative -mt-4 flex w-full flex-col justify-center gap-1.5 rounded-card bg-primary px-5 py-5 will-change-transform first:mt-0 lg:-mx-2 lg:mt-0 lg:h-[400px] lg:w-[300px] lg:items-center lg:rounded-section lg:px-8 lg:text-center"
					>
						<!-- Fleur numérotée, en haut à gauche (à l'intérieur de la card) -->
						<span
							class="absolute top-4 left-4 grid size-[44px] place-items-center lg:top-6 lg:left-6 lg:size-[60px]"
						>
							<img src="/assets/flower-number.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
							<span class="relative font-display text-xl font-bold text-background">{i + 1}.</span>
						</span>

						<h3 class="pl-[58px] font-sans text-2xl leading-tight font-bold text-background lg:pl-0 lg:text-[36px]">
							{item.title}
						</h3>
						<p class="pl-[58px] font-sans text-base leading-[1.2] font-medium text-background lg:pl-0 lg:text-xl">
							{item.text}
						</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
