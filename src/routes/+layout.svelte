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
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Nav from '#lib/components/Nav.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Scroll fluide (Lenis) synchronisé avec GSAP ScrollTrigger
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.9 });
		lenis.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

{@render children()}

<Footer />

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>
