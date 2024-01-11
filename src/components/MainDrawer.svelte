<script>
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	{#if $drawerStore.id === 'nav'}
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Home
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/abstract"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Abstract Submission
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/registration"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Registration
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/accommodations"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Accommodations
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/program"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Program
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/ysea"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			Young Scientist Excellence Awards
		</a>
		<a
			class="flex btn-xl rounded variant-soft-surface overflow-hidden"
			href="/about"
			on:click={() => {
				drawerStore.close();
			}}
			rel="noreferrer"
		>
			About Us
		</a>
	{/if}
</Drawer>
