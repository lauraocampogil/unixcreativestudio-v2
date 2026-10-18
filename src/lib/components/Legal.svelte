<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { l } from '#lib/i18n.ts';
	import Seo from '#lib/components/Seo.svelte';
	import type { LegalPage } from '#lib/content/legal/types.ts';

	// Structure commune des pages légales (cookies, mentions, confidentialité)
	let { content }: { content: LegalPage } = $props();

	// Les liens internes du texte (/cookies…) restent dans la langue actuelle
	const html = (text: string) =>
		text.replace(/href="(\/[^"]*)"/g, (_, href) => `href="${l(href)}"`);
</script>

<Seo title="{content.title} — Unix Creative Studio" description={content.description} noindex />

<main
	class="grid-section min-h-svh bg-background pt-37.5 pb-24 xl:pt-50 xl:pb-40 3xl:container 3xl:mx-auto"
>
	<div class="col-span-8 mx-auto w-full max-w-3xl">
		<a
			href={l('/')}
			class="mb-8 inline-flex items-center gap-2 text-small text-dark-light transition-colors hover:text-primary-dark"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 256 256"
				aria-hidden="true"
			>
				<path
					d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
				/>
			</svg>
			{m.legal_back()}
		</a>

		<h1 data-reveal use:reveal class="mb-3 text-cta text-balance text-primary-dark">
			{content.title}
		</h1>
		<p class="mb-10 text-caption text-dark-light">{m.legal_updated({ date: m.legal_date() })}</p>

		<!-- Liens soulignés en bleu, « à compléter » surligné en rose -->
		<div
			class="flex flex-col gap-8 text-dark [&_a]:text-primary-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-dark [&_mark]:rounded [&_mark]:bg-tertiary/60 [&_mark]:px-1"
		>
			{#each content.sections as section, s (s)}
				{#if s}<div class="border-t border-dashed border-primary/50"></div>{/if}
				<section class="flex flex-col gap-3">
					<h2 class="text-subtitle text-primary-dark">{section.title}</h2>
					{#each section.blocks as block, b (b)}
						{#if 'p' in block}
							<!-- Texte des pages légales écrit dans le code (pas de contenu externe) -->
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<p class="text-body">{@html html(block.p)}</p>
						{:else if 'ul' in block}
							{@render list(block.ul, 'text-body')}
						{:else if 'links' in block}
							<ul class="flex flex-col gap-1 pl-4">
								{#each block.links as link (link.url)}
									<li class="flex items-start gap-2 text-body">
										<span class="text-primary-dark">•</span>
										<a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
									</li>
								{/each}
							</ul>
						{:else}
							{#each block.cards as card (card.name)}
								<div
									class="flex flex-col gap-2 rounded-card p-5 {card.filled
										? 'bg-primary/15'
										: 'border border-primary/50'}"
								>
									<div class="flex flex-wrap items-center justify-between gap-2">
										<h3 class="text-body font-semibold text-primary-dark">{card.name}</h3>
										<span
											class="rounded-pill px-3 py-1 text-caption font-semibold {card.filled
												? 'bg-primary-dark text-background'
												: 'border border-primary-dark text-primary-dark'}">{card.badge}</span
										>
									</div>
									<p class="text-body text-dark/70">{card.text}</p>
									{#if card.items}{@render list(card.items, 'text-small text-dark/60')}{/if}
								</div>
							{/each}
						{/if}
					{/each}
				</section>
			{/each}
		</div>
	</div>
</main>

{#snippet list(items: string[], size: string)}
	<ul class="flex flex-col gap-1 pl-4">
		{#each items as item (item)}
			<li class="flex items-start gap-2 {size}">
				<span class="text-primary-dark">•</span>
				<span>{item}</span>
			</li>
		{/each}
	</ul>
{/snippet}
