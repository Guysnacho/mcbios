<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, type DrawerSettings, getDrawerStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import MainDrawer from '../components/MainDrawer.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();
	let sidebarVisible = false;
	const drawerSettings: DrawerSettings = {
		id: 'nav',
		position: 'right',
		width: '20%'
	};
</script>

<MainDrawer />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase ml-4">MCBIOS</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center lg:hidden">
					<button
						class="btn btn-sm mr-4"
						on:click={() => {
							drawerStore.open(drawerSettings);
						}}
					>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Home
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Abstract Submission
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Registration
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Accomodations
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Program
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					About Us
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/"
					rel="noreferrer"
				>
					Young Scientist Excellence Awards
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
