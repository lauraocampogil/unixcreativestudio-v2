<script lang="ts">
	let {
		title = 'Plant your idea. Watch your business grow.',
		subtitle = 'We are a small, friendly studio in Brussels. We make websites, apps and Google work for you. Clear prices, no tech talk, no stress.'
	}: { title?: string; subtitle?: string } = $props();
</script>

<section
	class="relative mx-auto flex min-h-[640px] items-center justify-center overflow-clip rounded-t-section bg-primary px-6 lg:h-[964px]"
>
	<!-- Blob haut gauche -->
	<img
		src="/images/hero/blob-top.svg"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute top-[-0.52%] left-[-0.64%] w-[65%] max-w-none select-none"
	/>
	<!-- Blob bas droite (pivoté à 180° comme dans Figma) -->
	<img
		src="/images/hero/blob-bottom.svg"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute right-[-2.57%] bottom-[-1.14%] w-[66%] max-w-none rotate-180 select-none"
	/>

	<div class="relative flex max-w-[925px] flex-col items-center gap-4 text-center text-background">
		<h1 class="text-h1">{title}</h1>
		<p class="max-w-[453px] text-xl leading-[1.15]">{subtitle}</p>
	</div>
</section>
