<script>
	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS 2024 | Abstract</title>
</svelte:head>

<Hero imageSrc={Abstract} headerText="Abstract Submissions" />

<div class="grid grid-cols-1 space-y-10 my-10">
	<h4 class="h4 mx-2 text-center">Submission Instructions</h4>
	<div class="space-y-3 w-5/6 sm:w-4/5 md:w-2/3 lg:w-3/5 mx-auto">
		<p>
			There are a limited number of spots for oral presentations. If not selected for oral
			presentation, you will automatically be considered for poster presentation. Oral presentations
			will generally be 15 min long and the speaker would participate in a panel question and answer
			session.
		</p>
		<p class="font-semibold">Poster size limitation: 30"W x 20"H (76cm x 51cm)</p>
		<div class="px-auto flex">
			<a href="#" class="btn btn-lg outline disabled my-7 mx-auto">Coming Soon</a>
		</div>
	</div>
</div>

<!-- Flex box 1 -->
<div class="flex flex-col md:flex-row w-full md:w-10/12 mx-auto">
	<div class="mx-auto basis-1/2 w-5/6 md:w-6/12 md:px-10">
		<h4 class="h4 my-7 mx-2 text-center">2024 MCBIOS Abstract Submission Instructions</h4>
		<p class="-mx-4">
			Please use the EasyChair Portal to submit an abstract and indicate the following:
		</p>
		<ul class="list-disc space-y-2">
			<li>Indicate presentation type (Oral or Poster)</li>
			<li>
				Add keywords to your submission; This will help us match you to the appropriate session
			</li>
			<li>Membership Type (Professional, Post-Doc, Student)</li>
			<li>
				Indicate whether Travel Assistantship Stipend is needed (only applies to student and
				post-doc categories)
			</li>
		</ul>
	</div>
	<div class="basis-1/2 w-3/4 mx-auto md:w-6/12 md:px-10">
		<p class="h3 my-7 mx-2 text-center">YSEA Instructions</p>
		<p class="m-auto">
			Indicate if competing for the “MCBIOS Young Scientist Excellence Award” (only applies to
			student and post-doc categories). If this option is selected, we will provide instructions for
			submission of materials for the award application.
		</p>
		<p class="my-5">
			For the award application, you will provide additional information for evaluation: Innovation
			in research, author's contribution to the research, and statement of academic integrity.
		</p>
	</div>
</div>

<hr class="!border-t-4 !border-dotted my-10 w-1/3 mx-auto" />

<!-- Flex box 2 -->
<div
	class="flex flex-col md:flex-row w-full md:w-10/12 mx-auto space-y-8 my-7 sm:mb-0 md:-mb-36 lg:mb-20 xl:mb-15"
>
	<div class="mx-auto basis-1/2 w-5/6 md:w-6/12 md:px-10 space-y-4 my-10">
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
	<div class="basis-1/2 space-y-3 w-full mx-auto md:w-6/12 md:px-10">
		<h6 class="text-center">Oral Presentations</h6>
		<p class="w-5/6 m-auto">
			There are a limited number of spots for oral presentations. If not selected for oral
			presentation, you will automatically be considered for poster presentation. Oral presentations
			will be 10-15 min long including questions, depending on the session program designed by the
			session chair. Poster size limitation: <span class="font-semibold"
				>30"W x 20"H (91cm x 61cm)</span
			>.
		</p>
		<h6 class="text-center">Submissions</h6>
		<p class="w-5/6 m-auto">
			A registered author can submit multiple abstracts, as long as that author is the presenting
			author. Authors will also have an opportunity to submit and publish a full paper for MCBIOS
			2024 proceedings in Frontiers in Artificial Intelligence. The deadline for full paper
			submission is <span class="font-semibold">May 1, 2024</span>.
		</p>
	</div>
</div>
