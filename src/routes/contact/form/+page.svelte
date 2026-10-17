<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { tick } from 'svelte';
	import Button from '#lib/components/Button.svelte';

	let { form } = $props();

	const TOTAL = 5;
	let step = $state(1);
	let direction = $state(1); // 1 = suivant, -1 = retour (sens de l'animation)
	let error = $state('');
	let sending = $state(false);
	let stepEl = $state<HTMLElement>();

	// --- Réponses ---
	let first_name = $state('');
	let last_name = $state('');
	let business = $state('');
	let services = $state<string[]>([]);
	let about = $state('');
	let when = $state('');
	let email = $state('');
	let phone = $state('');
	let source = $state('');

	// Pré-remplissage depuis le quiz (?service=seo&when=asap)
	const FROM_QUIZ: Record<string, string> = {
		'web-design': 'website',
		seo: 'google',
		ads: 'ads',
		'mobile-app': 'app'
	};
	const qs = page.url.searchParams;
	if (FROM_QUIZ[qs.get('service') ?? '']) services = [FROM_QUIZ[qs.get('service')!]];
	if (['asap', 'soon', 'norush'].includes(qs.get('when') ?? '')) when = qs.get('when')!;

	const SERVICE_OPTIONS = [
		['website', 'A website'],
		['google', 'Being found on Google'],
		['ads', 'Ads'],
		['app', 'A mobile app'],
		['unsure', 'Not sure yet']
	];
	const WHEN_OPTIONS = [
		['asap', 'As soon as possible'],
		['soon', 'In 1 - 2 months'],
		['norush', 'No rush']
	];

	const SOURCES = ['Recommendation', 'Google', 'LinkedIn', 'Instagram', 'TikTok', 'AI (ChatGPT, Claude…)', 'Other'];

	const TITLES = [
		'Let’s meet',
		'What can we help with?',
		'Tell us about your business?',
		'When would you like to start',
		'How can we reach you?'
	];

	// On peut naviguer librement entre les étapes.
	// La vérification se fait seulement à l'envoi : on renvoie alors vers la première étape incomplète.
	let showMissing = $state(false);
	const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

	const missingIn = (s: number): string[] => {
		const m: string[] = [];
		if (s === 1) {
			if (!first_name.trim()) m.push('first name');
			if (!last_name.trim()) m.push('last name');
			if (!business.trim()) m.push('business name');
		}
		if (s === 2 && !services.length) m.push('at least one option');
		if (s === 4 && !when) m.push('when you’d like to start');
		if (s === 5) {
			if (!validEmail(email)) m.push(email.trim() ? 'a valid email' : 'email');
			if (!source.trim()) m.push('how you heard about us');
		}
		return m;
	};
	const firstIncomplete = () => [1, 2, 3, 4, 5].find((s) => missingIn(s).length);
	const message = (s: number) => {
		const m = missingIn(s);
		return m.length ? `Still missing: ${m.join(', ')}.` : '';
	};

	// Champ obligatoire vide → souligné en rouge (seulement après un essai d'envoi)
	const isMissing = (v: string, required = true) => showMissing && required && !v.trim();

	const go = async (to: number) => {
		direction = to > step ? 1 : -1;
		step = to;
		error = showMissing ? message(to) : '';
		await tick();
		// Focus sur le premier champ de la nouvelle étape (clavier + lecteurs d'écran)
		setTimeout(() => stepEl?.querySelector<HTMLElement>('input, button[aria-pressed]')?.focus(), 450);
	};

	const next = () => step < TOTAL && go(step + 1);
	const prev = () => step > 1 && go(step - 1);

	// À l'envoi : tout est vérifié
	const checkAll = () => {
		const s = firstIncomplete();
		if (!s) return true;
		showMissing = true;
		if (s !== step) go(s);
		else error = message(s);
		return false;
	};

	const toggleService = (v: string) => {
		services = services.includes(v) ? services.filter((s) => s !== v) : [...services, v];
		if (showMissing) error = message(step);
	};

	// Entrée dans un champ = « Ok »
	const onKey = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && step < TOTAL && (e.target as HTMLElement).tagName === 'INPUT') {
			e.preventDefault();
			next();
		}
	};

	const done = $derived(form?.success === true);
</script>

<svelte:head>
	<title>Text us — Unix Creative Studio</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#snippet field(label: string, name: string, placeholder: string, value: string, set: (v: string) => void, type = 'text', autocomplete = 'off', required = true)}
	<label class="flex flex-col gap-3">
		<span class="font-sans text-xl font-medium text-primary-dark">{label}</span>
		<input
			{name}
			{type}
			{placeholder}
			{autocomplete}
			{value}
			aria-invalid={isMissing(value, required) || undefined}
			oninput={(e) => {
				set(e.currentTarget.value);
				if (showMissing) error = message(step);
			}}
			class="w-full border-b bg-transparent pb-2 font-sans text-base text-dark outline-none placeholder:text-dark-light focus:border-primary-dark {isMissing(value, required)
				? 'border-[#d64545]'
				: 'border-primary'}"
		/>
		{#if isMissing(value, required)}
			<span class="-mt-1 font-sans text-sm text-[#d64545]">Please fill this in</span>
		{/if}
	</label>
{/snippet}

{#if done}
	<!-- Merci -->
	<main
		class="grid-section relative flex min-h-svh items-center overflow-hidden bg-background py-24 xl:content-center 3xl:container 3xl:mx-auto"
		in:fade={{ duration: 400 }}
	>
		<img
			src="/assets/flower-contact.svg"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute -right-[55%] bottom-0 w-[110%] max-w-none select-none sm:-right-[35%] sm:w-[80%] lg:inset-y-0 lg:right-0 lg:h-full lg:w-auto lg:translate-x-1/2"
		/>
		<div class="relative col-span-8 flex flex-col items-start xl:col-span-4">
			<h1 class="font-display text-[clamp(2.5rem,1.1862rem+5.3486vw,6rem)] leading-[0.95] font-bold text-primary-dark">
				Thank you for reaching us!
			</h1>
			<p class="mt-6 max-w-[420px] font-sans text-base text-dark lg:text-xl">
				Your message is on its way. We’ll get back to you within 24-48 hours with a clear plan and a fixed
				price.
			</p>
			<Button href="/" variant="solid" class="mt-10">Back to the website</Button>
		</div>
	</main>
{:else}
	<main class="grid-section flex min-h-svh items-center bg-background py-24 xl:content-center 3xl:container 3xl:mx-auto">
		<form
			method="POST"
			novalidate
			class="col-span-8 w-full xl:col-span-6 xl:col-start-2"
			onkeydown={onKey}
			use:enhance={({ cancel }) => {
				if (!checkAll()) return cancel();
				sending = true;
				return async ({ update }) => {
					await update({ reset: false });
					sending = false;
					if (form?.error) error = form.error;
				};
			}}
		>
			<!-- Toutes les réponses partent avec le formulaire, même celles des étapes cachées -->
			<input type="hidden" name="first_name" value={first_name} />
			<input type="hidden" name="last_name" value={last_name} />
			<input type="hidden" name="business" value={business} />
			{#each services as s (s)}<input type="hidden" name="services" value={s} />{/each}
			<input type="hidden" name="about" value={about} />
			<input type="hidden" name="when" value={when} />
			<!-- Piège à robots -->
			<input type="text" name="website_url" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

			<!-- En-tête : fleur numérotée + titre / flèches -->
			<div class="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex items-center gap-4" aria-live="polite">
					<span class="relative grid size-[50px] shrink-0 place-items-center">
						<img src="/assets/flower-number.svg" alt="" aria-hidden="true" class="absolute inset-0 size-full" />
						<span class="relative font-display text-xl font-bold text-background">{step}.</span>
					</span>
					<h1 class="font-display text-2xl leading-tight font-bold text-primary-dark lg:text-[32px]">
						<span class="sr-only">Step {step} of {TOTAL}: </span>{TITLES[step - 1]}
					</h1>
				</div>

				<div class="flex gap-3 self-end sm:self-auto">
					{#each [{ dir: -1, icon: 'arrow-left', label: 'Previous step', disabled: step === 1 }, { dir: 1, icon: 'arrow-right', label: 'Next step', disabled: step === TOTAL }] as a (a.dir)}
						<button
							type="button"
							aria-label={a.label}
							disabled={a.disabled}
							onclick={() => (a.dir < 0 ? prev() : next())}
							class="relative grid w-[50px] cursor-pointer place-items-center rounded-full transition duration-300 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark hover:scale-110 hover:rotate-12 disabled:cursor-default disabled:opacity-40 disabled:hover:scale-100 disabled:hover:rotate-0"
						>
							<img src="/assets/flower-button.svg" alt="" aria-hidden="true" class="w-full" />
							<img src="/assets/{a.icon}.svg" alt="" aria-hidden="true" class="absolute w-5" />
						</button>
					{/each}
				</div>
			</div>

			<!-- Étapes -->
			<div class="mt-12 grid lg:mt-16">
				{#key step}
					<div
						bind:this={stepEl}
						in:fly={{ x: 40 * direction, duration: 450, easing: cubicOut, delay: 150 }}
						out:fly={{ x: -40 * direction, duration: 200 }}
						class="flex max-w-[790px] flex-col gap-8 [grid-area:1/1]"
					>
						{#if step === 1}
							{@render field('First name', '', 'Elisabeth', first_name, (v) => (first_name = v), 'text', 'given-name')}
							{@render field('Last name', '', 'Martin', last_name, (v) => (last_name = v), 'text', 'family-name')}
							{@render field('Business name', '', 'Martin’s studio', business, (v) => (business = v), 'text', 'organization')}
						{:else if step === 2}
							<fieldset>
								<legend class="font-sans text-base text-dark-light">Pick one or more</legend>
								<div class="mt-4 flex flex-wrap gap-2.5">
									{#each SERVICE_OPTIONS as [value, label] (value)}
										<Button variant="outline" selected={services.includes(value)} onclick={() => toggleService(value)}>
											{label}
										</Button>
									{/each}
								</div>
							</fieldset>
						{:else if step === 3}
							{@render field('What do you do, and what would you like to change? (optional)', '', 'I run a small bakery', about, (v) => (about = v), 'text', 'off', false)}
						{:else if step === 4}
							<fieldset>
								<legend class="sr-only">When would you like to start</legend>
								<div class="flex flex-wrap gap-2.5">
									{#each WHEN_OPTIONS as [value, label] (value)}
										<Button variant="outline" selected={when === value} onclick={() => {
											when = value;
											if (showMissing) error = message(step);
										}}>{label}</Button>
									{/each}
								</div>
							</fieldset>
						{:else}
							{@render field('Email', 'email', 'you@business.com', email, (v) => (email = v), 'email', 'email')}
							{@render field('Phone (optional)', 'phone', '+32', phone, (v) => (phone = v), 'tel', 'tel', false)}
							<!-- Liste déroulante native (comme AKIS) : s'ouvre avec le menu du système -->
							<label class="flex flex-col gap-3">
								<span class="font-sans text-xl font-medium text-primary-dark">How did you hear about us?</span>
								<span class="relative">
									<select
										name="source"
										bind:value={source}
										onchange={() => showMissing && (error = message(step))}
										aria-invalid={isMissing(source) || undefined}
										class="w-full cursor-pointer appearance-none border-b bg-transparent pr-8 pb-2 font-sans text-base outline-none focus:border-primary-dark {source
											? 'text-dark'
											: 'text-dark-light'} {isMissing(source) ? 'border-[#d64545]' : 'border-primary'}"
									>
										<option value="" disabled>Pick one</option>
										{#each SOURCES as option (option)}
											<option value={option} class="text-dark">{option}</option>
										{/each}
									</select>
									<!-- Petite flèche -->
									<span
										aria-hidden="true"
										class="pointer-events-none absolute top-1 right-0 size-5 bg-primary-dark [mask:url(/assets/chevron-down.svg)_center/contain_no-repeat]"
									></span>
								</span>
								{#if isMissing(source)}
									<span class="-mt-1 font-sans text-sm text-[#d64545]">Please pick one</span>
								{/if}
							</label>
						{/if}

						{#if error}
							<p class="-mt-3 font-sans text-sm text-[#d64545]" role="alert">{error}</p>
						{/if}

						<div>
							{#if step < TOTAL}
								<Button variant="solid" onclick={next}>Ok</Button>
							{:else}
								<Button variant="solid" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Ok'}</Button>
							{/if}
						</div>
					</div>
				{/key}
			</div>
		</form>
	</main>
{/if}
