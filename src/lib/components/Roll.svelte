<script lang="ts">
	import type { Snippet } from 'svelte';

	// Texte qui « roule » vers le haut au survol du lien/bouton parent (comme weareboring) :
	// le texte part en bloc vers le haut et sa copie arrive par le bas.
	let { children }: { children: Snippet } = $props();
</script>

<span class="roll">
	<span class="roll-inner">
		<span class="block">{@render children()}</span>
		<span class="roll-clone" aria-hidden="true">{@render children()}</span>
	</span>
</span>
