<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	let { title = 'You run it. We help it grow' }: { title?: string } = $props();

	let section = $state<HTMLElement>();
	let slime = $state<HTMLElement>();
	let heading = $state<HTMLElement>();

	$effect(() => {
		if (!section || !slime || !heading) return;
		const sectionEl = section;
		const slimeEl = slime;
		const headingEl = heading;
		gsap.registerPlugin(ScrollTrigger, SplitText);

		const mm = gsap.matchMedia();
		let split: SplitText | undefined;

		document.fonts.ready.then(() => {
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				split = SplitText.create(headingEl, { type: 'words,chars' });

				// Une seule timeline liée au scroll : tout repart en arrière quand on remonte
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top bottom', // le bas du hero touche le bas de l'écran
						end: 'bottom bottom', // fin de la zone épinglée
						scrub: 1.5 // inertie douce, effet liquide
					}
				});

				// 1. Le blob coule et s'étire depuis le hero jusqu'en bas de l'écran
				tl.fromTo(slimeEl, { yPercent: -100 }, { yPercent: 0, duration: 1, ease: 'power1.out' });

				// 2. Le texte beige apparaît sur le blob, lettre par lettre, en élastique
				tl.from(
					split.chars,
					{
						yPercent: 90,
						scaleY: 0.2,
						scaleX: 1.6,
						opacity: 0,
						transformOrigin: '50% 100%',
						duration: 0.6,
						ease: 'elastic.out(1, 0.35)',
						stagger: 0.03
					},
					'-=0.2'
				);

				// 3. Petite pause avant la section suivante
				tl.to({}, { duration: 0.4 });
			});
		});

		return () => {
			split?.revert();
			mm.revert();
		};
	});
</script>

<!-- Section haute : la partie "sticky" reste à l'écran le temps de l'animation -->
<section bind:this={section} class="relative -mt-px h-[220svh] 3xl:container 3xl:mx-auto">
	<div class="sticky top-0 h-svh overflow-hidden">
		<!-- Le blob étiré : partie pleine (couleur du blob) + fin ondulée du blob-top -->
		<div bind:this={slime} class="absolute inset-0 flex flex-col">
			<div class="flex min-h-0 flex-[62] items-center justify-center bg-primary-dark">
				<h2
					bind:this={heading}
					class="max-w-[351px] px-5 text-center text-h1 text-background lg:max-w-[600px]"
				>
					{title}
				</h2>
			</div>
			<img
				src="/assets/blob-top-mobile-stretch.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none -mt-px block w-full min-h-0 max-w-none flex-[38] select-none lg:hidden"
			/>
			<img
				src="/assets/blob-top-stretch.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none -mt-px hidden w-full min-h-0 max-w-none flex-[38] select-none lg:block"
			/>
		</div>
	</div>
</section>
