<script lang="ts">
	let {
		items = ['Bloom your business', 'Get found', 'Get clients', 'Grow online', 'Stress less']
	}: { items?: string[] } = $props();

	// Le contenu est répété pour remplir les grands écrans, puis doublé pour une boucle sans saut
	const REPEAT = 3;
	const row = $derived(Array.from({ length: REPEAT }, () => items).flat());
</script>

<section data-nav="blue" class="overflow-hidden bg-secondary-accent py-3 3xl:container 3xl:mx-auto" aria-label={items.join(', ')}>
	<div class="marquee flex w-max" aria-hidden="true">
		{#each [0, 1] as copy (copy)}
			<ul class="flex shrink-0 items-center">
				{#each row as text, i (`${copy}-${i}`)}
					<li class="flex items-center gap-4 pr-10">
						<img src="/assets/flower-marquee.svg" alt="" class="w-10 shrink-0" />
						<span class="font-display text-2xl leading-none font-bold whitespace-nowrap text-background uppercase">
							{text}
						</span>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</section>

<style>
	/* Défilement continu : on décale d'une copie (50 %) puis on recommence */
	.marquee {
		animation: marquee 40s linear infinite;
	}
	.marquee:hover {
		animation-play-state: paused;
	}

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation: none;
		}
	}
</style>
