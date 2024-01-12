<script>
	import AwardPic from '$lib/assets/background/wan-san-yip-ID1yWa1Wpx0-unsplash.jpg';
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS 2024 | YSEA</title>
</svelte:head>

<div class="w-full justify-center">
	<Hero imageSrc={AwardPic} headerText="MCBIOS YOUNG SCIENTIST EXCELLENCE AWARDS" />
</div>
<div class="w-full justify-center bg-surface-700 shadow-lg py-10 -mt-16">
	<div class="space-y-5 w-11/12 md:w-5/6 mx-auto">
		<p class="text-center blockquote">
			If you are a graduate student or a postdoc, we invite you to apply. If you are a mentor of
			trainees, please encourage your trainees to apply.
		</p>
	</div>
</div>
<div class="w-5/6 mx-auto mt-32 mb-10 block md:flex gap-5">
	<div class="w-full md:w-2/5">
		<h3 class="h3 underline mb-5 text-center">
			2024 Young Scientist Excellence Award Applications
		</h3>
		<p class="text-center">Theme: To be announced</p>
		<p class="text-center">Deadline: To be announced</p>
		<div class="px-auto flex">
			<a
				href="https://bit.ly/MCBIOSYoungScientistAward"
				target="_blank"
				class="btn btn-lg variant-outline-primary my-7 mx-auto">Apply Now</a
			>
		</div>
	</div>
	<div class="w-full mt-10 md:w-3/5 md:mt-0 space-y-3">
		<h3 class="text-center md:text-left h3">MCBIOS Young Scientist Excellence</h3>
		<p class="text-center md:text-left mx-auto md:mx-0 w-4/5">
			Applications from students and postdoctoral fellows will be rigorously evaluated. The top four
			candidates will be invited to give an oral presentation in a session dedicated to this award
			program. In addition to an abstract, participation in this program requires submission of a
			separate description of the innovation of the research (150 words or less) and the
			individual's contribution to the work being presented (150 words or less).
			<br /><br />
			Selection of the top four candidates is based on the evaluation of the applications by the MCBIOS
			board members for quality and impact of the research. The finalists are selected by a panel of
			judges (including keynote speakers) after the oral presentations. The quality of the professional
			presentation is the primary consideration for selection of the award recipients. Applicants with
			demonstrated multidisciplinary contribution and initiative are given preference during final selection.
			Announcement of the awards will be made during the final luncheon.
		</p>
	</div>
</div>
