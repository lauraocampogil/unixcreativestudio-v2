<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import './layout.css';
	import 'lenis/dist/lenis.css';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { afterNavigate, goto } from '$app/navigation';
	import { visit } from '#lib/visit.ts';
	import { smooth } from '#lib/smooth.ts';
	import favicon from '#lib/assets/favicon.svg';
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
		if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
		else target.scrollIntoView();
	};

	$effect(() => {
		const onClick = async (e: MouseEvent) => {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			const link = (e.target as Element).closest?.('a[href^="/#"]') as HTMLAnchorElement | null;
			if (!link || link.target === '_blank') return;
			const id = link.getAttribute('href')!.slice(2);
			e.preventDefault();

			// Déjà sur l'accueil : on saute directement à la section
			if (document.getElementById(id)) {
				scrollToSection(id);
				return;
			}
			// Autre page : retour à l'accueil, puis on se place sur la section
			visit.goingToSection = true;
			await goto(resolve('/'));
			await new Promise((r) => setTimeout(r, 150)); // laisse ScrollTrigger recalculer la page
			visit.goingToSection = false;
			scrollToSection(id);
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
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
	<link rel="icon" href={favicon} />
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
