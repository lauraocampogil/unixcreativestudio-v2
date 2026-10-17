<script lang="ts">
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
	class="grid-section sm-grid-section flex flex-col gap-y-12 bg-background px-5 pt-12 pb-[92px] sm:px-8 md:px-10 lg:px-12 xl:gap-y-0 xl:pt-[100px] xl:pb-[172px] 3xl:container 3xl:mx-auto"
>
	<Tag label={tag} class="col-span-8" />

	<p
		class="col-span-8 ml-auto max-w-[278px] text-right text-lead text-primary-dark sm:max-w-none xl:col-span-5 xl:col-start-4 xl:mt-11"
	>
		{intro}
	</p>

	<ol class="col-span-8 flex flex-col xl:col-span-4 xl:mt-[90px]">
		{#each items as item, i (item.title)}
			{@const last = i === items.length - 1}
			<li class="flex gap-2">
				<!-- Fleur numérotée + ligne verticale -->
				<div class="flex w-[50px] shrink-0 flex-col items-center">
					<span class="relative grid size-[50px] place-items-center">
						<img src="/assets/flower-step.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
						<span class="relative font-display text-xl font-bold text-background">{i + 1}.</span>
					</span>
					{#if !last}
						<span class="my-2.5 w-px flex-1 bg-primary" aria-hidden="true"></span>
					{/if}
				</div>

				<div class="flex flex-col gap-3 {last ? '' : 'pb-10 xl:pb-[81px]'}">
					<h3 class="px-2.5 text-h3 text-primary-dark">{item.title}</h3>
					<p class="max-w-[562px] px-2.5 text-body">{item.text}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>
