<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type Review = { quote: string; name: string; role: string; logo: string };

	let { label = 'What our client says', items = [] }: { label?: string; items?: Review[] } = $props();

	let section = $state<HTMLElement>();
	let row = $state<HTMLElement>();
	let index = $state(0);
	let direction = $state(1); // 1 = suivant, -1 = précédent (sens de l'animation)

	const current = $derived(items[index]);

	const go = (step: number) => {
		direction = step;
		index = (index + step + items.length) % items.length;
	};

	// Mascottes derrière la card : inclinaison de chacune
	const MASCOTS = [-8, 12, -20, 6, -14, 18, -6, 10];

	$effect(() => {
		if (!section || !row) return;
		const rowEl = row;
		const sectionEl = section;
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();

		// Scroll vers le bas → les mascottes vont à droite ; vers le haut → à gauche
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			gsap.fromTo(
				rowEl,
				{ x: () => -window.innerWidth * 0.25 },
				{
					x: () => window.innerWidth * 0.1,
					ease: 'none',
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1,
						invalidateOnRefresh: true
					}
				}
			);
		});

		return () => mm.revert();
	});
</script>

<section
	data-nav="blue"
	id="reviews"
	bind:this={section}
	class="grid-section relative overflow-hidden bg-primary-dark py-[120px] lg:py-[270px] 3xl:container 3xl:mx-auto"
	aria-roledescription="carousel"
	aria-label="Client reviews"
>
	<!-- Rangée de mascottes (300px) qui glisse avec le scroll -->
	<!-- Le centrage vertical est sur un conteneur à part : GSAP n'anime que la rangée (x),
	     sinon il reprend le « translate » CSS et la rangée descend en revenant sur la page -->
	<div class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden="true">
	<div bind:this={row} class="flex w-max will-change-transform">
		{#each MASCOTS as rotate, i (i)}
			<img
				src="/assets/flower-review.svg"
				alt=""
				class="-mx-[22px] w-[300px] max-w-none shrink-0 select-none"
				style="rotate: {rotate}deg"
			/>
		{/each}
	</div>
	</div>

	<!-- Card -->
	<div
		class="relative col-span-8 mx-auto grid w-full max-w-[927px] rounded-section bg-background p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-x-10 lg:px-[92px] lg:py-[60px]"
	>
		<!-- Flèches : en haut à gauche sur desktop, en bas sur mobile -->
		<div class="order-last mt-8 flex gap-3 lg:order-none lg:mt-0 lg:items-start">
			{#each [{ step: -1, icon: 'arrow-left', label: 'Previous review' }, { step: 1, icon: 'arrow-right', label: 'Next review' }] as btn (btn.step)}
				<button
					type="button"
					onclick={() => go(btn.step)}
					aria-label={btn.label}
					class="relative grid w-[50px] cursor-pointer place-items-center transition-transform duration-300 hover:scale-110 hover:rotate-12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
				>
					<img src="/assets/flower-button.svg" alt="" class="w-full" />
					<img src="/assets/{btn.icon}.svg" alt="" class="absolute w-5" />
				</button>
			{/each}
		</div>

		<div class="flex flex-col">
			<p class="flex gap-4 text-body text-primary-dark" aria-live="polite">
				<span>{index + 1}/{items.length}</span>
				<span>{label}</span>
			</p>

			<!-- Le contenu change avec une petite animation -->
			<div class="mt-8 grid lg:mt-[70px]">
				{#key index}
					<figure
						in:fly={{ x: 40 * direction, duration: 500, easing: cubicOut, delay: 150 }}
						out:fade={{ duration: 150 }}
						class="flex flex-col [grid-area:1/1]"
					>
						<blockquote
							class="max-w-[450px] text-quote text-primary-dark"
						>
							{current?.quote}
						</blockquote>
						<figcaption class="mt-10 flex items-center gap-3 lg:mt-[90px]">
							<img src={current?.logo} alt="" class="size-12 shrink-0 rounded-full object-contain lg:size-14" />
							<span class="flex flex-col leading-tight">
								<span class="text-body font-medium text-dark">{current?.name}</span>
								<span class="text-caption text-dark-light">{current?.role}</span>
							</span>
						</figcaption>
					</figure>
				{/key}
			</div>
		</div>
	</div>
</section>
