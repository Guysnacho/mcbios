<script>
	import bgImage from '$lib/assets/background/2024_bg_brad-huchteman.jpg';
	import CenterOfAILearning from '$lib/assets/sponsors/Sponsor-CAIL-1.jpg';
	import SocietyOfComputationalBiology from '$lib/assets/sponsors/Sponsor-ISCB-2.png';

	import AnantMadabhushi from '$lib/assets/speakers/Anant-Madabhushi.jpg';
	import GregGibson from '$lib/assets/speakers/Greg-Gibson.jpg';
	import HengLi from '$lib/assets/speakers/Heng-Li.jpg';
	import NancyCox from '$lib/assets/speakers/Nancy-Cox.jpg';

	import KeynoteSpeaker from '../components/KeynoteSpeaker.svelte';

	let speakers = [
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

<div class="w-full my-16">
	<h2 class="h2 text-center">Sponsors</h2>
	<div class="space-y-10 my-5">
		<a
			href="https://ailearning.emory.edu/"
			target="_blank"
			aria-label="Emory Center for AI learning"
		>
			<div class="space-y-3 my-10 container mx-auto py-4 card-hover">
				<h4 class="text-center text-lg">Center for AI learning</h4>
				<img
					class="w-5/6 sm:w-4/6 md:w-1/2 mx-auto rounded-md shadow-lg border-tertiary-600 border-4"
					src={CenterOfAILearning}
					alt="Emory University | Center of AI Learning"
				/>
			</div>
		</a>
		<a
			href="https://med.emory.edu/departments/human-genetics/research/computational-analytics/index.html"
			target="_blank"
			aria-label="Emory Center for Computational and Quantitative Genetics"
		>
			<div class="space-y-3 my-10 container mx-auto py-4 card-hover">
				<h4 class="text-center text-lg">
					Emory Center for Computational and Quantitative Genetics
				</h4>
			</div>
		</a>
		<a
			href="https://sph.emory.edu/departments/bios/index.html"
			target="_blank"
			aria-label="Department of Biostatistics and Bioinformatics, Emory University"
		>
			<div class="space-y-3 my-10 container mx-auto py-4 card-hover">
				<h4 class="text-center text-lg">Department of Biostatistics and Bioinformatics</h4>
			</div>
		</a>
		<a
			href="https://www.iscb.org/index.php"
			target="_blank"
			aria-label="International Society for Computational Biology"
		>
			<div class="space-y-3 my-10 container mx-auto py-4 card-hover">
				<h4 class="text-center text-lg">International Society for Computational Biology</h4>
				<img
					class="object-contain mx-auto rounded-md shadow-lg border-tertiary-600 border-4"
					src={SocietyOfComputationalBiology}
					alt="International Society for Computational Biology"
				/>
			</div>
		</a>
	</div>
</div>
