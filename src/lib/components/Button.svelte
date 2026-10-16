<script lang="ts">
	import type { Snippet } from 'svelte';
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
		'inline-flex items-center justify-center gap-1.5 rounded-pill px-[26px] py-3 text-center whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark';

	const variants: Record<Variant, string> = {
		// Fond crème, texte bleu — sur fonds bleus (« More information », « Let's do it »)
		light: 'bg-background text-primary font-display font-bold text-xl hover:text-primary-dark',
		// Fond bleu, texte crème — sur fonds clairs (« Ok »)
		solid: 'bg-primary text-background font-display font-bold text-xl hover:bg-primary-dark',
		// Contour bleu — choix du quiz (« Not yet »)
		outline: selected
			? 'border border-primary-accent bg-primary-accent text-background font-sans font-semibold text-base'
			: 'border border-primary-accent bg-background text-primary-accent font-sans font-semibold text-base hover:bg-primary-accent/10',
		// Bouton du menu mobile (« Menu » + fleur)
		menu: 'bg-background text-primary font-display font-bold text-2xl hover:text-primary-dark'
	};

	const classes = $derived(`${base} ${variants[variant]} ${className}`);
</script>

{#if href}
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button
		type="button"
		class={classes}
		aria-pressed={variant === 'outline' ? selected : undefined}
		{...rest as HTMLButtonAttributes}
	>
		{@render children()}
	</button>
{/if}
