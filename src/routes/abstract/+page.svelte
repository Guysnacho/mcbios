<script>
	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
</script>

<svelte:head>
	<title>MCBIOS 2024 | Abstract</title>
</svelte:head>

<div class="align-middle mx-auto relative text-center flex justify-center h-1/4">
	<img src={Abstract} alt="Abstract submission" class="w-full overflow-clip object-cover" />
	<div
		class="w-full py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-40"
	>
		<h1 class="h1 fill-token select-none drop-shadow-sm">Abstract Submissions</h1>
	</div>
</div>
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

<div class="grid lg:grid-cols-2 grid-cols-1 space-y-10">
	<div class="space-y-3 w-5/6 sm:w-4/5 md:w-2/3 lg:w-3/5 mx-auto col-span-1">
		<h4 class="h4 my-7 mx-2 text-center">2023 MCBIOS Abstract Submission Instructions</h4>
		<p>Please use the EasyChair Portal to submit an abstract and indicate the following:</p>
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
	<div class="space-y-5 mx-auto px-10 col-span-1">
		<p class="h4 my-7 mx-2 text-center font-thin">YSEA Instructions</p>
		<p class="w-5/6 m-auto">
			Indicate if competing for the “MCBIOS Young Scientist Excellence Award” (only applies to
			student and post-doc categories). If this option is selected, we will provide instructions for
			submission of materials for the award application.
			<br />
			<br />
			For the award application, you will provide additional information for evaluation: Innovation in
			research, author's contribution to the research, and statement of academic integrity.
		</p>
	</div>
</div>
