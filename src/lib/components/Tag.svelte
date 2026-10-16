<script lang="ts">
	let { label, class: className = '' }: { label: string; class?: string } = $props();
</script>

<p class="flex items-center gap-2 text-tag text-primary {className}">
	<img src="/assets/flower-tag.svg" alt="" aria-hidden="true" class="h-[23px] w-6 xl:h-[31px] xl:w-8" />
	{label}
</p>
