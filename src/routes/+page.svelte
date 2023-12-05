<script>
	import bgImage from '$lib/assets/background/2024_bg_brad-huchteman.jpg';
	import GregGibson from '$lib/assets/speakers/Greg-Gibson.jpg';
	import AnantMadabhushi from '$lib/assets/speakers/Anant-Madabhushi.jpg';
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
				Everyone from codes to cells to care, transforming health care with AI
			</h4>
			<h4 class="h4 fill-token select-none drop-shadow-xl">20th Annual Meeting of MCBIOS</h4>
			<h4 class="h4 fill-token select-none drop-shadow-xl">
				Emory Univeristy<br /> March 22-24, 2024
			</h4>
			<a href="/registration" class="btn btn-lg outline my-5 select-none"
				>Registration Coming Soon</a
			>
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

<div class="w-full my-5">
	<h3 class="h3 text-center">Keynote Speakers</h3>
	<div class="md:flex space-y-5 my-5 md:space-y-0">
		<div class="w-1/2 mx-auto space-y-3">
			<h4 class="h4 text-center">Anant Madabhushi</h4>
			<div><img class="mx-auto" src={AnantMadabhushi} alt="Anant Madabhushi Headshot" /></div>
		</div>
		<div class="w-1/2 mx-auto space-y-3">
			<h4 class="h4 text-center">Anant Madabhushi</h4>
			<div><img class="mx-auto" src={GregGibson} alt="Greg Gibson Headshot" /></div>
		</div>
	</div>
</div>
