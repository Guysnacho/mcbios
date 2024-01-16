<script lang="ts">
	import {
		AppBar,
		AppShell,
		getDrawerStore,
		initializeStores,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import MainDrawer from '../components/MainDrawer.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();
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
				<a href="/"><strong class="text-3xl uppercase ml-4">MCBIOS</strong></a>
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
					href="/abstract"
					rel="noreferrer"
				>
					Abstract Submission
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/registration"
					rel="noreferrer"
				>
					Registration
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/accommodations"
					rel="noreferrer"
				>
					Accommodations
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/program"
					rel="noreferrer"
				>
					Program
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/ysea"
					rel="noreferrer"
				>
					Young Scientist Excellence Awards
				</a>
				<a
					class="hidden lg:flex lg:max-xl:visible btn btn-sm variant-soft-surface overflow-hidden"
					href="/about"
					rel="noreferrer"
				>
					About Us
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<footer
			class="w-full h-56 bg-surface-900 bg-opacity-70 mt-72 md:mt-40 lg:mt-20 flex justify-center"
		>
			<div class="h-fit my-auto">
				<a href="https://mcbios.com" target="_blank"
					><p class="text-center my-auto">&copy; MCBIOS 2024</p></a
				>
				<div class="gap-4 flex border-t-2 border-t-primary-400">
					<a href="/"> Home </a>
					<a href="/abstract"> Abstract Submission </a>
					<a href="/registration"> Registration </a>
					<a href="/accommodations"> Accommodations </a>
					<a href="/program"> Program </a>
					<a href="/ysea"> Young Scientist Excellence Awards </a>
					<a href="/about"> About Us </a>
				</div>
			</div>
		</footer>
	</svelte:fragment>
</AppShell>
