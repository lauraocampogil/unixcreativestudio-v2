<script lang="ts">
	import Builder from '#lib/sections/builder.svelte';
	import Loader from '#lib/components/Loader.svelte';
	import { m } from '#lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>{m.home_meta_title()}</title>
	<meta name="description" content={m.home_meta_description()} />
</svelte:head>

<!-- Loader : seulement à la première visite de la session -->
<Loader />

<main>
	<Builder blocks={data.blocks} />
</main>
