<script lang="ts">
	import Builder from '#lib/sections/builder.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Unix Creative Studio — Bloom your business</title>
	<meta
		name="description"
		content="A small, friendly studio in Brussels. Websites, SEO, ads and mobile apps with clear prices and no tech talk."
	/>
</svelte:head>

<main class="px-5 pt-5">
	<Builder blocks={data.blocks} />
</main>
