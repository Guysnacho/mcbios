<script>
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	{#if $drawerStore.id === 'nav'}
		<!-- (show 'example-1' contents) -->
		<a class="flex btn-xl rounded variant-soft-surface overflow-hidden" href="/" rel="noreferrer">
			Home
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/abstract"
			rel="noreferrer"
		>
			Abstract Submission
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/registration"
			rel="noreferrer"
		>
			Registration
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/accomodations"
			rel="noreferrer"
		>
			Accomodations
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/program"
			rel="noreferrer"
		>
			Program
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/about"
			rel="noreferrer"
		>
			About Us
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/ysea"
			rel="noreferrer"
		>
			Young Scientist Excellence Awards
		</a>
	{/if}
</Drawer>
