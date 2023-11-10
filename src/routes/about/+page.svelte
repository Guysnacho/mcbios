<script>
	import ChangSu from '$lib/assets/Chang-Su.jpg';
	import GregGibson from '$lib/assets/Greg-Gibson.png';
	import HongQin from '$lib/assets/Hong-Qin.png';
	import HuixiaoHong from '$lib/assets/Huixiao-Hong.jpg';
	import JakeChen from '$lib/assets/Jake-Chen.jpg';
	import JieChen from '$lib/assets/Jie-Chen.jpg';
	import KunZhao from '$lib/assets/Kun-Zhao.jpg';
	import ManojBhasin from '$lib/assets/Manoj-Bhasin.jpg';
	import MarkBorodovsky from '$lib/assets/Mark-Borodovsky.jpg';
	import PaulSchliekelman from '$lib/assets/Paul-Schliekelman.jpg';
	import PengQiu from '$lib/assets/Peng-Qiu.jpg';
	import Steve from '$lib/assets/Qin-Steve.jpg';
	import StevePittard from '$lib/assets/Steve-Pittard.jpg';
	import XiaoHu from '$lib/assets/Xiao-Hu.jpg';
	import XiuweiZhang from '$lib/assets/Xiuwei-Zhang.png';
	import YanqingZhang from '$lib/assets/Yanqing-Zhang.jpg';
	import YongshengBai from '$lib/assets/Yongsheng-Bai.jpg';
	import ZhanaDuren from '$lib/assets/Zhana-Duren.jpg';
	import ZongliangYue from '$lib/assets/Zongliang-Yue.jpg';

	import AvatarCard from '../../components/AvatarCard.svelte';
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

<h2 class="h1 md:h2 lg:h1 text-center my-24">Organizing Commitee</h2>

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

	<h4 class="h2 md:h3 lg:h2 text-center">Committee Members</h4>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max justify-center my-5"
	>
		{#each members as rep}
			<AvatarCard name={rep.name} affiliation={rep.affiliation} photo={rep.photo} />
		{/each}
	</section>
</div>
