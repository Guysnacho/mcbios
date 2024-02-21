<script>
	import bgImage from '$lib/assets/background/2024_bg_brad-huchteman.jpg';
	import flyerHorizontal from '$lib/assets/files/flyer_horizontal.jpg';
	import AIforGenomics from '$lib/assets/sponsors/Sponsor-AI-Genom.png';
	import AIforMed from '$lib/assets/sponsors/Sponsor-AI-MED.png';
	import CenterOfAILearning from '$lib/assets/sponsors/Sponsor-CAIL-1.jpg';

	import AnantMadabhushi from '$lib/assets/speakers/Anant-Madabhushi.jpg';
	import GregGibson from '$lib/assets/speakers/Greg-Gibson.jpg';
	import HengLi from '$lib/assets/speakers/Heng-Li.jpg';
	import NancyCox from '$lib/assets/speakers/Nancy-Cox.jpg';

	import KeynoteSpeaker from '../components/KeynoteSpeaker.svelte';
	import SponsorCard from '../components/SponsorCard.svelte';
	import { invitedSpeakers } from './program/data';

	const speakers = [
		{
			name: 'Anant Madabhushi',
			url: 'https://med.emory.edu/departments/radiology/research/research-labs/madabhushi-lab/index.html',
			affiliation: 'Emory University & Georgia Tech',
			photo: AnantMadabhushi
		},
		{
			name: 'Greg Gibson',
			url: 'https://biosciences.gatech.edu/people/gregory-gibson',
			affiliation: 'Georgia Tech',
			photo: GregGibson
		},
		{
			name: 'Nancy J. Cox',
			url: 'https://www.vumc.org/vmac/person/nancy-j-cox-phd',
			affiliation: 'Vanderbilt University Medical Center',
			photo: NancyCox
		},
		{
			name: 'Heng Li',
			url: 'https://dbmi.hms.harvard.edu/people/heng-li',
			affiliation: 'Dana Farber Cancer Institute & Harvard Medical School',
			photo: HengLi
		}
	];

	const sponsors = [
		{
			name: 'Center for AI learning',
			url: 'https://ailearning.emory.edu',
			label: 'Emory Center for AI learning',
			imgSrc: CenterOfAILearning
		},
		{
			name: 'Emory Center for Computational and Quantitative Genetics',
			url: 'https://med.emory.edu/departments/human-genetics/research/computational-analytics/index.html',
			label: 'Emory Center for Computational and Quantitative Genetics'
		},
		{
			name: 'Department of Biostatistics and Bioinformatics',
			url: 'https://sph.emory.edu/departments/bios/index.html',
			label: 'Department of Biostatistics and Bioinformatics, Emory University'
		},
		{
			name: 'AI for Genomics',
			url: 'https://jianhu-lab.org',
			label: 'AI for Genomics',
			imgSrc: AIforGenomics
		},
		{
			name: 'AI.MED',
			url: 'https://aimed-lab.org',
			label: 'AI.MED',
			imgSrc: AIforMed
		}
	];
</script>

<svelte:head>
	<title>MCBIOS 2024</title>
</svelte:head>

<div class="w-full">
	<div class="relative w-full h-96 lg:h-auto text-center flex justify-center">
		<img src={bgImage} alt="City skyline" class="w-full overflow-clip object-cover" />
		<div
			class="my-auto py-10 px-4 max-w-1/3 space-y-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-25 rounded-lg"
		>
			<h1 class="h1 fill-token select-none drop-shadow-xl">MCBIOS 2024</h1>
			<h4
				class="hidden md:flex h4 fill-token select-none drop-shadow-xl text-center justify-center"
			>
				From codes to cells to care, transforming health care with AI
			</h4>
			<h4 class="h4 fill-token select-none drop-shadow-xl">20th Annual Meeting of MCBIOS</h4>
			<h4 class="h4 fill-token select-none drop-shadow-xl">
				Emory University<br /> March 22-24, 2024
			</h4>
			<a href="/registration" class="btn btn-lg outline my-5 select-none">Register Now</a>
		</div>
	</div>
	<quote
		class="md:hidden italic h4 fill-token select-none drop-shadow-xl my-5 mx-auto flex text-center justify-center max-w-md"
	>
		Everyone from codes to cells to care, transforming health care with AI
	</quote>
	<div class="container space-y-10 mx-auto">
		<hr class="!border-t-8 !border-double" />
	</div>
</div>

<div
	class="container mx-auto w-4/5 md:w-3/5 self-center flex place-content-center my-10 variant-glass-secondary rounded-xl py-6"
>
	<p class="text-center mx-auto w-4/5 md:w-3/5">
		The conference will take place at the <a
			href="https://maps.app.goo.gl/CT3n9YrUaExJBTx37"
			target="_blank"
			class="underline text-secondary-300">R. Randall Rollins Building</a
		>. Directions, maps, and parking information can be found
		<a
			href="https://sph.emory.edu/about/directions-maps/index.html"
			target="_blank"
			class="underline text-secondary-300">here</a
		>. Parking balidation is available for visitors paring on Friday afternoon. Parking is free
		Saturday and Sunday, learn more by going to our
		<a href="/accommodations" class="underline text-secondary-300">accommodations page</a>!
	</p>
</div>

<div class="w-full my-20">
	<h2 class="h2 text-center">Keynote Speakers</h2>
	<blockquote class="text-center mt-3 mb-10">Click to learn more</blockquote>
	<div class="md:flex space-y-5 my-5 md:space-y-0 flex-wrap">
		{#each speakers as speaker}
			<KeynoteSpeaker
				name={speaker.name}
				url={speaker.url}
				affiliation={speaker.affiliation}
				photo={speaker.photo}
			/>
		{/each}
	</div>
</div>

<div class="container my-10 mx-auto">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="my-20 w-80 md:w-96 mx-auto">
	<h2
		class="h2 text-center my-10 fill-token select-none drop-shadow-sm bg-gradient-to-br from-secondary-500 to-tertiary-100 bg-clip-text text-transparent box-decoration-clone"
	>
		Invited speakers
	</h2>

	<dl class="list-dl max-h-96 overflow-y-scroll rounded-md outline p-2 mb-5 text-center mx-auto">
		{#each invitedSpeakers as invitee}
			<div class="max-w-md overflow-clip">
				<span class="flex-auto">
					<dt class="font-bold">{invitee.name}</dt>
					<dd>{@html invitee.affiliation}</dd>
				</span>
			</div>
		{/each}
	</dl>
</div>

<a href={flyerHorizontal} target="_blank"
	><img
		src={flyerHorizontal}
		alt="City skyline"
		class="w-2/5 mx-auto overflow-clip object-cover"
	/></a
>
<p class="text-center mt-4 h6">Click Flyer to Expand</p>

<div class="container my-10 mx-auto">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="w-full my-16">
	<h2 class="h2 text-center">Sponsors</h2>
	<div class="space-y-10 my-5 mx-auto w-3/5 md:w-3/4">
		{#each sponsors as sponsor}
			<SponsorCard
				name={sponsor.name}
				url={sponsor.url}
				label={sponsor.label}
				imgSrc={sponsor.imgSrc}
			/>
		{/each}
	</div>
</div>
