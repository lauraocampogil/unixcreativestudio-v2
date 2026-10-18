<script lang="ts">
	import { steps } from '#lib/actions/steps.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import HowWeWork from '#lib/sections/how-we-work.svelte';
	import { visit } from '#lib/visit.ts';
	import { m } from '#lib/paraglide/messages.js';
	import Seo from '#lib/components/Seo.svelte';
	import { l } from '#lib/i18n.ts';
	import { SITE_URL } from '#lib/seo.ts';

	// Au retour sur l'accueil, Services s'affichera en cards côte à côte
	$effect(() => {
		visit.fromService = true;
	});

	let { data } = $props();
	const service = $derived(data.service);

	// schema.org : le service + le fil d'Ariane (Accueil › Service)
	const schema = $derived([
		{
			'@type': 'Service',
			name: service.title,
			description: `${service.tagline} ${service.description}`,
			serviceType: service.title,
			provider: { '@id': `${SITE_URL}/#organization` },
			areaServed: { '@type': 'Country', name: 'Belgium' },
			url: `${SITE_URL}${l(`/services/${service.slug}`)}`
		},
		{
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Unix Creative Studio',
					item: `${SITE_URL}${l('/')}`.replace(/\/$/, '')
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: service.title,
					item: `${SITE_URL}${l(`/services/${service.slug}`)}`
				}
			]
		}
	]);
</script>

<Seo
	title="{service.title} — Unix Creative Studio"
	description="{service.tagline} {service.description}"
	{schema}
/>

<main>
	<section
		class="grid-section flex flex-col bg-background pt-37.5 pb-25 xl:pt-50 xl:pb-40 3xl:container 3xl:mx-auto"
	>
		<!-- Titre : Apfel Satt 96px / 40px -->
		<h1 data-reveal use:reveal class="col-span-8 text-display text-primary-accent">
			{service.title}
		</h1>

		<!-- Gauche : description + délai -->
		<div class="col-span-8 mt-8 flex flex-col gap-6 xl:col-span-4 xl:mt-10 xl:max-w-140">
			<p data-reveal use:reveal={{ delay: 0.15 }} class="text-subtitle text-primary-dark">
				{service.tagline}<br />{service.description}
			</p>
			<p
				data-reveal
				use:reveal={{ delay: 0.3 }}
				class="text-body font-semibold text-primary-dark italic"
			>
				{m.service_timeline({ timeline: service.timeline })}
			</p>
		</div>

		<!-- Droite : ce qui est inclus, étape par étape -->
		<ol use:steps class="col-span-8 mt-14 flex flex-col xl:col-span-4 xl:col-start-5 xl:mt-10">
			{#each service.steps as step, i (step)}
				{@const last = i === service.steps.length - 1}
				<li data-step class="flex gap-4">
					<div class="flex w-12.5 shrink-0 flex-col items-center">
						<span class="step-flower relative grid size-12.5 place-items-center">
							<img
								src="/assets/flower-number.svg"
								alt=""
								aria-hidden="true"
								class="absolute inset-0 size-full"
							/>
							<span class="relative text-number text-background">{i + 1}.</span>
						</span>
						{#if !last}
							<span class="relative my-2 h-8 w-px bg-dark-light/30 lg:h-10" aria-hidden="true">
								<span class="step-line-fill absolute inset-0 origin-top scale-y-0 bg-primary"
								></span>
							</span>
						{/if}
					</div>
					<p class="step-text pt-3 text-body font-medium text-primary-accent">{step}</p>
				</li>
			{/each}
		</ol>
	</section>

	<HowWeWork title={m.how_we_work_title()} items={data.howWeWork} />
</main>
