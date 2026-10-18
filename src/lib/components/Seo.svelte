<script lang="ts">
	import { page } from '$app/state';
	import { getLocale } from '#lib/i18n.ts';
	import { SITE_URL, SITE_NAME, OG_IMAGE, OG_LOCALE, jsonLd } from '#lib/seo.ts';

	// Toutes les balises SEO d'une page : titre, description, URL canonique, partage (Open Graph / X), schema.org
	type Props = {
		title: string;
		description: string;
		image?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
		schema?: unknown[]; // objets schema.org propres à la page
	};
	let {
		title,
		description,
		image = OG_IMAGE,
		type = 'website',
		noindex = false,
		schema = []
	}: Props = $props();

	const locale = $derived(getLocale());
	const canonical = $derived(
		`${SITE_URL}${page.url.pathname === '/' ? '' : page.url.pathname.replace(/\/$/, '')}` ||
			SITE_URL
	);
	const others = $derived(
		Object.entries(OG_LOCALE)
			.filter(([l]) => l !== locale)
			.map(([, og]) => og)
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta
		name="robots"
		content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
	/>

	<!-- Partage (Facebook, LinkedIn, WhatsApp…) -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content={OG_LOCALE[locale]} />
	{#each others as og (og)}
		<meta property="og:locale:alternate" content={og} />
	{/each}

	<!-- Partage sur X / Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#each schema as data, i (i)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD généré par le site -->
		{@html jsonLd(data)}
	{/each}
</svelte:head>
