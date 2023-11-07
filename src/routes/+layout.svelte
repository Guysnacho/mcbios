<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase ml-4">MCBIOS</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer"> Home </a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer">
					Abstract Submission
				</a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer"> Registration </a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer"> Accomodations </a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer"> Program </a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer"> About Us </a>
				<a class="btn btn-sm variant-soft-surface" href="/" rel="noreferrer">
					Young Scientist Excellence Awards
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
