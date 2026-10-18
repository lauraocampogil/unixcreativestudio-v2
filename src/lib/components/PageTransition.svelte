<script lang="ts">
	import { gsap } from 'gsap';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { screen } from '#lib/screen.ts';

	// Logo « U » avec la fleur (si le fichier existe, sinon un « U » en texte)
	const monogram = import.meta.glob('/static/assets/logo-u.svg', { eager: true, query: '?url', import: 'default' });
	const hasMonogram = Object.keys(monogram).length > 0;

	let overlay = $state<HTMLElement>();
	let blobTop = $state<HTMLElement>();
	let blobBottom = $state<HTMLElement>();
	let logo = $state<HTMLElement>();
	let bg = $state<HTMLElement>();

	let covering = false;
	let holding = false; // l'écran est-il signalé comme couvert ?
	const hold = () => {
		if (!holding) screen.cover();
		holding = true;
	};
	const release = () => {
		if (holding) screen.uncover();
		holding = false;
	};

	const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// 1. Avant de changer de page : les deux blobs s'étirent l'un vers l'autre et couvrent l'écran
	const cover = () =>
		new Promise<void>((resolve) => {
			if (!overlay || !blobTop || !blobBottom || !logo) return resolve();
			covering = true;
			hold(); // les textes de la nouvelle page attendent
			const vh = window.innerHeight;
			gsap.killTweensOf([overlay, blobTop, blobBottom, logo, bg]);
			gsap.set(bg!, { opacity: 0 });
			gsap.set(overlay, { autoAlpha: 1 });
			gsap.set([blobTop, blobBottom], { height: 0 });
			gsap.set(logo, { scale: 0, rotation: -20, opacity: 0 });

			// Sécurité : la navigation ne reste jamais bloquée, même si l'animation est interrompue
			setTimeout(resolve, 1500);

			gsap
				.timeline({ onComplete: resolve })
				.to([blobTop, blobBottom], { height: vh * 0.7, duration: 0.65, ease: 'power3.inOut' })
				// fond bleu derrière les blobs : on ne voit jamais la page pendant le changement
				.to(bg!, { opacity: 1, duration: 0.2, ease: 'none' }, '-=0.2')
				.to(logo, { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, '-=0.25')
				.to({}, { duration: 0.1 });
		});

	// 2. Une fois la nouvelle page affichée : le logo s'en va, les blobs se rétractent vers leurs coins
	const reveal = () => {
		if (!covering || !overlay || !blobTop || !blobBottom || !logo) return;
		covering = false;
		const el = overlay;
		gsap
			.timeline({
				delay: 0.25,
				onComplete: () => {
					gsap.set(el, { autoAlpha: 0 });
					release();
					// la nav reprend la couleur de ce qu'il y a dessous
					window.dispatchEvent(new Event('resize'));
				}
			})
			.to(logo, { scale: 0.7, opacity: 0, duration: 0.3, ease: 'power2.in' })
			.to(bg!, { opacity: 0, duration: 0.25, ease: 'none' }, '-=0.1')
			.to([blobTop, blobBottom], { height: 0, duration: 0.75, ease: 'power3.inOut' }, '-=0.1')
			// les textes montent pendant que les blobs se retirent
			.call(release, [], '-=0.45');
	};

	onNavigate((nav) => {
		const from = nav.from?.url;
		const to = nav.to?.url;
		// Pas d'animation : même page (ancre #services…), bouton retour, ou animations réduites
		if (!from || !to || from.pathname === to.pathname || nav.type === 'popstate' || reduce()) return;
		return cover();
	});

	afterNavigate(() => reveal());
</script>

<div
	bind:this={overlay}
	class="pointer-events-none invisible fixed inset-0 z-90 overflow-hidden"
	aria-hidden="true"
>
	<span bind:this={bg} class="absolute inset-0 bg-primary opacity-0"></span>

	<!-- Blob du haut : part du coin haut-gauche -->
	<span bind:this={blobTop} class="absolute top-0 left-0 block h-0 w-full">
		<img src="/assets/blob-top-mobile-stretch.svg" alt="" class="size-full lg:hidden" />
		<img src="/assets/blob-top-stretch.svg" alt="" class="hidden size-full lg:block" />
	</span>
	<!-- Blob du bas : part du coin bas-droit -->
	<span bind:this={blobBottom} class="absolute right-0 bottom-0 block h-0 w-full">
		<img src="/assets/blob-bottom-mobile-stretch.svg" alt="" class="size-full lg:hidden" />
		<img src="/assets/blob-bottom-stretch.svg" alt="" class="hidden size-full lg:block" />
	</span>

	<!-- Logo au centre -->
	<div class="absolute inset-0 grid place-items-center">
		<span bind:this={logo} class="grid place-items-center opacity-0">
			{#if hasMonogram}
				<img src="/assets/logo-u.svg" alt="" class="w-25 lg:w-37.5" />
			{:else}
				<span class="font-display text-[100px] leading-none font-black text-background lg:text-[150px]">U</span>
			{/if}
		</span>
	</div>
</div>
