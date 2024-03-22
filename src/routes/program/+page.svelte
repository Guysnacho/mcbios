<script>
	// @ts-nocheck

	import MicPic from '$lib/assets/background/joao-cruz-IkEpl3JkVqU-unsplash.jpg';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Hero from '../../components/Hero.svelte';
	import { dayOneEvents, dayThreeEvents, dayTwoEvents } from './data';
	/**
	 * @type {typeof import("svelte-pdf").default}
	 */
	let PdfViewer;

	onMount(async () => {
		const module = await import('svelte-pdf');
		PdfViewer = module.default;
	});
	const keynotes = [
		{ name: 'Anant Madabhushi', affiliation: 'Emory University' },
		{ name: 'Greg Gibson', affiliation: 'Georgia Tech' },
		{ name: 'Nancy J.', affiliation: 'Cox Vanderbilt University' },
		{ name: 'Heng Li', affiliation: 'Dana Farber Cancer Institute<br/>Harvard Medical School' }
	];
	const pdfUrl =
		'https://ojetquufzwfvbqakaque.supabase.co/storage/v1/object/public/static/MCBIOS%20Program.pdf';
	let tabSet = 0;
</script>

<svelte:head>
	<title>MCBIOS 2024 | Program</title>
</svelte:head>

<div class="w-full justify-center">
	<Hero imageSrc={MicPic} headerText="Program" />
	<div class="space-y-5 w-11/12 md:w-5/6 mx-auto">
		<p class="text-center">
			Below you will be able to find the sessions that will be held during the conference. All of
			which cover exciting and novel developments in the field.
		</p>
		<p class="text-center">
			We will touch on machine learning, precision medicine, and more. Additional details like
			speakers for specific events and topics will be released as the conference approaches!
		</p>
	</div>
</div>
<div class="w-5/6 mx-auto my-24">
	<TabGroup justify="justify-center">
		<Tab bind:group={tabSet} name="Day 1" value={0}><span>March 22</span></Tab>
		<Tab bind:group={tabSet} name="Day 2" value={1}><span>March 23</span></Tab>
		<Tab bind:group={tabSet} name="Day 3" value={2}><span>March 24</span></Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<ol class="list space-y-4 w-4/5 mx-auto">
				{#if tabSet === 0}
					{#each dayOneEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto"
								><div>
									<p>{event.name}</p>
									{#if event.speaker}
										<p class="font-semibold">{event.speaker}</p>
									{/if}
								</div></span
							>
						</li>
						<hr class="!border-t-2 !border-solid" />
					{/each}
				{:else if tabSet === 1}
					{#each dayTwoEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto"
								><div>
									<p>{event.name}</p>
									{#if event.speaker}
										<p class="font-semibold">{event.speaker}</p>
									{/if}
								</div></span
							>
						</li>
						<hr class="!border-t-2 !border-solid" />
					{/each}
				{:else if tabSet === 2}
					{#each dayThreeEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto"
								><div>
									<p>{event.name}</p>
									{#if event.speaker}
										<p class="font-semibold">{event.speaker}</p>
									{/if}
								</div></span
							>
						</li>
						<hr class="!border-t-2 !border-solid" />
					{/each}
				{/if}
			</ol>
		</svelte:fragment>
	</TabGroup>
</div>

<div class="w-1/2 m-auto my-12">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="w-5/6 md:w4-/6 lg:w-2/3 xl:w-1/2 mx-auto my-24">
	<h3 class="h3 text-3xl text-center">Full Program</h3>
	<svelte:component
		this={PdfViewer}
		url={pdfUrl}
		downloadFileName="MCBIOS Program"
		totalPage={45}
		scale={1.2}
		showButtons={['navigation', 'zoom', 'download']}
	/>
</div>
