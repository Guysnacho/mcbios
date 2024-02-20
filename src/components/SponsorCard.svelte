<script src="ts">
	export let name = '';
	export let url = '';
	export let label = '';
	export let imgSrc = '';
</script>

<a href={url} target="_blank" aria-label={label}>
	<div
		class="space-y-3 my-10 container mx-auto py-4 card-hover rounded-md shadow-lg border-tertiary-600 border-4 px-2"
	>
		<h4 class="text-center text-sm md:text-lg">{name}</h4>
		{#if imgSrc}
			<img class="object-scale-down mx-auto w-5/6 sm:w-4/6 md:w-1/2 max-h-20" src={imgSrc} alt={label} />
		{/if}
	</div>
</a>
