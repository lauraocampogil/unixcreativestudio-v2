<script lang="ts">
	import Builder from '#lib/sections/builder.svelte';
	import Loader from '#lib/components/Loader.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import Seo from '#lib/components/Seo.svelte';

	let { data } = $props();

	// FAQ de l'accueil → schema.org FAQPage (Google et les IA peuvent reprendre les réponses)
	const faq = $derived(
		(
			data.blocks.find((b) => b.type === 'FaqBlock')?.props as {
				items?: { question: string; answer: string }[];
			}
		)?.items ?? []
	);
	const schema = $derived([
		{
			'@type': 'FAQPage',
			mainEntity: faq.map((f) => ({
				'@type': 'Question',
				name: f.question,
				acceptedAnswer: { '@type': 'Answer', text: f.answer }
			}))
		}
	]);
</script>

<Seo title={m.home_meta_title()} description={m.home_meta_description()} {schema} />

<!-- Loader : seulement à la première visite de la session -->
<Loader />

<main>
	<Builder blocks={data.blocks} />
</main>
