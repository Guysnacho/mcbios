<script>
	import MicPic from '$lib/assets/background/joao-cruz-IkEpl3JkVqU-unsplash.jpg';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Hero from '../../components/Hero.svelte';
	let tabSet = 0;

	const keynotes = [
		{ name: 'Anant Madabhushi', affiliation: 'Emory University' },
		{ name: 'Greg Gibson', affiliation: 'Georgia Tech' },
		{ name: 'Nancy J.', affiliation: 'Cox Vanderbilt University' },
		{ name: 'Heng Li', affiliation: 'Dana Farber Cancer Institute<br/>Harvard Medical School' }
	];
	const invitedSpeakers = [
		{ name: 'Aik Choon Tan', affiliation: 'University of Utah' },
		{ name: 'Andres Colubri', affiliation: 'UMass Chan Medical School' },
		{ name: 'Carlos Moreno', affiliation: 'Emory University' },
		{ name: 'Chi Zhang', affiliation: 'Indiana University' },
		{ name: 'Chong Wu', affiliation: 'University of Texas MD Anderson' },
		{ name: 'Chongzhi Zang', affiliation: 'University of Virginia' },
		{ name: 'David Gutman', affiliation: 'Emory University' },
		{ name: 'Ece Uzun Gamsiz', affiliation: 'Brown University' },
		{
			name: 'Ehsan Saghapour',
			affiliation: 'University of Alabama at Birmingham'
		},
		{
			name: 'Fei Zou',
			affiliation: 'University of North Carolina at Chapel Hill'
		},
		{
			name: 'Fengyuan Huang',
			affiliation: 'University of Alabama at Birmingham'
		},
		{ name: 'Greg Gibson', affiliation: 'Georgia Institute of Technology' },
		{ name: 'Hao Feng', affiliation: 'Case Western Reserve University' },
		{ name: 'Harry Feng', affiliation: 'Case Western Reserve University' },
		{ name: 'Huixiao Hong', affiliation: 'NCTR | US Food and Drug Administration' },
		{ name: 'Inimary Toby', affiliation: 'University of Dallas' },
		{ name: 'Jannatul Ferdous', affiliation: 'University of New Mexico' },
		{ name: 'Jian Hu', affiliation: 'Emory University' },
		{ name: 'Jianrong Wang', affiliation: 'Michigan State University' },
		{ name: 'Jin Jin', affiliation: 'University of Pennsylvania' },
		{ name: 'Jiwoong Kim', affiliation: 'University of South Florida' },
		{ name: 'Joe Zhang', affiliation: 'University of Southern Mississippi' },
		{ name: 'Joshua Welch', affiliation: 'University of Michigan' },
		{ name: 'Jun Ding', affiliation: 'National Institute of Aging' },
		{ name: 'Jun Xie', affiliation: 'Purdue University' },
		{ name: 'Kaili Hu', affiliation: 'University of Alabama at Birmingham' },
		{
			name: 'Katie Campbell',
			affiliation: 'UCLA Jonsson Comprehensive Cancer Center'
		},
		{
			name: 'Katie Farrel',
			affiliation: 'Centers for Disease Control and Prevention'
		},
		{ name: 'Lance Waller', affiliation: 'Emory University' },
		{ name: 'Lei Huang', affiliation: 'University of Southern Mississippi' },
		{ name: 'Leng Han', affiliation: 'Indiana University' },
		{
			name: 'Letu Qingge',
			affiliation: 'North Carolina A&T State University'
		},
		{ name: 'Li Chen', affiliation: 'University of Florida' },
		{
			name: 'Luca Pinello',
			affiliation: 'Massachusetts General Hospital<br/>Harvard Medical School'
		},
		{ name: 'Martin Zhang', affiliation: 'Carnegie Mellon University' },
		{
			name: 'Melchizedek Mashiku',
			affiliation: 'Centers for Disease Control and Prevention'
		},
		{ name: 'Michael W. Mullowney', affiliation: 'University of Chicago' },
		{ name: 'Mingyao Li', affiliation: 'University of Pennsylvania' },
		{ name: 'Mohamed Jahan', affiliation: 'University of Mississippi' },
		{
			name: 'Parisa Hatami',
			affiliation: 'University of Tennessee at Chattanooga'
		},
		{
			name: 'Ping Gong',
			affiliation: 'U.S. Army Engineer<br/>Research and Development Center'
		},
		{ name: 'Ping Ma', affiliation: 'University of Georgia' },
		{ name: 'Prajay Patel', affiliation: 'University of Dallas' },
		{ name: 'Qianqian Song', affiliation: 'University of Florida' },
		{ name: 'Qin Ma', affiliation: 'Ohio State University' },
		{ name: 'Qing Lu', affiliation: 'University of Florida' },
		{ name: 'Rhonda Bacher', affiliation: 'University of Florida' },
		{ name: 'Riyue Bao', affiliation: 'UPMC Hillman Cancer Center' },
		{ name: 'Robert J. Doerksen', affiliation: 'University of Mississippi' },
		{ name: 'Rongzi Liu', affiliation: 'University of Florida' },
		{
			name: 'Sangeeta Khare',
			affiliation: 'NCTR | US Food and Drug Administration'
		},
		{
			name: 'Saurabh Sinha',
			affiliation: 'Georgia Institute of Technology<br/>Emory University'
		},
		{ name: 'Sha Cao', affiliation: 'Indiana University' },
		{ name: 'Siyuan Ma', affiliation: 'Vanderbilt University' },
		{
			name: 'Stephen Techtmann',
			affiliation: 'Michigan Technological University'
		},
		{ name: 'Sushil Mishra', affiliation: 'University of Mississippi' },
		{
			name: 'Tianwei Yu',
			affiliation: 'Chinese University of Hong Kong, Shenzhen'
		},
		{ name: 'Tingting Hou', affiliation: 'University of Florida' },
		{
			name: 'Tomojit Ghosh',
			affiliation: 'University of Tennessee at Chattanooga'
		},
		{ name: 'Tri Ha', affiliation: 'University of Dallas' },
		{
			name: 'Wei Zhou',
			affiliation: 'Massachusetts General Hospital<br/>Broad Institute'
		},
		{ name: 'Wenjing Guo', affiliation: 'NCTR | US Food and Drug Administration' },
		{ name: 'Xiang Zhou', affiliation: 'University of Michigan' },
		{ name: 'Xiaoxi Shen', affiliation: 'Texas State University' },
		{
			name: 'Xihao Li',
			affiliation: 'University of North Carolina at Chapel Hill'
		},
		{
			name: 'Xiunan Wang',
			affiliation: 'University of Tennessee at Chattanooga'
		},
		{ name: 'Xiuwei Zhang', affiliation: 'Georgia Institute of Technology' },
		{ name: 'Yao Xie', affiliation: 'Gorgia Tech' },
		{ name: 'Yi-Juan Hu', affiliation: 'Emory University' },
		{ name: 'Ying Ma', affiliation: 'Brown University' },
		{
			name: 'Yu Liang',
			affiliation: 'University of Tennessee at Chattanooga'
		},
		{
			name: 'Yuan Li',
			affiliation: 'Centers for Disease Control and Prevention'
		},
		{ name: 'Yuan Zhou', affiliation: 'University of Florida' },
		{ name: 'Yuehua Cui', affiliation: 'Michigan State University' },
		{ name: 'Zhana Duren', affiliation: 'Clemson University' },
		{ name: 'Zhaotong Lin', affiliation: 'Florida State University' },
		{ name: 'Zhicheng Ji', affiliation: 'Duke University' },
		{ name: 'Zongliang Yue', affiliation: 'Auburn University' }
	];
</script>

<svelte:head>
	<title>MCBIOS 2024 | Program</title>
</svelte:head>

<div class="w-full justify-center">
	<Hero imageSrc={MicPic} headerText="Program" />
	<div class="space-y-5 w-11/12 md:w-5/6 mx-auto">
		<p class="text-center">
			Below you will be able to find the sessions that will be held during the conference. All of
			which cover exciting and novel developments in the field.
		</p>
		<p class="text-center">
			We will touch on machine learning, precision medicine, and more. Additional details will be
			released as the conference approaches!
		</p>
	</div>
</div>
<div class="w-5/6 mx-auto my-24">
	<TabGroup>
		<Tab bind:group={tabSet} name="Day 1" value={0}><span>March 22</span></Tab>
		<Tab bind:group={tabSet} name="Day 2" value={1}><span>March 23</span></Tab>
		<Tab bind:group={tabSet} name="Day 3" value={2}><span>March 24</span></Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel"
			><h3 class="h3 text-center my-10">Program coming soon</h3></svelte:fragment
		>
	</TabGroup>
</div>

<div class="w-1/2 m-auto my-24">
	<hr class="!border-t-8 !border-double" />
</div>

<div class="w-5/6 mx-auto mt-10 mb-5 align-middle items-center">
	<div class="lg:flex place-content-center gap-20">
		<div>
			<h2
				class="h2 text-center my-10 fill-token select-none drop-shadow-sm bg-gradient-to-br from-secondary-500 to-tertiary-100 bg-clip-text text-transparent box-decoration-clone"
			>
				Keynote Speakers
			</h2>
			<dl class="list-dl">
				{#each keynotes as keynote}
					<div class="container">
						<span class="flex-auto">
							<dt class="font-bold">{keynote.name}</dt>
							<dd>{@html keynote.affiliation}</dd>
						</span>
					</div>
				{/each}
			</dl>
		</div>
		<div>
			<h2
				class="h2 text-center my-10 fill-token select-none drop-shadow-sm bg-gradient-to-br from-secondary-500 to-tertiary-100 bg-clip-text text-transparent box-decoration-clone"
			>
				Invited speakers
			</h2>
			<dl class="list-dl max-h-96 overflow-y-scroll rounded-md outline p-2 mb-5">
				{#each invitedSpeakers as invitee}
					<div class="max-w-md overflow-clip">
						<span class="flex-auto">
							<dt class="font-bold">{invitee.name}</dt>
							<dd>{@html invitee.affiliation}</dd>
						</span>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</div>
