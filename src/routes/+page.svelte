<script>
	import bgImage from '$lib/assets/background/2024_bg_brad-huchteman.jpg';
	import president from '$lib/assets/committee/Qin-Steve.jpg';
</script>

<svelte:head>
	<title>MCBIOS 2024</title>
</svelte:head>

<div class="w-full h-full">
	<div class="relative w-full h-1/4 lg:h-auto text-center flex justify-center">
		<img src={bgImage} alt="City skyline" class="w-full overflow-clip object-cover" />
		<div
			class="my-auto max-w-1/3 space-y-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
			<a href="/registration" class="btn btn-lg outline my-5 select-none">Registration Coming Soon</a>
		</div>
	</div>
	<quote class="md:hidden italic h4 fill-token select-none drop-shadow-xl my-5 mx-auto flex text-center justify-center max-w-md">
		Everyone from codes to cells to care, transforming health care with AI
	</quote>
	<div class="container space-y-10 mx-auto">
		<hr class="!border-t-8 !border-double" />
	</div>

	<div class="flex flex-col gap-10 lg:flex-none lg:grid lg:grid-cols-3 lg:gap-5 my-10 mx-4 px-5">
		<div class="col-span-1">
			<img src={president} alt="Dr. Steve Qin - MCBIOS President" class="rounded" />
			<h3 class="h3 text-center my-5">Dr. Steve Qin - Emory University</h3>
		</div>
		<div class="col-span-2">
			<p class="h2">Greetings from the MCBIOS President:</p>
			<br />
			<p class="text-md">
				It is my great honor to serve as the 19th president of MidSouth Computational Biology and
				Bioinformatics Society (MCBIOS). I want to thank members of the society for trusting me and
				giving me this opportunity to lead a regional bioinformatics powerhouse. I also want to
				thank the board of directors and past presidents for their unwavering support and guidance.
			</p>
			<br />
			<p class="text-md">
				MCBIOS organization began as a grassroots effort spearheaded by a group of researchers 20
				years ago. The first set of annual conferences were organized within the Mid-South regions
				which had large representation of members in the society. The 100% volunteer-based
				organization has since grown significantly, both in size, diversity and geographical
				locations. The purposes of the Society are centered on scientific, educational, literary and
				charitable. The society especially support, encourage, and mentor our trainee Members.
			</p>
			<br />
			<p class="text-md">
				Reflecting my own professional journey, I can't emphasize more on the importance of
				professional organization for a trainee and junior professionals. I didn't discover
				bioinformatics until in my postdoc years. Joining ISCB and attending my first ISMB
				conference really made a difference. I felt that I found the community of like-minded
				people, especially young professionals, that I belong. Therefore, I encourage colleagues,
				especially trainees, no matter where you are located, to please consider joining us.
			</p>
			<br />
			<p class="text-md">
				I considered myself very lucky to be introduced to MCBIOS and attended my first MCBIOS
				annual conference in 2019. Over the years, I found MCBIOS to be a very welcoming community
				consist of energetic professionals working in all aspects of bioinformatics. Because of the
				pandemic, for the past three years, we have to either postpone or move the annual
				conferences online. I am really pleased that we are able to get back to normal earlier this
				year in the 2023 Conference. Looking forward to next year, I sincerely hope that you can
				join us for our 20th annual conference to be held in Atlanta, GA on March 22-24, 2024.
			</p>
			<br />
			<p class="text-md">
				Additionally, I encourage and welcome the scientific community to join us and connect with
				us via social media to stay updated on upcoming events such as the career development
				webinar series and our 2024 annual conference. Over the coming months, we will be sharing
				more information on upcoming webinar dates, 2024 conference call for session proposals,
				abstract deadlines and more. Many thanks for all of your continued support and well wishes!
			</p>
		</div>
	</div>
</div>
