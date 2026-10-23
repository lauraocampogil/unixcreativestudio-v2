<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, deLocalizeUrl } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import 'lenis/dist/lenis.css';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { afterNavigate, goto } from '$app/navigation';
	import { visit } from '#lib/visit.ts';
	import { smooth } from '#lib/smooth.ts';
	import { getLocale } from '#lib/i18n.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { SITE_URL, SITE_NAME, organization, jsonLd } from '#lib/seo.ts';
	import Footer from '#lib/components/Footer.svelte';
	import Nav from '#lib/components/Nav.svelte';
	import PageTransition from '#lib/components/PageTransition.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Changement de page : la hauteur de la page change (home ↔ contact).
	// Les animations au scroll qui restent (ex. logo du footer) doivent recalculer leurs positions.
	// Lenis garde sa propre position de scroll : sans ça, on arrive en bas de la nouvelle page
	let lenis: Lenis | undefined;

	afterNavigate(({ to, type }) => {
		// Nouvelle page sans ancre (#services…) → on repart tout en haut, sans animation
		if (type !== 'popstate' && !to?.url.hash) {
			lenis?.scrollTo(0, { immediate: true, force: true });
			window.scrollTo(0, 0);
		}
		setTimeout(() => {
			ScrollTrigger.refresh();
		}, 100);
	});

	// Liens vers une section de l'accueil (/#services, /#faq…) : on arrive directement sur la section, sans défilement.
	// Depuis une autre page : on revient à l'accueil (avec la transition), puis on se place sur la section.

	const scrollToSection = (id: string) => {
		const target = document.getElementById(id);
		if (!target) return;
		const y = target.getBoundingClientRect().top + window.scrollY;
		// resize : Lenis doit connaître la nouvelle hauteur de la page, sinon il s'arrête trop tôt
		lenis?.resize();
		lenis?.scrollTo(y, { immediate: true, force: true });
		window.scrollTo(0, y);
	};

	$effect(() => {
		const onClick = async (e: MouseEvent) => {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
				return;
			const link = (e.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
			if (!link || link.target === '_blank') return;
			// Seulement les ancres de l'accueil, dans n'importe quelle langue : /#faq, /fr/#faq…
			const url = new URL(link.href);
			if (url.origin !== location.origin || !url.hash || deLocalizeUrl(url).pathname !== '/')
				return;
			const id = url.hash.slice(1);
			e.preventDefault();

			// Déjà sur l'accueil : on saute directement à la section
			if (document.getElementById(id)) {
				scrollToSection(id);
				return;
			}
			// Autre page : retour à l'accueil, puis on se place sur la section
			visit.goingToSection = true;
			await goto(resolve(localizeHref('/') as Path));
			// La page grandit encore quelques instants (sections épinglées, images) :
			// on se replace sur la section jusqu'à ce qu'elle ne bouge plus.
			for (let i = 0; i < 12; i++) {
				await new Promise((r) => setTimeout(r, 150));
				ScrollTrigger.refresh();
				scrollToSection(id);
				const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
				if (i >= 2 && Math.abs(top) < 2) break;
			}
			visit.goingToSection = false;
		};
		// capture : notre gestion passe avant celle de SvelteKit (sinon il navigue vers /#faq tout seul)
		document.addEventListener('click', onClick, true);
		return () => document.removeEventListener('click', onClick, true);
	});

	// Scroll fluide (Lenis) synchronisé avec GSAP ScrollTrigger
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);

		const l = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.9 });
		lenis = l;
		smooth.lenis = l;
		l.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => l.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			l.destroy();
			lenis = undefined;
			smooth.lenis = undefined;
		};
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script>document.documentElement.classList.add('js')</script>`}
	<!-- Favicons (fleur Unix) -->
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#94ADFF" />
	<!-- schema.org : l'entreprise + le site (toutes les pages) -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD généré par le site -->
	{@html jsonLd({
		'@graph': [
			organization(m.home_meta_description()),
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: SITE_NAME,
				inLanguage: getLocale(),
				publisher: { '@id': `${SITE_URL}/#organization` }
			}
		]
	})}
	<!-- Google : la même page dans les autres langues -->
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={new URL(localizeHref(page.url.pathname, { locale }), page.url.origin).href}
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={new URL(localizeHref(page.url.pathname, { locale: 'en' }), page.url.origin).href}
	/>
</svelte:head>

<!-- Pas de nav ni de footer sur le formulaire et la page d'erreur (404…) -->
{#if !page.url.pathname.includes('/contact/form') && !page.error}
	<Nav />
{/if}

{@render children()}

{#if !page.error}
	<Footer />
{/if}

<!-- Animation entre les pages (blobs + logo) -->
<PageTransition />

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>
