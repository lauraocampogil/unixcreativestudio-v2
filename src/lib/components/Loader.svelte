<script lang="ts" module>
	// Joué une seule fois par chargement complet de la page (Cmd+R le relance),
	// mais pas quand on revient sur l'accueil depuis une autre page du site.
	let played = false;
</script>

<script lang="ts">
	import { gsap } from 'gsap';
	import { smooth } from '#lib/smooth';
	import { screen } from '#lib/screen';

	// Logos qui apparaissent l'un après l'autre (le « U » si le fichier existe, sinon un texte)
	const monogram = import.meta.glob('/static/assets/logo-u.svg', { eager: true, query: '?url', import: 'default' });
	const hasMonogram = Object.keys(monogram).length > 0;

	let loader = $state<HTMLElement>();
	let blobTop = $state<HTMLElement>();
	let blobBottom = $state<HTMLElement>();
	let logos = $state<HTMLElement[]>([]);
	let done = $state(typeof window !== 'undefined' && played);

	$effect(() => {
		if (!loader || !blobTop || !blobBottom || logos.length < 3) return;
		const el = loader;
		const top = blobTop;
		const bottom = blobBottom;
		const marks = [...logos];

		played = true;

		// Animations réduites → pas de loader
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			done = true;
			setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
			return;
		}

		// L'écran est couvert : les textes attendent avant de s'animer
		screen.cover();
		let released = false;
		const release = () => {
			if (released) return;
			released = true;
			screen.uncover();
		};

		// Toujours démarrer en haut de la page (le navigateur garde sinon la position après Cmd+R)
		history.scrollRestoration = 'manual';
		window.scrollTo(0, 0);

		// Bloquer complètement le scroll pendant le loader : rien ne bouge derrière
		document.documentElement.style.overflow = 'hidden';
		const block = (e: Event) => e.preventDefault();
		const blockKeys = (e: KeyboardEvent) => {
			if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) e.preventDefault();
		};
		window.addEventListener('wheel', block, { passive: false, capture: true });
		window.addEventListener('touchmove', block, { passive: false, capture: true });
		window.addEventListener('keydown', blockKeys, { capture: true });
		const unblock = () => {
			window.removeEventListener('wheel', block, { capture: true });
			window.removeEventListener('touchmove', block, { capture: true });
			window.removeEventListener('keydown', blockKeys, { capture: true });
			document.documentElement.style.overflow = '';
			smooth.lenis?.start();
		};
		// Lenis est créé juste après ce composant : on l'arrête dès qu'il existe
		const stopScroll = requestAnimationFrame(() => {
			smooth.lenis?.scrollTo(0, { immediate: true, force: true });
			smooth.lenis?.stop();
		});

		// Forme finale = exactement les blobs du hero (ceux visibles selon l'écran)
		const visible = (name: string) =>
			[...document.querySelectorAll<HTMLElement>(`[data-hero-blob="${name}"]`)].find(
				(b) => b.offsetParent !== null
			);
		const vh = window.innerHeight;
		const vw = window.innerWidth;

		gsap.set([top, bottom], { width: vw, height: vh * 0.62 });
		gsap.set(marks, { scale: 0, opacity: 0, rotation: -15 });

		const tl = gsap.timeline({
			delay: 0.2,
			onComplete: () => {
				unblock();
				release();
				done = true;
				// La nav recalcule sa couleur avec ce qu'il y a vraiment dessous (le hero)
				setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
			}
		});

		// 1. Les deux blobs étirés rétrécissent jusqu'à la moitié de l'écran
		tl.to([top, bottom], { height: vh * 0.4, duration: 0.8, ease: 'power3.inOut' });

		// 2. Les 3 logos apparaissent l'un après l'autre
		marks.forEach((m, i) => {
			tl.to(m, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' }, i === 0 ? '-=0.2' : '>');
			if (i < marks.length - 1) {
				tl.to(m, { scale: 0.6, opacity: 0, duration: 0.25, ease: 'power2.in' }, '+=0.25');
			}
		});

		// 3. À l'arrivée du dernier : les blobs prennent la forme exacte du hero
		tl.add(() => {}, '+=0.15');
		tl.addLabel('toHero');
		tl.to(
			top,
			{
				width: () => visible('top')?.getBoundingClientRect().width ?? vw * 0.675,
				height: () => visible('top')?.getBoundingClientRect().height ?? vh * 0.4,
				duration: 1.1,
				ease: 'power3.inOut'
			},
			'toHero'
		);
		tl.to(
			bottom,
			{
				width: () => visible('bottom')?.getBoundingClientRect().width ?? vw * 0.655,
				height: () => visible('bottom')?.getBoundingClientRect().height ?? vh * 0.4,
				// le bas du hero peut être plus bas que l'écran
				y: () => (visible('bottom')?.getBoundingClientRect().bottom ?? vh) - vh,
				duration: 1.1,
				ease: 'power3.inOut'
			},
			'toHero'
		);
		tl.to(marks.at(-1)!, { scale: 0.8, opacity: 0, duration: 0.4, ease: 'power2.in' }, 'toHero+=0.5');
		// Le titre et le sous-titre du hero commencent à monter pendant que les blobs se posent
		tl.call(release, [], 'toHero+=0.6');

		// 4. On révèle le vrai hero (identique en dessous)
		tl.to(el, { autoAlpha: 0, duration: 0.35, ease: 'none' });

		return () => {
			cancelAnimationFrame(stopScroll);
			tl.kill();
			unblock();
			release();
		};
	});
</script>

{#if !done}
	<div
		bind:this={loader}
		data-nav="blue"
		class="loader fixed inset-0 z-[100] overflow-hidden bg-primary"
		role="status"
		aria-label="Loading Unix Creative Studio"
	>
		<!-- Blob du haut (ancré en haut à gauche) -->
		<span bind:this={blobTop} class="absolute top-0 left-0 block h-[62svh] w-full">
			<img src="/assets/blob-top-mobile-stretch.svg" alt="" class="size-full lg:hidden" />
			<img src="/assets/blob-top-stretch.svg" alt="" class="hidden size-full lg:block" />
		</span>
		<!-- Blob du bas (ancré en bas à droite) -->
		<span bind:this={blobBottom} class="absolute right-0 bottom-0 block h-[62svh] w-full">
			<img src="/assets/blob-bottom-mobile-stretch.svg" alt="" class="size-full lg:hidden" />
			<img src="/assets/blob-bottom-stretch.svg" alt="" class="hidden size-full lg:block" />
		</span>

		<!-- Les 3 logos, superposés au centre (cachés au départ : ils apparaissent un par un) -->
		<div class="absolute inset-0 grid place-items-center">
			<span bind:this={logos[0]} class="col-start-1 row-start-1 grid place-items-center opacity-0">
				{#if hasMonogram}
					<img src="/assets/logo-u.svg" alt="" class="w-[110px] lg:w-[180px]" />
				{:else}
					<span class="font-display text-[110px] leading-none font-black text-background lg:text-[170px]">U</span>
				{/if}
			</span>
			<img
				bind:this={logos[1]}
				src="/assets/flower-loader.svg"
				alt=""
				class="col-start-1 row-start-1 w-[120px] opacity-0 lg:w-[190px]"
			/>
			<img
				bind:this={logos[2]}
				src="/assets/unix-studio-logo.svg"
				alt=""
				class="col-start-1 row-start-1 w-[170px] opacity-0 lg:w-[230px]"
			/>
		</div>
	</div>
{/if}
