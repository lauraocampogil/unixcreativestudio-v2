<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { backOut, cubicOut } from 'svelte/easing';
	import Tag from '#lib/components/Tag.svelte';
	import Button from '#lib/components/Button.svelte';

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
			label: 'Do you have a website?',
			options: [
				['no', 'Not yet'],
				['dislike', 'Yes, but I don’t love it'],
				['love', 'Yes, and I love it']
			]
		},
		{
			key: 'goal',
			label: 'What would help you most?',
			options: [
				['google', 'Being found on Google'],
				['clients', 'New clients'],
				['app', 'An app for my clients']
			]
		},
		{
			key: 'when',
			label: 'When would you like to start?',
			options: [
				['asap', 'As soon as possible'],
				['soon', 'In 1–2 months'],
				['norush', 'No rush']
			]
		}
	];

	const SERVICES = {
		web: { name: 'Web Design & Development', slug: 'web-design' },
		seo: { name: 'SEO', slug: 'seo' },
		ads: { name: 'Ads', slug: 'ads' },
		app: { name: 'Mobile app', slug: 'mobile-app' }
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
	class="grid-section sm-grid-section flex flex-col bg-background px-5 pt-12 pb-[92px] sm:px-8 md:px-10 lg:px-12 xl:pt-[60px] xl:pb-[140px] 3xl:container 3xl:mx-auto"
>
	<Tag label={tag} class="col-span-8" />

	<div
		class="col-span-8 mt-8 ml-auto flex max-w-[300px] flex-col gap-6 text-right text-lead text-primary-dark sm:max-w-[600px] xl:col-span-4 xl:col-start-5 xl:mt-6 xl:max-w-none"
	>
		<p>{title}</p>
		<p>{intro}</p>
	</div>

	<!-- Questions -->
	<div class="col-span-8 mt-14 xl:col-span-4 xl:mt-[110px]">
		<h2 class="text-h3 text-primary-dark">{questionsLabel}</h2>

		<ol class="mt-5 flex flex-col gap-10">
			{#each QUESTIONS as q, i (q.key)}
				<li>
					<fieldset>
						<legend class="px-1.5 font-sans text-base font-semibold text-primary-dark xl:text-lg">
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
	<div class="col-span-8 mt-14 xl:col-span-4 xl:col-start-5 xl:mt-[110px]">
		<h2 class="text-h3 text-primary-dark">{recommendationLabel}</h2>

		<div class="relative mt-5 h-[356px] w-full sm:max-w-[400px] xl:max-w-[335px]">
		{#if !done}
			<p
				out:fly={{ y: -10, duration: 200 }}
				class="absolute top-0 left-0 max-w-[300px] text-body text-dark-light"
			>
				Answer the 3 questions and your recommendation will bloom here.
			</p>
		{:else}
		<article
			in:scale={{ start: 0.85, duration: 600, easing: backOut, delay: 150 }}
			class="absolute inset-0 flex h-[356px] w-full flex-col justify-between overflow-hidden rounded-card bg-primary p-5 lg:rounded-section"
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
						class="max-w-[260px] font-display text-[clamp(1.75rem,1.5rem+0.8vw,2.25rem)] leading-[1.05] font-bold text-background [grid-area:1/1]"
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
