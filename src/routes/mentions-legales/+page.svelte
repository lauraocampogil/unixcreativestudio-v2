<script lang="ts">
	import Legal from '#lib/components/Legal.svelte';
	import { LEGAL } from '#lib/content/legal/index.ts';
	import { getLocale } from '#lib/i18n.ts';

	// Texte de la page dans la langue actuelle (voir src/lib/content/legal/)
	const content = $derived(LEGAL[getLocale()].mentions);
</script>

<Legal {content} />
