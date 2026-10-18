<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '#lib/components/Button.svelte';
	import { afterNavigate } from '$app/navigation';
	import { visit } from '#lib/visit';
	import { smooth } from '#lib/smooth';

	type Service = { title: string; problem: string; what: string; href: string };

	let { title = 'Services', items = [] }: { title?: string; items?: Service[] } = $props();

	// Retour depuis une page service : les 4 cards côte à côte (comme How we work), sans la pile
	const spread = visit.fromService;
	// Inclinaisons en mode « côte à côte » (desktop / mobile)
	const SPREAD_DESKTOP = [-6, 3, -3, 6];
	const SPREAD_MOBILE = [-2, 2, -1.5, 2.5];

	let section = $state<HTMLElement>();
	let track = $state<HTMLElement>();
	let cards = $state<HTMLElement[]>([]);

	// Inclinaison finale de chaque card dans la pile (en degrés)
	const ROTATIONS = [-3, 2.5, -1.5, 3];

	// En arrivant en mode côte à côte : on se place directement sur la section Services
	afterNavigate(() => {
		if (!spread || !section || visit.goingToSection) return;
		const el = section;
		setTimeout(() => {
			const y = el.getBoundingClientRect().top + window.scrollY;
			smooth.lenis?.scrollTo(y, { immediate: true, force: true });
			window.scrollTo(0, y);
		}, 60);
	});

	// Mode côte à côte : inclinaison de chaque card + petite entrée en cascade
	$effect(() => {
		if (!spread || cards.length !== items.length || !cards.length) return;
		const els = [...cards];
		const mm = gsap.matchMedia();
		mm.add({ desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' }, (ctx) => {
			const rot = ctx.conditions?.desktop ? SPREAD_DESKTOP : SPREAD_MOBILE;
			gsap.set(els, { rotation: (i) => rot[i % rot.length] });
			if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				gsap.from(els, { y: 80, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.5 });
			}
		});
		return () => mm.revert();
	});

	$effect(() => {
		if (spread) return; // pas de pile au scroll en mode côte à côte
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
	bind:this={section}
	id="services" class="relative bg-background 3xl:container 3xl:mx-auto">
	<div
		bind:this={track}
		class="relative {spread ? '' : 'h-[calc(var(--n)*100svh)]'} motion-reduce:h-auto"
		style="--n: {items.length}"
	>
		<div
			data-nav="blue"
			class="grid-section {spread ? 'min-h-svh pb-20 lg:pb-24' : 'sticky top-0 h-svh'} flex flex-col items-center overflow-hidden rounded-section bg-primary-accent pt-[96px] pb-10 motion-reduce:static motion-reduce:h-auto lg:pt-[125px] xl:grid-rows-[auto_1fr]"
		>
			<h2 data-reveal use:reveal class="col-span-8 text-center text-display text-background">{title}</h2>

			<!-- Toutes les cards dans la même cellule de grille = empilées -->
			<div
				class="col-span-8 w-full flex-1 {spread
					? 'mt-10 flex flex-col lg:mt-16 lg:flex-row lg:items-stretch lg:justify-center'
					: 'grid place-items-center motion-reduce:mt-12 motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-6'}"
			>
				{#each items as item, i (item.title)}
					<article
						bind:this={cards[i]}
						class="relative w-full overflow-hidden rounded-card bg-primary p-6 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] will-change-transform lg:rounded-section {spread
							? '-mt-3 first:mt-0 lg:-mx-2 lg:mt-0 lg:flex lg:w-[300px] lg:flex-col lg:p-7'
							: 'max-w-[920px] [grid-area:1/1] lg:p-10'}"
					>
						<!-- Grande fleur décorative à droite -->
						<img
							src="/assets/flower-card.svg"
							alt=""
							aria-hidden="true"
							class="pointer-events-none absolute inset-y-0 -right-[12%] h-full w-auto max-w-none select-none sm:-right-[5%]"
						/>

						<div class="relative flex max-w-[560px] flex-col items-start {spread ? 'lg:flex-1' : ''}">
							<span class="relative grid size-[50px] place-items-center">
								<img src="/assets/flower-number.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
								<span class="relative text-number text-background">{i + 1}.</span>
							</span>

							<h3
								class="text-h2 text-background {spread ? 'mt-6' : 'mt-8 lg:mt-12'}"
							>
								{item.title}
							</h3>

							<div class="mt-4 flex flex-col gap-3 text-background {spread ? 'text-small lg:mb-8' : 'text-body'}">
								<p>{item.problem}</p>
								<p>{item.what}</p>
							</div>

							<!-- côte à côte : le bouton est poussé en bas, au même niveau sur les 4 cards -->
							<Button href={item.href} variant="light" class="mt-6 {spread ? 'lg:mt-auto' : 'lg:mt-8'}">More information</Button>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
