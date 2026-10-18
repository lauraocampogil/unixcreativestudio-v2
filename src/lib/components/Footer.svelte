<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { l } from '#lib/i18n.ts';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Logo (static/assets/unix-logo.svg) inséré dans la page pour animer chaque forme.
	// S'il n'existe pas encore, on affiche « Unix » en texte à la place.
	const logos = import.meta.glob('/static/assets/unix-logo.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});
	const logoSvg = (Object.values(logos)[0] as string | undefined) ?? '';

	const email = 'unixcreativestudio@gmail.com';

	const columns = [
		[
			{ label: m.nav_what_we_do(), href: l('/#what-we-do') },
			{ label: m.nav_services(), href: l('/#services') },
			{ label: m.nav_work(), href: l('/#work') },
			{ label: m.nav_reviews(), href: l('/#reviews') },
			{ label: m.nav_faq(), href: l('/#faq') }
		],
		[
			{ label: 'LinkedIn', href: '#', external: true },
			{ label: 'Instagram', href: '#', external: true },
			{ label: 'TikTok', href: '#', external: true }
		],
		[
			{ label: m.footer_cookies(), href: l('/cookies') },
			{ label: m.footer_legal(), href: l('/mentions-legales') },
			{ label: m.footer_privacy(), href: l('/politique-de-confidentialite') }
		]
	];

	let cta = $state<HTMLElement>();
	let flower = $state<HTMLElement>();
	let logo = $state<HTMLElement>();

	$effect(() => {
		if (!cta || !flower || !logo) return;
		const ctaEl = cta;
		const flowerEl = flower;
		const logoEl = logo;
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();

		// 1. Fleur « Let's talk » : au repos en haut à droite, suit la souris sur la card
		const rest = () => ({ x: ctaEl.clientWidth * 0.8, y: ctaEl.clientHeight * 0.33 });
		gsap.set(flowerEl, { xPercent: -50, yPercent: -50, ...rest() });
		const moveX = gsap.quickTo(flowerEl, 'x', { duration: 0.6, ease: 'power3.out' });
		const moveY = gsap.quickTo(flowerEl, 'y', { duration: 0.6, ease: 'power3.out' });
		const onMove = (e: PointerEvent) => {
			const r = ctaEl.getBoundingClientRect();
			moveX(e.clientX - r.left);
			moveY(e.clientY - r.top);
		};
		const onLeave = () => {
			const p = rest();
			moveX(p.x);
			moveY(p.y);
		};
		ctaEl.addEventListener('pointermove', onMove);
		ctaEl.addEventListener('pointerleave', onLeave);

		// 2. Logo : chaque lettre monte l'une après l'autre avec un effet élastique
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			// Les formes du SVG ne sont pas dans l'ordre : on les trie de gauche à droite
			const letters = [
				...logoEl.querySelectorAll<SVGGraphicsElement | HTMLElement>('svg > *:not(defs), .letter')
			].sort(
				(a, b) =>
					('getBBox' in a ? a.getBBox().x : a.offsetLeft) -
					('getBBox' in b ? b.getBBox().x : b.offsetLeft)
			);
			gsap.from(letters, {
				yPercent: 110,
				duration: 1.4,
				ease: 'elastic.out(1, 0.45)',
				stagger: 0.09,
				scrollTrigger: {
					trigger: logoEl,
					start: 'bottom 108%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		return () => {
			ctaEl.removeEventListener('pointermove', onMove);
			ctaEl.removeEventListener('pointerleave', onLeave);
			mm.revert();
		};
	});
</script>

<footer
	data-nav="blue"
	class="overflow-hidden bg-primary text-background 3xl:container 3xl:mx-auto"
>
	<div class="grid-section pt-10 xl:pt-17.5">
		<!-- CTA -->
		<a
			bind:this={cta}
			href={l('/contact')}
			class="relative col-span-8 flex min-h-95 cursor-pointer flex-col justify-between overflow-hidden rounded-section bg-primary-dark p-6 sm:p-8 lg:h-149 lg:px-12 lg:py-10"
		>
			<p data-reveal use:reveal class="max-w-110 text-cta">{m.footer_cta_1()}</p>
			<p data-reveal use:reveal={{ delay: 0.15 }} class="self-end text-right text-cta">
				{m.footer_cta_2()}
			</p>

			<!-- Fleur beige qui tourne + « Let's talk » -->
			<span
				bind:this={flower}
				class="pointer-events-none absolute top-0 left-0 hidden h-18.75 w-19.5 place-items-center lg:grid"
				aria-hidden="true"
			>
				<img
					src="/assets/flower-cta.svg"
					alt=""
					class="absolute inset-0 size-full animate-[spin_6s_linear_infinite]"
				/>
				<span
					class="relative text-center font-display text-[12px] leading-none font-bold text-primary-dark uppercase"
				>
					<!-- un mot par ligne dans la fleur -->
					{#each m.footer_lets_talk().split(' ') as word, i (i)}{#if i}<br />{/if}{word}{/each}
				</span>
			</span>
		</a>

		<!-- Infos -->
		<a
			href="mailto:{email}"
			class="col-span-8 mt-14 block self-start text-link-lg break-all xl:col-span-4 xl:mt-35"
		>
			<span class="link-line">{email}</span>
		</a>

		<nav
			aria-label={m.footer_nav_label()}
			class="col-span-8 mt-10 flex flex-col gap-8 xl:col-span-4 xl:col-start-5 xl:mt-35 xl:justify-between lg:flex-row lg:gap-12"
		>
			{#each columns as links, c (c)}
				<ul class="flex flex-col gap-3 lg:max-w-65">
					{#each links as link (link.label)}
						<li>
							<a
								href={link.href}
								target={'external' in link ? '_blank' : undefined}
								rel={'external' in link ? 'noopener' : undefined}
								class="link-line text-link"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			{/each}
		</nav>
	</div>

	<!-- Logo Unix : on n'en voit que la moitié du haut -->
	<div bind:this={logo} class="logo mt-16 overflow-hidden lg:mt-24" aria-label="Unix" role="img">
		{#if logoSvg}
			<div class="mb-[-9%] w-full [&_svg]:h-auto [&_svg]:w-full [&_svg>*]:fill-background">
				<!-- SVG local du dossier static (pas de contenu externe) -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html logoSvg}
			</div>
		{:else}
			<p
				class="mb-[-0.45em] flex justify-between px-1 font-display text-[29vw] leading-[0.8] font-black text-background 3xl:text-[557px]"
				aria-hidden="true"
			>
				{#each 'Unix'.split('') as l, i (i)}
					<span class="letter inline-block">{l}</span>
				{/each}
			</p>
		{/if}
	</div>
</footer>
