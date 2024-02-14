<script>
	import Committee from '$lib/assets/background/mapbox-LJtfV2Dkp4U-unsplash.jpg';
	import ChangSu from '$lib/assets/committee/Chang-Su.jpg';
	import HongQin from '$lib/assets/committee/Hong-Qin.png';
	import HuixiaoHong from '$lib/assets/committee/Huixiao-Hong.jpg';
	import JakeChen from '$lib/assets/committee/Jake-Chen.jpg';
	import JieChen from '$lib/assets/committee/Jie-Chen.jpg';
	import KunZhao from '$lib/assets/committee/Kun-Zhao.jpg';
	import ManojBhasin from '$lib/assets/committee/Manoj-Bhasin.jpg';
	import MarkBorodovsky from '$lib/assets/committee/Mark-Borodovsky.jpg';
	import MatthewReyna from '$lib/assets/committee/Matthew-Reyna.jpg';
	import PaulSchliekelman from '$lib/assets/committee/Paul-Schliekelman.jpg';
	import PengQiu from '$lib/assets/committee/Peng-Qiu.jpg';
	import Steve from '$lib/assets/committee/Qin-Steve.jpg';
	import SangeetaKhare from '$lib/assets/committee/Sangeeta-Khare.jpg';
	import StevePittard from '$lib/assets/committee/Steve-Pittard.jpg';
	import XiaoHu from '$lib/assets/committee/Xiao-Hu.jpg';
	import XiuweiZhang from '$lib/assets/committee/Xiuwei-Zhang.png';
	import YanaBromberg from '$lib/assets/committee/Yana-Bromberg.jpg';
	import YanqingZhang from '$lib/assets/committee/Yanqing-Zhang.jpg';
	import YongshengBai from '$lib/assets/committee/Yongsheng-Bai.jpg';
	import ZhanaDuren from '$lib/assets/committee/Zhana-Duren.jpg';
	import ZongliangYue from '$lib/assets/committee/Zongliang-Yue.jpg';

	import logo from '$lib/assets/logo.jpg';
	import AvatarCard from '../../components/AvatarCard.svelte';
	import Hero from '../../components/Hero.svelte';

	const coChairs = [
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
	const members = [
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

		{ name: 'Huixiao Hong', affiliation: 'FDA NCTR', photo: HuixiaoHong },

		{ name: 'Xiao Hu', affiliation: 'Emory University', photo: XiaoHu },

		{ name: 'Steve Pittard', affiliation: 'Emory University', photo: StevePittard },

		{ name: 'Hong Qin', affiliation: 'University of Tennessee at Chattanooga', photo: HongQin },

		{ name: 'Peng Qiu', affiliation: 'Georgia Tech University', photo: PengQiu },

		{ name: 'Paul Schliekelman', affiliation: 'University of Georgia', photo: PaulSchliekelman },

		{ name: 'Zongliang Yue', affiliation: 'Auburn University', photo: ZongliangYue },

		{ name: 'Yanqing Zhang', affiliation: 'Georgia State University', photo: YanqingZhang },

		{ name: 'Xiuwei Zhang', affiliation: 'Georgia Tech University', photo: XiuweiZhang },

		{ name: 'Kun Zhao', affiliation: 'CDC', photo: KunZhao },
		{ name: 'Sangeeta Khare', affiliation: 'FDA NCTR', photo: SangeetaKhare },
		{ name: 'Yana Bromberg', affiliation: 'Emory University', photo: YanaBromberg },
		{ name: 'Matthew A. Reyna', affiliation: 'Emory University', photo: MatthewReyna }
	];
</script>

<svelte:head>
	<title>MCBIOS 2024 | About Us</title>
</svelte:head>

<div>
	<Hero imageSrc={Committee} blur headerText="Organizing Commitee" />

	<div class="container mx-auto m-11 space-y-5">
		<!-- <blockquote class="blockquote my-5 mx-auto w-5/6">
			The purposes of the Society are scientific, educational, literary, charitable, and no other.
		</blockquote> -->
		<div class="flex flex-col gap-10 lg:flex-none lg:grid lg:grid-cols-3 lg:gap-5 my-10 mx-4 px-5">
			<div class="col-span-1 max-w-md m-auto">
				<img src={logo} alt="MCBIOS Logo" class="rounded" />
			</div>
			<div class="col-span-2">
				<h2 class="h2 text-center my-5">
					MidSouth Computational Biology and Bioinformatics Society (MCBIOS)
				</h2>
				<p class="text-md">
					MCBIOS is a non-profit organization found in 2003, started as a grassroots effort
					spearheaded by a small group of researchers at FDA NCTR (located in Little Rock,
					Arkansas). It has since been expanded significantly. It is now one of only two regional
					societies in North America (with GLBIO) affiliated with ISCB, the biggest international
					bioinformatics society. The mission of MCBIOS is to foster networking and collaboration
					and to promote the professional development of members and supporting our student members.
					The annual conference is the flagship event for MCBIOS, which attract talented scientists
					from across the nation who gather together for the sharing of scientific information to
					advance our understanding in nature and health. The annual conferences have enjoyed a long
					history.
				</p>
				<br />
				<p class="text-md">
					The 2024 version will be the 20th of the series. For MCBIOS 2024, we have already secured
					four plenary speakers and more than 80 world-class researchers to present in more than 20
					invited technical sessions and workshops. Additionally, there will be Young Scientist
					Excellence Award (YSEA) sessions, poster sessions, hackathon and many more fun activities.
					All registered attendees are eligible to submit their research papers to MCBIOS 2024
					proceedings to be published as special issues of high-quality Bioinformatics journals. We
					are looking forward to a great Bioinformatics conference with lasting impact. <a
						href="https://www.mcbios.com"
						class="underline text-primary-300"
						target="_blank">Please join us!</a
					>
				</p>
				<br />
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
