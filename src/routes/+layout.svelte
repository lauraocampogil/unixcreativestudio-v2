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
	import { afterNavigate } from '$app/navigation';
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Nav from '#lib/components/Nav.svelte';
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

	// Scroll fluide (Lenis) synchronisé avec GSAP ScrollTrigger
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);

		const l = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.9 });
		lenis = l;
		l.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => l.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			l.destroy();
			lenis = undefined;
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Pas de nav dans le formulaire : on reste concentré sur les questions -->
{#if !page.url.pathname.includes('/contact/form')}
	<Nav />
{/if}

{@render children()}

<Footer />

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>
