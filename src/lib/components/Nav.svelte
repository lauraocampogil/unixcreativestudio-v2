<script lang="ts">
	import { gsap } from 'gsap';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { locales, getLocale, localizeHref } from '#lib/paraglide/runtime.js';

	// Logo « Unix Studio » : si le SVG existe, on l'insère et sa couleur suit la nav
	const logos = import.meta.glob('/static/assets/unix-studio-logo.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});
	const logoSvg = ((Object.values(logos)[0] as string | undefined) ?? '').replace(
		/fill="(?!none)[^"]*"/g,
		'fill="currentColor"'
	);

	const links = [
		{ label: 'What we do', href: '/#what-we-do' },
		{ label: 'Services', href: '/#services' },
		{ label: 'Work', href: '/#work' },
		{ label: 'Reviews', href: '/#reviews' },
		{ label: 'FAQ', href: '/#faq' }
	];
	const socials = [
		{ label: 'LinkedIn', href: '#' },
		{ label: 'Instagram', href: '#' },
		{ label: 'TikTok', href: '#' }
	];

	const ORDER = ['en', 'fr', 'es', 'nl'];

	let open = $state(false);
	let onBlue = $state(true); // la page commence sur le hero bleu

	let nav = $state<HTMLElement>();
	let panel = $state<HTMLElement>();
	let menuButton = $state<HTMLButtonElement>();

	let recheck = () => {};
	// Changement de page (home ↔ contact…) : le scroll ne bouge pas forcément, on revérifie
	afterNavigate(() => {
		open = false;
		recheck();
	});

	// --- Couleur de la nav selon la section qui passe dessous (comme BSA) ---
	$effect(() => {
		if (!nav) return;
		const navEl = nav;
		let frame = 0;
		const check = () => {
			frame = 0;
			const y = navEl.offsetHeight / 2;
			const hit = document
				.elementsFromPoint(window.innerWidth / 2, y)
				.find((el) => !navEl.contains(el));
			onBlue = hit?.closest('[data-nav]')?.getAttribute('data-nav') === 'blue';
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		recheck = () => {
			// on attend que la nouvelle page soit affichée avant de regarder ce qu'il y a sous la nav
			setTimeout(check, 60);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(frame);
		};
	});

	// --- Animation d'ouverture : la forme grandit depuis le bouton, puis se referme vers lui ---
	// On anime des nombres (haut, droite, bas, gauche, arrondi) et on écrit le clip-path nous-mêmes :
	// plus fiable que de laisser GSAP interpoler des chaînes « inset(...) ».
	const clip = { t: 0, r: 0, b: 0, l: 0, radius: 30 };
	const toButton = () => {
		const p = panel!.getBoundingClientRect();
		const b = menuButton!.getBoundingClientRect();
		return { t: b.top - p.top, r: p.right - b.right, b: p.bottom - b.bottom, l: b.left - p.left, radius: 40 };
	};
	const applyClip = () => {
		if (panel)
			panel.style.clipPath = `inset(${clip.t}px ${clip.r}px ${clip.b}px ${clip.l}px round ${clip.radius}px)`;
	};

	let ready = false;
	$effect(() => {
		const isOpen = open; // dépendance
		if (!panel || !menuButton) return;
		const panelEl = panel;
		const items = panelEl.querySelectorAll('[data-menu-item]');
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Premier passage (menu fermé au chargement) : rien à animer
		if (!ready) {
			ready = true;
			if (!isOpen) return;
		}

		gsap.killTweensOf([clip, panelEl, ...items]);

		if (reduce) {
			gsap.to(panelEl, { autoAlpha: isOpen ? 1 : 0, duration: 0.2 });
			return;
		}

		if (isOpen) {
			Object.assign(clip, toButton());
			applyClip();
			gsap.set(panelEl, { autoAlpha: 1 });
			gsap.set(items, { yPercent: 60, opacity: 0 });
			gsap.to(clip, { t: 0, r: 0, b: 0, l: 0, radius: 30, duration: 0.8, ease: 'expo.inOut', onUpdate: applyClip });
			gsap.to(items, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06, delay: 0.35 });
		} else {
			gsap.to(items, { opacity: 0, yPercent: -20, duration: 0.2, ease: 'power2.in', stagger: { each: 0.02, from: 'end' } });
			gsap.to(clip, {
				...toButton(),
				duration: 0.6,
				ease: 'expo.inOut',
				delay: 0.12,
				onUpdate: applyClip,
				onComplete: () => gsap.set(panelEl, { autoAlpha: 0 })
			});
		}
	});

	// Fermer : Échap, clic en dehors
	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				open = false;
				menuButton?.focus();
			}
		};
		const onDown = (e: PointerEvent) => {
			const t = e.target as Node;
			if (!panel?.contains(t) && !menuButton?.contains(t)) open = false;
		};
		window.addEventListener('keydown', onKey);
		window.addEventListener('pointerdown', onDown);
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('pointerdown', onDown);
		};
	});

	const close = () => (open = false);

	// Couleurs des boutons selon le fond
	// Sur fond bleu : boutons beiges / panneau beige. Sur fond beige : tout en primary-accent.
	const pill = $derived(onBlue ? 'bg-background text-primary' : 'bg-primary-accent text-background');
	const closePill = $derived(onBlue ? 'bg-primary-accent text-background' : 'bg-background text-primary-accent');
	const panelBg = $derived(onBlue ? 'bg-background' : 'bg-primary-accent');
	const ink = $derived(onBlue ? 'text-primary-dark' : 'text-background');
</script>

<header
	bind:this={nav}
	class="pointer-events-none fixed inset-x-0 top-0 z-40 px-5 pt-5 xl:px-20 lg:pt-[30px] 3xl:container 3xl:mx-auto"
>
	<div class="relative flex items-center justify-between">
		<!-- Gauche (desktop) : Contact us -->
		<a
			href="/contact"
			class="pointer-events-auto hidden h-14 items-center rounded-pill px-[26px] font-display text-2xl font-bold transition-colors duration-500 lg:flex {pill}"
		>
			Contact us
		</a>

		<!-- Logo : à gauche en mobile, au centre en desktop -->
		<a
			href="/"
			aria-label="Unix Studio, home"
			class="pointer-events-auto transition-colors duration-500 lg:absolute lg:left-1/2 lg:-translate-x-1/2 {onBlue
				? 'text-background'
				: 'text-primary-accent'}"
		>
			{#if logoSvg}
				<span class="block w-[110px] lg:w-[150px] [&_svg]:h-auto [&_svg]:w-full">{@html logoSvg}</span>
			{:else}
				<span class="block font-display text-[26px] leading-[0.82] font-black lg:text-[34px]">
					Unix<br />Studio
				</span>
			{/if}
		</a>

		<!-- Droite : Menu ↔ Close (au-dessus du panneau) -->
		<div class="pointer-events-auto relative">
			<button
				bind:this={menuButton}
				type="button"
				aria-expanded={open}
				aria-controls="site-menu"
				onclick={() => (open = !open)}
				class="relative z-10 flex h-14 cursor-pointer items-center rounded-pill font-display text-2xl font-bold transition-[background-color,color,padding] duration-500 ease-in-out {open
					? `pr-[26px] pl-[66px] ${closePill}`
					: `pr-[66px] pl-[26px] ${pill}`}"
			>
				<!-- La fleur glisse de droite à gauche (et revient) en tournant -->
				<span
					aria-hidden="true"
					class="absolute top-1/2 size-7 -translate-y-1/2 bg-current transition-[left,rotate] duration-500 ease-in-out [mask:url(/assets/flower-number.svg)_center/contain_no-repeat] {open
						? 'left-[26px] rotate-[360deg]'
						: 'left-[calc(100%-54px)] rotate-0'}"
				></span>
				<span>{open ? 'Close' : 'Menu'}</span>
			</button>

			<!-- Panneau du menu -->
			<div
				bind:this={panel}
				id="site-menu"
				class="invisible fixed inset-x-3 top-3 rounded-section px-6 pt-[100px] pb-8 transition-colors duration-500 {panelBg} shadow-[0_20px_60px_-30px_rgb(0_0_0/0.35)] lg:absolute lg:inset-x-auto lg:-top-4 lg:-right-5 lg:w-[375px] lg:px-7"
			>
				<nav aria-label="Main">
					<ul class="flex flex-col gap-4">
						{#each links as link (link.href)}
							<li data-menu-item>
								<a
									href={link.href}
									onclick={close}
									class="font-display text-[28px] leading-none font-bold uppercase transition-opacity hover:opacity-60 lg:text-[26px] {ink}"
								>
									{link.label}
								</a>
							</li>
						{/each}
						<!-- Contact : seulement dans le menu mobile -->
						<li data-menu-item class="lg:hidden">
							<a
								href="/contact"
								onclick={close}
								class="font-display text-[28px] leading-none font-bold uppercase {ink}"
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>

				<div data-menu-item class="mt-8 border-t pt-5 {onBlue ? 'border-primary' : 'border-background/70'}">
					<ul class="flex justify-between gap-4">
						{#each socials as s (s.label)}
							<li>
								<a
									href={s.href}
									target="_blank"
									rel="noopener"
									class="text-lg font-medium uppercase hover:underline {ink}"
								>
									{s.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<ul data-menu-item class="mt-7 flex gap-3" aria-label="Language">
					{#each ORDER.filter((l) => (locales as readonly string[]).includes(l)) as locale (locale)}
						<li>
							<a
								href={localizeHref(page.url.pathname, { locale: locale as (typeof locales)[number] })}
								hreflang={locale}
								aria-current={getLocale() === locale ? 'true' : undefined}
								class="text-lg uppercase {getLocale() === locale
									? onBlue
										? 'text-dark'
										: 'text-background'
									: onBlue
										? 'text-dark-light hover:text-dark'
										: 'text-background/55 hover:text-background'}"
							>
								{locale}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</header>
