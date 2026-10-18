<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { fly, scale } from 'svelte/transition';
	import { backOut, cubicOut } from 'svelte/easing';
	import Tag from '#lib/components/Tag.svelte';
	import Button from '#lib/components/Button.svelte';
	import { m } from '#lib/paraglide/messages.js';

	let {
		tag = 'Quiz',
		title = 'Not sure where to start?',
		intro = "That's okay, most people aren't. Answer 3 quick questions and we'll point you the right way. No call needed.",
		questionsLabel = 'Questions',
		recommendationLabel = 'Our recommendation',
		cta = "Let's do it"
	}: {
		tag?: string;
		title?: string;
		intro?: string;
		questionsLabel?: string;
		recommendationLabel?: string;
		cta?: string;
	} = $props();

	type Key = 'website' | 'goal' | 'when';

	const QUESTIONS: { key: Key; label: string; options: [string, string][] }[] = [
		{
			key: 'website',
			label: m.quiz_q_website(),
			options: [
				['no', m.quiz_website_no()],
				['dislike', m.quiz_website_dislike()],
				['love', m.quiz_website_love()]
			]
		},
		{
			key: 'goal',
			label: m.quiz_q_goal(),
			options: [
				['google', m.quiz_goal_google()],
				['clients', m.quiz_goal_clients()],
				['app', m.quiz_goal_app()]
			]
		},
		{
			key: 'when',
			label: m.quiz_q_when(),
			options: [
				['asap', m.when_asap()],
				['soon', m.when_soon()],
				['norush', m.when_norush()]
			]
		}
	];

	const SERVICES = {
		web: { name: m.service_web(), slug: 'web-design' },
		seo: { name: m.service_seo(), slug: 'seo' },
		ads: { name: m.service_ads(), slug: 'ads' },
		app: { name: m.service_app(), slug: 'mobile-app' }
	};

	let answers = $state<Record<Key, string | null>>({ website: null, goal: null, when: null });

	// Même logique que la maquette :
	// app → Mobile app · pas de site (ou pas aimé) → Website · Google → SEO · sinon → Ads
	const recommendation = $derived.by(() => {
		const { website, goal } = answers;
		if (goal === 'app') return SERVICES.app;
		if (!website || website !== 'love') return SERVICES.web;
		if (goal === 'google') return SERVICES.seo;
		if (goal === 'clients') return SERVICES.ads;
		return SERVICES.web;
	});

	// La card n'apparaît qu'une fois les 3 questions répondues
	const done = $derived(Object.values(answers).every(Boolean));

	// La page contact reçoit le service et le délai choisis
	const href = $derived(
		`/contact?service=${recommendation.slug}${answers.when ? `&when=${answers.when}` : ''}`
	);
</script>

<section
	class="grid-section sm-grid-section flex flex-col bg-background pt-12 pb-23 xl:pt-15 xl:pb-35 3xl:container 3xl:mx-auto"
>
	<Tag label={tag} class="col-span-8" />

	<!-- L'animation est sur chaque paragraphe (sur le bloc entier, le « gap » s'appliquait entre chaque ligne) -->
	<div
		class="col-span-8 mt-8 ml-auto flex max-w-75 flex-col gap-6 text-right text-lead text-primary-dark sm:max-w-150 xl:col-span-4 xl:col-start-5 xl:mt-6 xl:max-w-none"
	>
		<p data-reveal use:reveal>{title}</p>
		<p data-reveal use:reveal={{ delay: 0.15 }}>{intro}</p>
	</div>

	<!-- Questions -->
	<div class="col-span-8 mt-14 xl:col-span-4 xl:mt-27.5">
		<h2 data-reveal use:reveal class="text-h3 text-primary-dark">{questionsLabel}</h2>

		<ol class="mt-5 flex flex-col gap-10">
			{#each QUESTIONS as q, i (q.key)}
				<li>
					<fieldset>
						<legend class="px-1.5 text-body font-semibold text-primary-dark">
							{i + 1}. {q.label}
						</legend>
						<div class="mt-4 flex flex-wrap gap-2.5">
							{#each q.options as [value, label] (value)}
								<Button
									variant="outline"
									selected={answers[q.key] === value}
									onclick={() => (answers[q.key] = value)}
								>
									{label}
								</Button>
							{/each}
						</div>
					</fieldset>
				</li>
			{/each}
		</ol>
	</div>

	<!-- Recommandation -->
	<div class="col-span-8 mt-14 xl:col-span-4 xl:col-start-5 xl:mt-27.5">
		<h2 data-reveal use:reveal class="text-h3 text-primary-dark">{recommendationLabel}</h2>

		<div class="relative mt-5 h-89 w-full sm:max-w-100 xl:max-w-83.75">
		{#if !done}
			<p
				out:fly={{ y: -10, duration: 200 }}
				class="absolute top-0 left-0 max-w-75 text-body text-dark-light"
			>
				{m.quiz_waiting()}
			</p>
		{:else}
		<article
			in:scale={{ start: 0.85, duration: 600, easing: backOut, delay: 150 }}
			class="absolute inset-0 flex h-89 w-full flex-col justify-between overflow-hidden rounded-card bg-primary p-5 lg:rounded-section"
			aria-live="polite"
		>
			<!-- Mascotte : touche le haut et le bas, on n'en voit que la moitié -->
			<img
				src="/assets/flower-card.svg"
				alt=""
				aria-hidden="true"
				class="pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-none translate-x-1/2 select-none"
			/>

			<!-- Le titre change avec le service recommandé -->
			<div class="relative grid">
				{#key recommendation.slug}
					<h3
						in:fly={{ y: 24, duration: 450, easing: cubicOut, delay: 120 }}
						out:fly={{ y: -24, duration: 250 }}
						class="max-w-65 text-h2 text-background [grid-area:1/1]"
					>
						{recommendation.name}
					</h3>
				{/key}
			</div>

			<Button {href} variant="light" class="relative self-start">{cta}</Button>
		</article>
		{/if}
		</div>
	</div>
</section>
