<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	let { title = 'You run it. We help it grow' }: { title?: string } = $props();

	let section = $state<HTMLElement>();
	let blobDesktop = $state<HTMLImageElement>();
	let blobMobile = $state<HTMLImageElement>();
	let heading = $state<HTMLElement>();
	let stage = $state<HTMLElement>();
	let track = $state<HTMLElement>();

	// Combien de fois la hauteur de l'écran le blob s'étire au maximum
	const MAX_STRETCH = 4;

	$effect(() => {
		if (!section || !blobDesktop || !blobMobile || !heading || !stage || !track) return;
		const trackEl = track;
		const stageEl = stage;
		const sectionEl = section;
		const headingEl = heading;
		const desktop = blobDesktop;
		const mobile = blobMobile;
		gsap.registerPlugin(ScrollTrigger, SplitText);

		const mm = gsap.matchMedia();
		let split: SplitText | undefined;

		const build = (blob: HTMLImageElement) => {
			if (!split) return;
			gsap.set(blob, { scaleY: 0 });

			// Une seule timeline liée au scroll : tout repart en arrière quand on remonte
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: trackEl,
					start: 'top bottom', // le bas du hero touche le bas de l'écran
					end: 'bottom bottom', // fin de la zone épinglée
					scrub: 2 // inertie douce, effet liquide
				}
			});

			// 1. Le blob s'étire depuis le hero jusqu'à remplir l'écran
			tl.to(blob, { scaleY: MAX_STRETCH, duration: 1.4, ease: 'power1.in' });
			// ...et le fond crème devient bleu foncé pendant l'étirement
			tl.to(stageEl, { backgroundColor: '#466ff8', duration: 0.7, ease: 'none' }, 0.7);

			// 2. Le texte beige apparaît sur le blob, lettre par lettre, en élastique
			tl.fromTo(
				split.chars,
				{ yPercent: 90, scaleY: 0.2, scaleX: 1.6, opacity: 0 },
				{
					yPercent: 0,
					scaleY: 1,
					scaleX: 1,
					opacity: 1,
					transformOrigin: '50% 100%',
					duration: 0.6,
					ease: 'elastic.out(1, 0.35)',
					stagger: 0.03
				},
				'-=0.3'
			);

			// 3. Courte pause, puis on enchaîne avec la section suivante
			// Le blob étiré disparaît (fond déjà bleu foncé) → une seule vague, celle de la fin
			tl.to(blob, { opacity: 0, duration: 0.4, ease: 'power1.out' }, '<');
			tl.to({}, { duration: 0.15 });
		};

		document.fonts.ready.then(() => {
			split = SplitText.create(headingEl, { type: 'words,chars' });
			mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () =>
				build(desktop)
			);
			mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () =>
				build(mobile)
			);
		});

		return () => {
			split?.revert();
			mm.revert();
		};
	});
</script>

<!-- La "piste" donne la durée du scroll ; la partie sticky reste à l'écran pendant l'animation -->
<section bind:this={section} class="relative -mt-3 3xl:container 3xl:mx-auto">
	<div bind:this={track} class="relative h-[260svh]">
		<div bind:this={stage} class="sticky top-0 h-svh overflow-hidden bg-background">
			<!-- Uniquement le blob, étiré verticalement depuis le hero -->
			<img
				bind:this={blobMobile}
				src="/assets/blob-top-mobile-stretch.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none absolute -top-3 left-0 h-svh w-full max-w-none origin-top will-change-transform select-none lg:hidden"
			/>
			<img
				bind:this={blobDesktop}
				src="/assets/blob-top-stretch.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none absolute -top-3 left-0 hidden h-svh w-full max-w-none origin-top will-change-transform select-none lg:block"
			/>

			<div class="absolute inset-0 flex items-center justify-center">
				<h2
					bind:this={heading}
					class="max-w-[351px] px-5 text-center text-h1 text-background lg:max-w-[600px]"
				>
					{title}
				</h2>
			</div>
		</div>
	</div>
</section>
