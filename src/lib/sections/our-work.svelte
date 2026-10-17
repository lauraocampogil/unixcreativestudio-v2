<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Tag from '#lib/components/Tag.svelte';
	import { assetUrl } from '#lib/directus';

	type Project = {
		name: string;
		category: string;
		type: string;
		tagline: string;
		image: string; // chemin /images/... ou id d'un fichier Directus
		href: string;
	};

	let {
		tag = 'Our work',
		title = "Businesses we've helped grow",
		items = []
	}: { tag?: string; title?: string; items?: Project[] } = $props();

	// Escalier : chaque projet sur sa propre ligne, décalé (comme la maquette)
	// Mobile : décalage gauche / droite. Desktop : 4 colonnes de la grille, une ligne par projet
	const STAIRS = [
		'mr-auto xl:col-span-4 xl:col-start-1 xl:row-start-1',
		'ml-auto xl:col-span-4 xl:col-start-5 xl:row-start-2',
		'ml-[12%] xl:col-span-4 xl:col-start-3 xl:row-start-3',
		'mr-auto xl:col-span-4 xl:col-start-1 xl:row-start-4',
		'ml-auto xl:col-span-4 xl:col-start-5 xl:row-start-5'
	];
	// De combien le titre descend avant de rester fixe (0.12 = 12% de l'écran)
	const DROP = 0.12;
	// Vitesse de parallaxe de chaque image (px) : donne de la profondeur
	const SPEED = [60, 120, 80, 140, 70];

	const src = (image: string) =>
		image.startsWith('/') || image.startsWith('http') ? image : (assetUrl(image, { width: 1400 }) ?? '');

	let section = $state<HTMLElement>();
	let cursor = $state<HTMLElement>();
	let header = $state<HTMLElement>();
	let headerInner = $state<HTMLElement>();
	let projects = $state<HTMLElement[]>([]);

	// Le curseur fleur n'existe que sur les appareils avec une souris
	let finePointer = $state(false);

	$effect(() => {
		if (!section || !cursor || !header || !headerInner) return;
		const cursorEl = cursor;
		const sectionEl = section;
		const headerEl = header;
		const innerEl = headerInner;
		const els = [...projects];
		gsap.registerPlugin(ScrollTrigger);

		finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const mm = gsap.matchMedia();

		// 1. Parallaxe douce : chaque projet monte à sa propre vitesse par-dessus le titre fixe
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			// 0. Le titre part du haut de la section, descend un peu, puis reste fixe
			gsap.to(innerEl, {
				y: () => window.innerHeight * DROP, // descend juste un peu
				ease: 'none',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top top', // quand la section touche le haut de l'écran
					end: '+=25%', // puis reste fixe
					scrub: 1,
					invalidateOnRefresh: true
				}
			});

			els.forEach((el, i) => {
				gsap.fromTo(
					el,
					{ y: SPEED[i % SPEED.length] },
					{
						y: -SPEED[i % SPEED.length],
						ease: 'none',
						scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
					}
				);
			});
		});

		// 2. Curseur « View work » qui suit la souris avec un léger retard
		gsap.set(cursorEl, { xPercent: -50, yPercent: -50, scale: 0 });
		const moveX = gsap.quickTo(cursorEl, 'x', { duration: 0.5, ease: 'power3.out' });
		const moveY = gsap.quickTo(cursorEl, 'y', { duration: 0.5, ease: 'power3.out' });
		const onMove = (e: PointerEvent) => {
			moveX(e.clientX);
			moveY(e.clientY);
		};
		window.addEventListener('pointermove', onMove);

		return () => {
			window.removeEventListener('pointermove', onMove);
			mm.revert();
		};
	});

	const showCursor = () => cursor && gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
	const hideCursor = () => cursor && gsap.to(cursor, { scale: 0, duration: 0.3, ease: 'power2.in' });
</script>

<section
	id="work" bind:this={section} class="relative bg-background 3xl:container 3xl:mx-auto">
	<!-- Tag + grand titre : restent fixes pendant tout le scroll de la section -->
	<div bind:this={header} class="sticky top-0 h-svh px-5 pt-16 text-center xl:px-20 xl:pt-[100px]">
		<div bind:this={headerInner} class="flex flex-col items-center gap-4 will-change-transform">
		<Tag label={tag} />
		<h2
			class="max-w-[1100px] font-display text-[clamp(2.75rem,0.9rem+7.5vw,8rem)] leading-[0.9] font-black text-primary-dark uppercase"
		>
			{title}
		</h2>
		</div>
	</div>

	<!-- Les projets remontent par-dessus le titre -->
	<ul
		class="grid-section relative z-10 -mt-[100svh] flex flex-col gap-y-20 pt-[90svh] pb-[30svh] xl:gap-y-28"
	>
		{#each items as item, i (item.name)}
			<li
				bind:this={projects[i]}
				class="max-xl:w-[85%] sm:max-xl:w-[70%] lg:max-xl:w-[48%] xl:mx-0 {STAIRS[i % STAIRS.length]}"
			>
				<a
					href={item.href}
					target="_blank"
					rel="noopener"
					class="group block {finePointer ? 'cursor-none' : ''}"
					onpointerenter={showCursor}
					onpointerleave={hideCursor}
				>
					<div class="overflow-hidden rounded-card lg:rounded-section">
						<img
							src={src(item.image)}
							alt="Website {item.name}"
							loading="lazy"
							class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
						/>
					</div>
					<p class="mt-3 text-sm text-dark xl:text-base">
						<strong class="font-bold uppercase">{item.name}</strong> | {item.category} · {item.type}
						<span class="hidden xl:inline"> | {item.tagline}</span>
					</p>
				</a>
			</li>
		{/each}
	</ul>

	<!-- Curseur : fleur qui tourne sans arrêt + texte fixe au centre -->
	<div
		bind:this={cursor}
		class="pointer-events-none fixed top-0 left-0 z-50 grid h-[75px] w-[78px] place-items-center {finePointer ? '' : 'hidden'}"
		aria-hidden="true"
	>
		<img src="/assets/flower-cursor.svg" alt="" class="absolute inset-0 size-full animate-[spin_6s_linear_infinite]" />
		<span class="relative font-display text-[13px] leading-none font-bold text-background">View<br />work</span>
	</div>
</section>
