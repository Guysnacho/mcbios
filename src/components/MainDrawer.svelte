<script>
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	{#if $drawerStore.id === 'nav'}
		<!-- (show 'example-1' contents) -->
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Home
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Abstract Submission
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Registration
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Accomodations
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Program
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			About Us
		</a>
		<a class="flex btn rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Young Scientist Excellence Awards
		</a>
	{/if}
</Drawer>
