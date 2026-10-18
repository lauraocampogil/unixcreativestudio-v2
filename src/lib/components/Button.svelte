<script lang="ts">
	import type { Snippet } from 'svelte';
	import Roll from './Roll.svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'light' | 'solid' | 'outline' | 'menu';

	type Props = {
		variant?: Variant;
		href?: string;
		selected?: boolean; // pour les choix du quiz (variant "outline")
		class?: string;
		children: Snippet;
	} & HTMLAnchorAttributes &
		HTMLButtonAttributes;

	let {
		variant = 'light',
		href,
		selected = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-1.5 rounded-pill px-6.5 py-3 text-center whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark';

	// $derived : la classe se met à jour quand `selected` change (sinon elle restait figée)
	const variants: Record<Variant, string> = $derived({
		// Fond crème, texte bleu — sur fonds bleus (« More information », « Let's do it »)
		light: 'bg-background text-primary text-button hover:text-primary-dark',
		// Fond bleu, texte crème — sur fonds clairs (« Ok »)
		solid: 'bg-primary text-background text-button hover:bg-primary-dark',
		// Contour bleu — choix du quiz (« Not yet »)
		outline: selected
			? 'border border-primary-accent bg-primary-accent text-background text-small font-semibold'
			: 'border border-primary-accent bg-background text-primary-accent text-small font-semibold hover:bg-primary-accent/10',
		// Bouton du menu mobile (« Menu » + fleur)
		menu: 'bg-background text-primary text-button-lg hover:text-primary-dark'
	});

	const classes = $derived(`${base} ${variants[variant]} ${className}`);
</script>

<!-- Le texte roule vers le haut au survol, sauf pour le bouton menu et les choix du quiz (outline) -->
{#snippet label()}
	{#if variant === 'menu' || variant === 'outline'}
		{@render children()}
	{:else}
		<span class="roll-fast"><Roll>{@render children()}</Roll></span>
	{/if}
{/snippet}

{#if href}
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>
		{@render label()}
	</a>
{:else}
	<button
		type="button"
		class={classes}
		aria-pressed={variant === 'outline' ? selected : undefined}
		{...rest as HTMLButtonAttributes}
	>
		{@render label()}
	</button>
{/if}
