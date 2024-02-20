<script>
	import MicPic from '$lib/assets/background/joao-cruz-IkEpl3JkVqU-unsplash.jpg';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Hero from '../../components/Hero.svelte';
	import { dayOneEvents, dayThreeEvents, dayTwoEvents } from './data';

	let tabSet = 0;

	const keynotes = [
		{ name: 'Anant Madabhushi', affiliation: 'Emory University' },
		{ name: 'Greg Gibson', affiliation: 'Georgia Tech' },
		{ name: 'Nancy J.', affiliation: 'Cox Vanderbilt University' },
		{ name: 'Heng Li', affiliation: 'Dana Farber Cancer Institute<br/>Harvard Medical School' }
	];
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
			We will touch on machine learning, precision medicine, and more. Additional details will be
			released as the conference approaches!
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
			<ol class="list space-y-2 w-4/5 mx-auto">
				{#if tabSet === 0}
					{#each dayOneEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto">{event.name}</span>
						</li>
					{/each}
				{:else if tabSet === 1}
					{#each dayTwoEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto">{event.name}</span>
						</li>
					{/each}
				{:else if tabSet === 2}
					{#each dayThreeEvents as event}
						<li class="h5">
							<span>{event.time}</span>
							<span class="flex-auto">{event.name}</span>
						</li>
					{/each}
				{/if}
			</ol>
		</svelte:fragment>
	</TabGroup>
</div>

<div class="w-1/2 m-auto my-24">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="w-5/6 mx-auto mt-10 mb-5 align-middle items-center">
	<div class="lg:flex place-content-center gap-20">
		<h2
			class="h2 text-center my-10 fill-token select-none drop-shadow-sm bg-gradient-to-br from-secondary-500 to-tertiary-100 bg-clip-text text-transparent box-decoration-clone"
		>
			Keynote Speakers
		</h2>
		<dl class="list-dl">
			{#each keynotes as keynote}
				<div class="container text-center">
					<span class="flex-auto">
						<dt class="font-bold">{keynote.name}</dt>
						<dd>{@html keynote.affiliation}</dd>
					</span>
				</div>
			{/each}
		</dl>
	</div>
</div>
