<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	let {
		title = 'Plant your idea. Watch your business grow.',
		subtitle = 'We are a small, friendly studio in Brussels. We make websites, apps and Google work for you. Clear prices, no tech talk, no stress.'
	}: { title?: string; subtitle?: string } = $props();

</script>

<div class="relative z-10 3xl:container 3xl:mx-auto">
	<section
		data-nav="blue"
		class="grid-section relative flex min-h-[640px] items-center justify-center overflow-clip rounded-t-section bg-primary lg:h-[964px] xl:content-center"
	>
		<!-- Blob haut : mobile / desktop -->
		<img
			src="/assets/blob-top-mobile.svg"
			data-hero-blob="top"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute top-0 left-0 w-full max-w-none select-none lg:hidden"
		/>
		<img
			src="/assets/blob-top.svg"
			data-hero-blob="top"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute top-0 left-0 hidden w-[67.5%] max-w-none select-none lg:block"
		/>

		<div class="relative col-span-8 mx-auto flex max-w-[925px] flex-col items-center gap-4 text-center text-background">
			<h1 data-reveal use:reveal class="text-h1">{title}</h1>
			<p data-reveal use:reveal={{ delay: 0.2 }} class="max-w-[453px] text-body-hero">{subtitle}</p>
		</div>
	</section>

	<!-- Blob bas (statique) -->
	<img
		src="/assets/blob-bottom-mobile.svg"
			data-hero-blob="bottom"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute bottom-0 left-0 w-full max-w-none select-none lg:hidden"
	/>
	<img
		src="/assets/blob-bottom.svg"
			data-hero-blob="bottom"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute right-0 bottom-0 hidden w-[65.5%] max-w-none select-none lg:block"
	/>

</div>
