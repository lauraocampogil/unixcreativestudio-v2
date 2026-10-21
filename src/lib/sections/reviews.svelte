<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import { screenReady } from '#lib/screen.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { safeImg } from '#lib/actions/safe-img.ts';

	type Review = { quote: string; name: string; role: string; logo: string };

	let { label = 'What our client says', items = [] }: { label?: string; items?: Review[] } =
		$props();

	// Temps avant de passer automatiquement à l'avis suivant
	const AUTOPLAY = 6000;

	let section = $state<HTMLElement>();
	let row = $state<HTMLElement>();
	let stage = $state<HTMLElement>();
	let card = $state<HTMLElement>();
	const figures: HTMLElement[] = $state([]);
	const counters: HTMLElement[] = $state([]);

	// Fonction branchée sur les flèches (définie quand le carrousel est prêt)
	let go = $state<(step: number) => void>(() => {});
	let current = $state(0); // avis affiché (pour les lecteurs d'écran)

	// Mascottes derrière la card : inclinaison de chacune
	const MASCOTS = [-8, 12, -20, 6, -14, 18, -6, 10];

	// Mascottes : scroll vers le bas → à droite ; vers le haut → à gauche
	$effect(() => {
		if (!section || !row) return;
		const rowEl = row;
		const sectionEl = section;
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();
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

	// Carrousel : les lignes sortent vers le haut, les nouvelles arrivent du bas
	$effect(() => {
		if (!section || !stage || !card || !figures.length) return;
		gsap.registerPlugin(ScrollTrigger, SplitText);
		const sectionEl = section;
		const stageEl = stage;
		const cardEl = card;
		const n = items.length;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let killed = false;
		let index = 0;
		let entered = false; // la 1re entrée (au scroll) est faite
		let visible = false;
		let hovered = false;
		let timer: ReturnType<typeof setTimeout> | undefined;
		let tl: gsap.core.Timeline | undefined;
		let intro: gsap.core.Tween | undefined;
		const triggers: ScrollTrigger[] = [];
		const splits: SplitText[] = [];
		// Pour chaque avis : les lignes de chaque texte (compteur, citation, nom, rôle) + le logo
		const parts = figures.map((fig, i) => ({
			fig,
			counter: counters[i],
			lines: [] as Element[][],
			logo: fig.querySelector<HTMLElement>('[data-logo]')
		}));
		const allLines = (i: number) => parts[i].lines.flat();

		const schedule = () => {
			clearTimeout(timer);
			if (reduce || !entered || !visible || hovered || document.hidden || n < 2) return;
			timer = setTimeout(() => goTo((index + 1) % n), AUTOPLAY);
		};

		const goTo = (next: number) => {
			if (next === index || (!entered && !reduce)) return;
			clearTimeout(timer);
			tl?.progress(1); // si on clique pendant une animation, on la termine d'abord
			const prev = index;
			const from = parts[prev];
			const to = parts[next];
			index = next;
			current = next;

			if (reduce) {
				gsap.set([from.fig, from.counter], { autoAlpha: 0 });
				gsap.set([to.fig, to.counter], { autoAlpha: 1 });
				return;
			}

			tl = gsap
				.timeline({ onComplete: schedule })
				// Sortie : tout monte et disparaît
				.to(allLines(prev), { yPercent: -110, duration: 0.55, ease: 'power3.in', stagger: 0.03 })
				.to(from.logo, { scale: 0, duration: 0.4, ease: 'power3.in' }, 0.1)
				.set([from.fig, from.counter], { autoAlpha: 0 })
				.set(allLines(prev), { yPercent: 110 }) // prêt à revenir par le bas
				// Entrée : les nouvelles lignes arrivent du bas
				.set([to.fig, to.counter], { autoAlpha: 1 })
				.fromTo(
					allLines(next),
					{ yPercent: 110 },
					{ yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 }
				)
				.fromTo(to.logo, { scale: 0 }, { scale: 1, duration: 0.7, ease: 'back.out(1.7)' }, '<0.15');
		};

		go = (step: number) => goTo((index + step + n) % n);

		(async () => {
			await document.fonts.ready;
			await screenReady();
			if (killed) return;

			parts.forEach((p, i) => {
				const targets = [p.counter, ...p.fig.querySelectorAll<HTMLElement>('[data-split]')];
				targets.forEach((t, k) => {
					splits.push(
						SplitText.create(t, {
							type: 'lines',
							mask: 'lines',
							autoSplit: true,
							// Re-découpe au resize : on remet les lignes dans le bon état
							onSplit(self) {
								p.lines[k] = self.lines;
								gsap.set(self.lines, { yPercent: i === index && (entered || reduce) ? 0 : 110 });
							}
						})
					);
				});
				gsap.set([p.fig, p.counter], { autoAlpha: i === 0 ? 1 : 0 });
				if (i !== 0) gsap.set(p.logo, { scale: 0 });
			});
			stageEl.style.visibility = 'visible';

			if (reduce) {
				entered = true;
				return;
			}

			// Apparition de bas en haut quand on arrive, puis le texte reste.
			// Il se cache seulement quand on remonte au-dessus de la section, pour rejouer ensuite.
			const play = () => {
				if (entered) return;
				entered = true;
				gsap.killTweensOf(allLines(index));
				intro = gsap.to(allLines(index), {
					yPercent: 0,
					duration: 1,
					ease: 'power4.out',
					stagger: 0.06,
					onComplete: schedule
				});
			};
			const hide = () => {
				tl?.progress(1);
				intro?.kill();
				clearTimeout(timer);
				entered = false;
				gsap.set(allLines(index), { yPercent: 110 });
			};
			triggers.push(
				ScrollTrigger.create({ trigger: stageEl, start: 'top 88%', onEnter: play }),
				ScrollTrigger.create({ trigger: stageEl, start: 'top bottom', onLeaveBack: hide })
			);
		})();

		// Pause quand la section n'est pas à l'écran, au survol de la card, ou onglet caché
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			if (visible) schedule();
			else clearTimeout(timer);
		});
		io.observe(sectionEl);
		const enter = () => {
			hovered = true;
			clearTimeout(timer);
		};
		const leave = () => {
			hovered = false;
			schedule();
		};
		cardEl.addEventListener('pointerenter', enter);
		cardEl.addEventListener('pointerleave', leave);
		document.addEventListener('visibilitychange', schedule);

		return () => {
			killed = true;
			clearTimeout(timer);
			tl?.kill();
			triggers.forEach((t) => t.kill());
			intro?.kill();
			splits.forEach((sp) => sp.revert());
			io.disconnect();
			cardEl.removeEventListener('pointerenter', enter);
			cardEl.removeEventListener('pointerleave', leave);
			document.removeEventListener('visibilitychange', schedule);
		};
	});
</script>

<section
	data-nav="blue"
	id="reviews"
	bind:this={section}
	class="grid-section relative overflow-hidden bg-primary-dark py-30 3xl:container 3xl:mx-auto lg:py-67.5"
	aria-roledescription="carousel"
	aria-label={m.reviews_label()}
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
					class="-mx-5.5 w-75 max-w-none shrink-0 select-none"
					style="rotate: {rotate}deg"
				/>
			{/each}
		</div>
	</div>

	<!-- Card -->
	<div
		bind:this={card}
		class="relative col-span-8 mx-auto grid w-full max-w-231.75 rounded-section bg-background p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-x-10 lg:px-23 lg:py-15"
	>
		<!-- Flèches : en haut à gauche sur desktop, en bas sur mobile -->
		<div class="order-last mt-8 flex gap-3 lg:order-0 lg:mt-0 lg:items-start">
			{#each [{ step: -1, icon: 'arrow-left', label: m.reviews_prev() }, { step: 1, icon: 'arrow-right', label: m.reviews_next() }] as btn (btn.step)}
				<button
					type="button"
					onclick={() => go(btn.step)}
					aria-label={btn.label}
					class="relative grid w-12.5 cursor-pointer place-items-center transition-transform duration-300 hover:scale-110 hover:rotate-12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
				>
					<img src="/assets/flower-button.svg" alt="" class="w-full" />
					<img src="/assets/{btn.icon}.svg" alt="" class="absolute w-5" />
				</button>
			{/each}
		</div>

		<!-- Tous les avis sont empilés : la card garde la hauteur du plus long, pas de saut -->
		<div bind:this={stage} data-reveal class="flex flex-col">
			<p class="flex gap-4 text-body text-primary-dark">
				<span class="grid">
					{#each items, i (i)}
						<span bind:this={counters[i]} class="[grid-area:1/1] {i === 0 ? '' : 'invisible'}"
							>{i + 1}/{items.length}</span
						>
					{/each}
				</span>
				<span>{label}</span>
			</p>

			<div class="mt-8 grid lg:mt-17.5">
				{#each items as review, i (i)}
					<figure
						bind:this={figures[i]}
						class="flex flex-col [grid-area:1/1] {i === 0 ? '' : 'invisible'}"
						aria-hidden={i === current ? undefined : 'true'}
					>
						<blockquote data-split class="max-w-112.5 text-quote text-primary-dark">
							{review.quote}
						</blockquote>
						<figcaption class="mt-auto flex items-center gap-3 pt-10 lg:pt-22.5">
							{#if review.logo}
								<!-- Si le logo ne charge pas, safeImg enlève l’icône cassée et affiche un rond bleu clair -->
								<img
									data-logo
									src={review.logo}
									alt=""
									use:safeImg
									class="size-12 shrink-0 rounded-full object-contain data-failed:bg-primary/20 lg:size-14"
								/>
							{:else}
								<!-- Pas encore de logo dans Directus -->
								<span data-logo class="size-12 shrink-0 rounded-full bg-primary/20 lg:size-14"
								></span>
							{/if}
							<span class="flex flex-col leading-tight">
								<span data-split class="text-body font-medium text-dark">{review.name}</span>
								<span data-split class="text-caption text-dark-light">{review.role}</span>
							</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</div>
</section>
