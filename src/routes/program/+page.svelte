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
			We will touch on machine learning, precision medicine, and more. For a full view of the
			program or details on the 2024 MCBIOS Hackathon, scroll down a bit!
		</p>
		<div class="flex justify-center">
			<a href="/program#hackathon" class="btn btn-lg variant-ringed-primary my-3"
				>2024 MCBIOS Hackathon</a
			>
		</div>
		<div class="flex justify-center">
			<a href="/program#fullProgram" class="btn btn-lg variant-ringed-primary my-3">Full Program</a>
		</div>
	</div>
</div>
<div class="w-5/6 mx-auto my-16 space-y-4">
	<h3 class="h3 text-3xl text-center mb-12">Program at a Glance</h3>
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

<div class="w-5/6 md:w4-/6 lg:w-2/3 xl:w-1/2 mx-auto my-12">
	<a id="hackathon" class="mb-8"><h3 class="h3 text-3xl text-center mb-12">MCBIOS Hackathon</h3></a>
	<section class="space-y-4">
		<p>
			We are pleased to announce the 2024 MCBIOS Hackathon which is open to all attendees. The
			effort provides an opportunity to sharpen your skills on important data while also learning
			from your peers in a friendly collegial environment. This year’s hackathon will leverage the
			ongoing <a
				href="https://moody-challenge.physionet.org"
				target="_blank"
				rel="noopener noreferrer"
				class="text-amber-300 hover:text-amber-600 active:text-purple-800"
				>George B. Moody PhysioNet Challenge</a
			> which “invites teams to develop algorithms for digitizing and classifying electrocardiograms
			(ECGs) captured from images or paper printouts”
		</p>
		<p>From the Moody Challenge website:</p>
		<p class="blockquote">
			“Despite recent advances in digital ECG devices, paper or physical ECGs remain common,
			especially in the Global South. These paper ECGs document the history and diversity of
			cardiovascular diseases (CVDs), and algorithms that can digitize and classify these images
			have the potential to improve our understanding and treatment of CVDs, especially for
			underrepresented and underserved populations” <br /><br />
			We ask participants to design and implement working, open-source algorithms that, based only on
			the provided ECG images, reconstruct the waveforms and/or classify or diagnose the images. The
			teams with the best scores for these tasks on the hidden test set win the Challenge”
		</p>
		<p>
			While official registration into the larger, ongoing Moody Physionet Challenge is not required
			it is helpful to track your team name and members.
		</p>
		<p>
			The MCBIOS Hackathon is an economized version of the Moody Challenge in terms of duration in
			recognition that participants will also wish to attend conference events and experience
			networking opportunities. The conference will provide a breakout room for use by hackathon
			participants and teams which is in close proximity to the main meeting room.
		</p>
		<p>
			Attendees will develop code using personally available computational resources which may (or
			not) include use of GPUs although your <a
				href="https://moody-challenge.physionet.org/2024/submissions"
				target="_blank"
				class="text-amber-300 hover:text-amber-600 active:text-purple-800">submission</a
			> should make clear if your code is reliant upon that.
		</p>
		<p>
			To get started please consult the <a
				href="https://moody-challenge.physionet.org/2024/#rules"
				class="text-amber-300 hover:text-amber-600 active:text-purple-800">“rules”</a
			> section for specifics on objectives, data sources, deliverables and how to appropriately format
			your submission. The deadline for your submission is 9PM on Saturday March 23rd after which evaluation
			will take place followed by formal recognition of winners on Sunday the 24th.
		</p>
	</section>
</div>

<div class="w-1/2 m-auto my-12">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="w-5/6 md:w4-/6 lg:w-2/3 xl:w-1/2 mx-auto my-12">
	<a id="fullProgram" class="mb-8"><h3 class="h3 text-3xl text-center mb-12">Full Program</h3></a>
	<div class="flex justify-center">
		<a href={pdfUrl} target="_blank" class="btn btn-lg variant-ringed-primary my-3"
			>Download Program</a
		>
	</div>
	<svelte:component
		this={PdfViewer}
		url={pdfUrl}
		scale={1.2}
		showButtons={['navigation', 'zoom']}
	/>
</div>

<div class="w-1/2 m-auto my-12">
	<hr class="!border-t-8 !border-double" />
</div>
