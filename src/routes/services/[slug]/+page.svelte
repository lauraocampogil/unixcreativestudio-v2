<script lang="ts">
	import HowWeWork from '#lib/sections/how-we-work.svelte';

	let { data } = $props();
	const service = $derived(data.service);
</script>

<svelte:head>
	<title>{service.title} — Unix Creative Studio</title>
	<meta name="description" content="{service.tagline} {service.description}" />
</svelte:head>

<main>
	<section
		class="grid-section flex flex-col bg-background pt-[150px] pb-[100px] xl:pt-[200px] xl:pb-[160px] 3xl:container 3xl:mx-auto"
	>
		<!-- Titre : Apfel Satt 96px / 40px -->
		<h1
			class="col-span-8 font-display text-[clamp(2.5rem,1.1862rem+5.3486vw,6rem)] leading-[0.95] font-black text-primary-accent uppercase"
		>
			{service.title}
		</h1>

		<!-- Gauche : description + délai -->
		<div class="col-span-8 mt-8 flex flex-col gap-6 xl:col-span-4 xl:mt-10 xl:max-w-[560px]">
			<p class="font-sans text-xl leading-[1.25] font-semibold text-primary-dark lg:text-2xl">
				{service.tagline}<br />{service.description}
			</p>
			<p class="font-sans text-base font-semibold text-primary-dark italic lg:text-xl">
				Timeline: {service.timeline}
			</p>
		</div>

		<!-- Droite : ce qui est inclus, étape par étape -->
		<ol class="col-span-8 mt-14 flex flex-col xl:col-span-4 xl:col-start-5 xl:mt-10">
			{#each service.steps as step, i (step)}
				{@const last = i === service.steps.length - 1}
				<li class="flex gap-4">
					<div class="flex w-[50px] shrink-0 flex-col items-center">
						<span class="relative grid size-[50px] place-items-center">
							<img src="/assets/flower-number.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
							<span class="relative font-display text-xl font-bold text-background">{i + 1}.</span>
						</span>
						{#if !last}
							<span class="my-2 h-8 w-px bg-primary lg:h-10" aria-hidden="true"></span>
						{/if}
					</div>
					<p class="pt-3 font-sans text-base leading-[1.25] font-medium text-primary-accent lg:text-xl">{step}</p>
				</li>
			{/each}
		</ol>
	</section>

	<HowWeWork items={data.howWeWork} />
</main>
