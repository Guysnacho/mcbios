<script>
	import MicPic from '$lib/assets/background/joao-cruz-IkEpl3JkVqU-unsplash.jpg';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Hero from '../../components/Hero.svelte';
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
			We will touch on machine learning, precision medicine, and more. Additional details will be
			released as the conference approaches!
		</p>
	</div>
</div>
<div class="w-5/6 mx-auto mt-10 mb-5">
	<TabGroup>
		<Tab bind:group={tabSet} name="Day 1" value={0}><span>March 22</span></Tab>
		<Tab bind:group={tabSet} name="Day 2" value={1}><span>March 23</span></Tab>
		<Tab bind:group={tabSet} name="Day 3" value={2}><span>March 24</span></Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel"
			><h3 class="h3 text-center my-10">Program coming soon</h3></svelte:fragment
		>
	</TabGroup>
</div>
