<script lang="ts">
	import type { Component } from 'svelte';
	import * as Sections from './index';

	type Props = Record<string, unknown>;
	let { blocks = [] }: { blocks: { type: string; props: Props }[] } = $props();

	// Les sections connues, par nom de bloc (ex. « hero »)
	const registry = Sections as unknown as Record<string, Component<Props> | undefined>;
</script>

{#each blocks as block, i (i)}
	{@const Section = registry[block.type]}
	{#if Section}
		<Section {...block.props} />
	{/if}
{/each}
