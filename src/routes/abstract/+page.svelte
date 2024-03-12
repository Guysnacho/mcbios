<script>
	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS 2024 | Abstract</title>
</svelte:head>

<Hero imageSrc={Abstract} headerText="Abstract Submissions" />

<div class="grid grid-cols-1 space-y-10 my-20">
	<h4 class="h4 mx-2 text-center">Submission Instructions</h4>
	<div class="space-y-3 w-5/6 sm:w-4/5 md:w-2/3 lg:w-3/5 mx-auto">
		<p>
			There are a limited number of spots for oral presentations. If not selected for oral
			presentation, you will automatically be considered for poster presentation. Oral presentations
			will generally be 15 min long and the speaker would participate in a panel question and answer
			session.
		</p>
		<p class="font-semibold">Poster size limitation: 30"W x 20"H (76cm x 51cm)</p>
		<p class="font-bold">The deadline to submit an abstract is March 15, 2024</p>
		<div class="px-auto flex">
			<a
				href="https://forms.office.com/r/Fx9eVF0A5J"
				target="_blank"
				class="btn btn-lg outline disabled my-7 mx-auto">Submit Abstract</a
			>
		</div>
	</div>
</div>

<div
	class="border-secondary-400 border-solid border-2 rounded-md flex flex-col md:flex-row w-10/12 mx-auto
	space-y-8 md:space-y-0 px-5 py-10 sm:p-10 md:p-16 sm:mb-0 md:-mb-18 lg:mb-20 xl:mb-15"
>
	<div class="mx-auto basis-1/2 w-5/6 md:w-1/2 md:px-10 space-y-4">
		<p class="-mx-4 font-semibold">
			The abstract should not exceed 300 words. Please minimize the use of abbreviations and do not
			cite references in the abstract.
		</p>
		<p class="-mx-4">The abstract must include the following separate sections:</p>
		<ul class="list-disc space-y-2">
			<li>Background: Context and purpose of the study</li>
			<li>Results: Main findings</li>
			<li>Conclusions: A brief summary and potential implications</li>
		</ul>
	</div>
	<div class="basis-1/2 space-y-3 w-full mx-auto md:w-1/2 md:px-10">
		<h6 class="text-center">Submissions</h6>
		<p class="w-5/6 m-auto">
			A registered author can submit multiple abstracts, as long as that author is the presenting
			author. Authors will also have an opportunity to submit and publish a full paper for MCBIOS
			2024 proceedings in Frontiers in Artificial Intelligence. The deadline for full paper
			submission is <span class="font-semibold">June 1, 2024</span>.
		</p>
	</div>
</div>
