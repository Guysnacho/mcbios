<script>
	import ChangSu from '$lib/assets/committee/Chang-Su.jpg';
	import GregGibson from '$lib/assets/committee/Greg-Gibson.png';
	import HongQin from '$lib/assets/committee/Hong-Qin.png';
	import HuixiaoHong from '$lib/assets/committee/Huixiao-Hong.jpg';
	import JakeChen from '$lib/assets/committee/Jake-Chen.jpg';
	import JieChen from '$lib/assets/committee/Jie-Chen.jpg';
	import KunZhao from '$lib/assets/committee/Kun-Zhao.jpg';
	import ManojBhasin from '$lib/assets/committee/Manoj-Bhasin.jpg';
	import MarkBorodovsky from '$lib/assets/committee/Mark-Borodovsky.jpg';
	import PaulSchliekelman from '$lib/assets/committee/Paul-Schliekelman.jpg';
	import PengQiu from '$lib/assets/committee/Peng-Qiu.jpg';
	import Steve from '$lib/assets/committee/Qin-Steve.jpg';
	import StevePittard from '$lib/assets/committee/Steve-Pittard.jpg';
	import XiaoHu from '$lib/assets/committee/Xiao-Hu.jpg';
	import XiuweiZhang from '$lib/assets/committee/Xiuwei-Zhang.png';
	import YanqingZhang from '$lib/assets/committee/Yanqing-Zhang.jpg';
	import YongshengBai from '$lib/assets/committee/Yongsheng-Bai.jpg';
	import ZhanaDuren from '$lib/assets/committee/Zhana-Duren.jpg';
	import ZongliangYue from '$lib/assets/committee/Zongliang-Yue.jpg';

	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
	import AvatarCard from '../../components/AvatarCard.svelte';
	import Hero from '../../components/Hero.svelte';
	import president from '$lib/assets/committee/Qin-Steve.jpg';
	let coChairs = [
		{
			name: 'Steve Qin, PhD',
			affiliation: 'Emory University',
			photo: Steve,
			position: 'MCBIOS President'
		},
		{
			name: 'Chang Su, PhD',
			affiliation: 'Emory University',
			photo: ChangSu,
			position: 'Co-Chair'
		}
	];
	let members = [
		{
			name: 'Yongsheng Bai, PhD',
			affiliation: 'Eastern Michigan University',
			photo: YongshengBai
		},
		{
			name: 'Manoj Bhasin',
			affiliation: 'Emory University',
			photo: ManojBhasin,
			position: 'Co-Chair'
		},
		{ name: 'Mark Borodovsky', affiliation: 'Georgia Tech University', photo: MarkBorodovsky },

		{ name: 'Jake Chen', affiliation: 'University of Alabama at Birmingham', photo: JakeChen },

		{ name: 'Jie Chen', affiliation: 'Augusta University', photo: JieChen },

		{ name: 'Zhana Duren', affiliation: 'Clemson University', photo: ZhanaDuren },

		{ name: 'Greg Gibson', affiliation: 'Georgia Tech University', photo: GregGibson },

		{ name: 'Huixiao Hong', affiliation: 'FDA NCTR', photo: HuixiaoHong },

		{ name: 'Xiao Hu', affiliation: 'Emory University', photo: XiaoHu },

		{ name: 'Steve Pittard', affiliation: 'Emory University', photo: StevePittard },

		{ name: 'Hong Qin', affiliation: 'University of Tennessee at Chattanooga', photo: HongQin },

		{ name: 'Peng Qiu', affiliation: 'Georgia Tech University', photo: PengQiu },

		{ name: 'Paul Schliekelman', affiliation: 'University of Georgia', photo: PaulSchliekelman },

		{ name: 'Zongliang Yue', affiliation: 'Auburn University', photo: ZongliangYue },

		{ name: 'Yanqing Zhang', affiliation: 'Georgia State University', photo: YanqingZhang },

		{ name: 'Xiuwei Zhang', affiliation: 'Georgia Tech University', photo: XiuweiZhang },

		{ name: 'Kun Zhao', affiliation: 'CDC', photo: KunZhao }
	];
</script>

<svelte:head>
	<title>MCBIOS 2024 | About Us</title>
</svelte:head>

<div>
	<Hero imageSrc={Abstract} headerText="Organizing Commitee" />

	<div class="container mx-auto m-11 space-y-5">
		<!-- <blockquote class="blockquote my-5 mx-auto w-5/6">
			The purposes of the Society are scientific, educational, literary, charitable, and no other.
		</blockquote> -->
		<div class="flex flex-col gap-10 lg:flex-none lg:grid lg:grid-cols-3 lg:gap-5 my-10 mx-4 px-5">
			<div class="col-span-1 max-w-md mx-auto">
				<img src={president} alt="Dr. Steve Qin - MCBIOS President" class="rounded" />
				<h3 class="h3 text-center my-5">Dr. Steve Qin - Emory University</h3>
			</div>
			<div class="col-span-2">
				<p class="h2">Greetings from the MCBIOS President:</p>
				<br />
				<p class="text-md">
					It is my great honor to serve as the 19th president of MidSouth Computational Biology and
					Bioinformatics Society (MCBIOS). I want to thank members of the society for trusting me
					and giving me this opportunity to lead a regional bioinformatics powerhouse. I also want
					to thank the board of directors and past presidents for their unwavering support and
					guidance.
				</p>
				<br />
				<p class="text-md">
					MCBIOS organization began as a grassroots effort spearheaded by a group of researchers 20
					years ago. The first set of annual conferences were organized within the Mid-South regions
					which had large representation of members in the society. The 100% volunteer-based
					organization has since grown significantly, both in size, diversity and geographical
					locations. The purposes of the Society are centered on scientific, educational, literary
					and charitable. The society especially support, encourage, and mentor our trainee Members.
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
					consist of energetic professionals working in all aspects of bioinformatics. Because of
					the pandemic, for the past three years, we have to either postpone or move the annual
					conferences online. I am really pleased that we are able to get back to normal earlier
					this year in the 2023 Conference. Looking forward to next year, I sincerely hope that you
					can join us for our 20th annual conference to be held in Atlanta, GA on March 22-24, 2024.
				</p>
				<br />
				<p class="text-md">
					Additionally, I encourage and welcome the scientific community to join us and connect with
					us via social media to stay updated on upcoming events such as the career development
					webinar series and our 2024 annual conference. Over the coming months, we will be sharing
					more information on upcoming webinar dates, 2024 conference call for session proposals,
					abstract deadlines and more. Many thanks for all of your continued support and well
					wishes!
				</p>
			</div>
		</div>
	</div>

	<h4 class="h2 md:h3 lg:h2 text-center">Co-Chairs</h4>
	<div class="container mx-auto">
		<section class="grid grid-cols-1 md:grid-cols-2 grid-rows-1 justify-between my-5">
			{#each coChairs as rep}
				<AvatarCard
					name={rep.name}
					affiliation={rep.affiliation}
					photo={rep.photo}
					position={rep.position}
				/>
			{/each}
		</section>

		<h4 class="h2 md:h3 lg:h2 my-10 text-center">Committee Members</h4>

		<section
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max justify-center my-5"
		>
			{#each members as rep}
				<AvatarCard name={rep.name} affiliation={rep.affiliation} photo={rep.photo} />
			{/each}
		</section>
	</div>
</div>
