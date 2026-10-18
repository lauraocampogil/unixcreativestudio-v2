<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { slide, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Tag from '#lib/components/Tag.svelte';

	type Item = { question: string; answer: string };

	let {
		tag = 'FAQ',
		title = 'Good to know',
		text = "Can't find your question? We usually respond on the same day.",
		linkLabel = 'Get in touch',
		linkHref = '/contact',
		items = []
	}: {
		tag?: string;
		title?: string;
		text?: string;
		linkLabel?: string;
		linkHref?: string;
		items?: Item[];
	} = $props();

	// Une seule question ouverte à la fois (null = toutes fermées)
	let open = $state<number | null>(null);
	const toggle = (i: number) => (open = open === i ? null : i);
</script>

<section
	id="faq"
	class="grid-section sm-grid-section flex flex-col gap-y-12 bg-background pt-16 pb-23 xl:pt-25 xl:pb-40 3xl:container 3xl:mx-auto"
>
	<!-- Gauche : reste collé en haut de l'écran et descend avec le scroll (desktop) -->
	<div class="col-span-8 xl:col-span-3">
		<div class="flex flex-col gap-6 xl:sticky xl:top-25">
			<Tag label={tag} />
			<h2 data-reveal use:reveal class="max-w-82.5 text-h1 text-primary-accent">{title}</h2>
			<p data-reveal use:reveal={{ delay: 0.15 }} class="max-w-85 text-body text-dark-light">
				{text}
				<a
					href={linkHref}
					class="underline underline-offset-2 transition-colors hover:text-primary-dark"
				>
					{linkLabel}
				</a>
			</p>
		</div>
	</div>

	<!-- Droite : questions -->
	<!-- Au survol d'une question, les autres deviennent plus transparentes (les lignes restent) -->
	<ul class="group/list col-span-8 flex flex-col border-t border-primary xl:col-span-5 xl:col-start-4 xl:mt-42.5">
		{#each items as item, i (item.question)}
			{@const isOpen = open === i}
			<li class="group/item border-b border-primary">
				<h3>
					<button
						type="button"
						id="faq-q-{i}"
						aria-expanded={isOpen}
						aria-controls="faq-a-{i}"
						onclick={() => toggle(i)}
						class="group flex w-full cursor-pointer items-center transition-opacity duration-300 group-hover/list:opacity-35 group-hover/item:opacity-100! group-focus-within/item:opacity-100! justify-between gap-6 px-5 py-6 text-left text-large text-primary-dark lg:px-2.5 lg:py-7"
					>
						<span class="max-w-65 sm:max-w-none">{item.question}</span>

						<!-- Plus ↔ moins (le quart de tour au survol seulement sur le plus) -->
						<span class="relative grid size-8 shrink-0 place-items-center">
							{#key isOpen}
								<img
									in:fade={{ duration: 200 }}
									src={isOpen ? '/assets/min.svg' : '/assets/plus.svg'}
									alt=""
									aria-hidden="true"
									class="absolute size-8 transition-transform duration-300 {isOpen ? '' : 'group-hover:rotate-90'}"
								/>
							{/key}
						</span>
					</button>
				</h3>

				{#if isOpen}
					<div
						id="faq-a-{i}"
						role="region"
						aria-labelledby="faq-q-{i}"
						transition:slide={{ duration: 400, easing: cubicInOut }}
					>
						<p class="max-w-140 px-5 pb-6 text-body lg:px-2.5 transition-opacity duration-300 group-hover/list:opacity-35 group-hover/item:opacity-100! group-focus-within/item:opacity-100!">{item.answer}</p>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>
