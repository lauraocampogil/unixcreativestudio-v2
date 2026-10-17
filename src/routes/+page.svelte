<script lang="ts">
	import Builder from '#lib/sections/builder.svelte';
	import Loader from '#lib/components/Loader.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Unix Creative Studio — Bloom your business</title>
	<meta
		name="description"
		content="A small, friendly studio in Brussels. Websites, SEO, ads and mobile apps with clear prices and no tech talk."
	/>
</svelte:head>

<!-- Loader : seulement à la première visite de la session -->
<Loader />

<main>
	<Builder blocks={data.blocks} />
</main>
