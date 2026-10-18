<script lang="ts">
	import { steps } from '#lib/actions/steps.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Tag from '#lib/components/Tag.svelte';

	type Item = { title: string; text: string };

	let {
		tag = 'What we do?',
		intro = '',
		items = []
	}: { tag?: string; intro?: string; items?: Item[] } = $props();
</script>

<section
	id="what-we-do"
	class="grid-section sm-grid-section flex flex-col gap-y-12 bg-background pt-12 pb-23 xl:gap-y-0 xl:pt-25 xl:pb-43 3xl:container 3xl:mx-auto"
>
	<Tag label={tag} class="col-span-8" />

	<p data-reveal use:reveal
		class="col-span-8 ml-auto max-w-69.5 text-right text-lead text-primary-dark sm:max-w-none xl:col-span-5 xl:col-start-4 xl:mt-11"
	>
		{intro}
	</p>

	<ol use:steps class="col-span-8 flex flex-col xl:col-span-4 xl:mt-22.5">
		{#each items as item, i (item.title)}
			{@const last = i === items.length - 1}
			<li data-step class="flex gap-2">
				<!-- Fleur numérotée + ligne verticale -->
				<div class="flex w-12.5 shrink-0 flex-col items-center">
					<span class="step-flower relative grid size-12.5 place-items-center">
						<img src="/assets/flower-step.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
						<span class="relative text-number text-background">{i + 1}.</span>
					</span>
					{#if !last}
						<!-- ligne grise qui se remplit en bleu au scroll -->
						<span class="relative my-2.5 w-px flex-1 bg-dark-light/30" aria-hidden="true">
							<span class="step-line-fill absolute inset-0 origin-top scale-y-0 bg-primary"></span>
						</span>
					{/if}
				</div>

				<div class="flex flex-col gap-3 {last ? '' : 'pb-10 xl:pb-20.25'}">
					<h3 data-reveal use:reveal class="step-text px-2.5 text-h3 text-primary-dark">{item.title}</h3>
					<p data-reveal use:reveal={{ delay: 0.1 }} class="step-text max-w-140.5 px-2.5 text-body">{item.text}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>
