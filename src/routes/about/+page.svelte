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
		<blockquote class="blockquote my-5 mx-auto w-5/6">
			The purposes of the Society are scientific, educational, literary, charitable, and no other.
		</blockquote>
		<div class=" w-5/6 mx-auto">
			<h4 class="my-3">THE MISSION OF MCBIOS IS TO:</h4>
			<ul class="list-disc">
				<li>Advance the understanding of bioinformatics and computational biology</li>
				<li>Bring together scientists of various backgrounds and disciplines</li>
				<li>
					Facilitate the collaboration of researchers with similar or complementary backgrounds to
					solve biological, health and/or medical problems
				</li>
				<li>Promote education in bioinformatics and computational biology</li>
				<li>
					Inform the general public on the results and implications of current research in
					bioinformatics and computational biology
				</li>
				<li>
					Promote other activities that will contribute to the development of bioinformatics and
					computational biology
				</li>
			</ul>
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
