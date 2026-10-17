<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '#lib/components/Button.svelte';

	type Service = { title: string; problem: string; what: string; href: string };

	let { title = 'Services', items = [] }: { title?: string; items?: Service[] } = $props();

	let track = $state<HTMLElement>();
	let cards = $state<HTMLElement[]>([]);

	// Inclinaison finale de chaque card dans la pile (en degrés)
	const ROTATIONS = [-3, 2.5, -1.5, 3];

	$effect(() => {
		if (!track || cards.length !== items.length || cards.length < 1) return;
		const trackEl = track;
		const els = [...cards];
		gsap.registerPlugin(ScrollTrigger);

		const mm = gsap.matchMedia();

		mm.add('(prefers-reduced-motion: no-preference)', () => {
			// Toutes les cards (la 1re aussi) attendent sous l'écran, plus inclinées
			gsap.set(els, {
				rotation: (i) => ROTATIONS[i % ROTATIONS.length] + 8,
				y: () => window.innerHeight,
				transformOrigin: '50% 50%'
			});

			const tl = gsap.timeline({
				defaults: { ease: 'power2.out' },
				scrollTrigger: {
					trigger: trackEl,
					start: 'top top', // la section se bloque quand elle touche le haut
					end: 'bottom bottom', // et se débloque après la dernière card
					scrub: 1,
					invalidateOnRefresh: true // recalcule window.innerHeight au resize
				}
			});

			els.forEach((card, i) => {
				// La card monte et se pose sur la pile...
				tl.to(card, { y: 0, rotation: ROTATIONS[i % ROTATIONS.length], duration: 1 });
				// ...pendant que la précédente recule légèrement (profondeur)
				if (i > 0) tl.to(els[i - 1], { scale: 0.95, duration: 1 }, '<');
			});

			// Petite pause sur la dernière card avant la section suivante
			tl.to({}, { duration: 0.3 });
		});

		return () => mm.revert();
	});
</script>

<!-- Piste : 100svh de scroll par card. Sans animation (reduced motion) : simple liste -->
<section
	id="services" class="relative bg-background 3xl:container 3xl:mx-auto">
	<div
		bind:this={track}
		class="relative h-[calc(var(--n)*100svh)] motion-reduce:h-auto"
		style="--n: {items.length}"
	>
		<div
			data-nav="blue"
			class="grid-section sticky top-0 flex h-svh flex-col items-center overflow-hidden rounded-section bg-primary-accent pt-[96px] pb-10 motion-reduce:static motion-reduce:h-auto lg:pt-[125px] xl:grid-rows-[auto_1fr]"
		>
			<h2 class="col-span-8 text-center text-h1 text-[clamp(2.5rem,1.1862rem+5.3486vw,6rem)] text-background">{title}</h2>

			<!-- Toutes les cards dans la même cellule de grille = empilées -->
			<div
				class="col-span-8 grid w-full flex-1 place-items-center motion-reduce:mt-12 motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-6"
			>
				{#each items as item, i (item.title)}
					<article
						bind:this={cards[i]}
						class="relative w-full max-w-[920px] overflow-hidden rounded-card bg-primary p-6 lg:rounded-section shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] will-change-transform [grid-area:1/1] lg:p-10"
					>
						<!-- Grande fleur décorative à droite -->
						<img
							src="/assets/flower-card.svg"
							alt=""
							aria-hidden="true"
							class="pointer-events-none absolute inset-y-0 -right-[12%] h-full w-auto max-w-none select-none sm:-right-[5%]"
						/>

						<div class="relative flex max-w-[560px] flex-col items-start">
							<span class="relative grid size-[50px] place-items-center">
								<img src="/assets/flower-number.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
								<span class="relative font-display text-xl font-bold text-background">{i + 1}.</span>
							</span>

							<h3
								class="mt-8 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-none font-bold text-background lg:mt-12"
							>
								{item.title}
							</h3>

							<div class="mt-4 flex flex-col gap-3 text-body text-background">
								<p>{item.problem}</p>
								<p>{item.what}</p>
							</div>

							<Button href={item.href} variant="light" class="mt-6 lg:mt-8">More information</Button>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
