<script>
	import AvatarCard from '../../components/AvatarCard.svelte';
	import Steve from '$lib/assets/Qin-Steve.jpg';
	let repList = [
		{
			name: 'Dr. Steve Qin',
			affiliation: 'Emory University',
			photo: Steve,
			position: 'Co-Chair'
		}
	];
</script>

<svelte:head>
	<title>MCBIOS 2024 | About Us</title>
</svelte:head>

<h2 class="h3 md:h2 lg:h1 text-center my-24">Organizing Commitee</h2>

<h4 class="h4 text-center">Co-Chairs</h4>
<div class="container mx-auto h-full">
	<section class="grid grid-cols-1 grid-rows-2 justify-between my-5 md:grid-cols-2">
		<AvatarCard rep={repList[0]} />
		<AvatarCard rep={repList[0]} />
	</section>

	<!-- <section class="grid grid-cols-2 md:grid-cols-3 gap-4 auto-cols-auto">
	<section class="grid grid-cols-3 my-5 h-1/6 md:h-1/4">
		<div>
			<p class="text-center">Image 1</p>
			<img
				class="h-auto max-w-full rounded-lg mx-auto"
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				alt=""
			/>
		</div>
		<div>
			<p class="text-center">Image 2</p>
			<img
				class="h-auto max-w-full rounded-lg mx-auto"
				src="https://images.unsplash.com/photo-1553184570-557b84a3a308?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2NTF8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				alt=""
			/>
		</div>
		<div>
			<p class="text-center">Image 3</p>
			<img
				class="h-auto max-w-full rounded-lg mx-auto"
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				alt=""
			/>
		</div>
	</section>
	<section class="grid grid-flow-col grid-cols-2 h-1/6 md:h-1/4 lg:h-4/6">
		<div>
			<p class="text-center">Image 3</p>
			<img
				class="h-auto max-w-full rounded-lg mx-auto"
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				alt=""
			/>
		</div>
		<div>
			<p class="text-center">Image 3</p>
			<img
				class="h-auto max-w-full rounded-lg mx-auto"
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				alt=""
			/>
		</div>
	</section> -->
</div>
