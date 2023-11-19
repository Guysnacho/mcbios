<script>
	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
	let registrationOpen = false;
</script>

<svelte:head>
	<title>MCBIOS 2024 | Registration</title>
</svelte:head>

<div class="align-middle mx-auto relative text-center flex justify-center h-1/4 mb-16">
	<img src={Abstract} alt="Abstract submission" class="w-full overflow-clip object-cover" />
	<div
		class="w-full py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-40"
	>
		<h1 class="h1 fill-token select-none drop-shadow-sm">Conference Registration</h1>
	</div>
</div>
<div class="w-9/12 md:w-10/12 grid grid-cols-3 gap-10 gap-y-14 justify-evenly m-auto">
	<div class="col-span-3 md:col-span-1 m-auto space-y-4">
		<p class="h3 text-center">Information Regarding Registration</p>

		<p class="text-center col-span-3 md:col-span-1 m-auto">
			Payment is expected at the time of registration (Credit or Debit Card). Demographic
			information gathered during registration will be aggregated and utilized by MCBIOS for grant
			applications. Member's information is never shared or sold.
		</p>
	</div>
	<div class="col-span-3 md:col-span-2 flex m-auto">
		<div
			class="card bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent border-violet-500 border-2"
		>
			<header class="card-header"><h3 class="h3">MCBIOS 2024 Registration</h3></header>
			{#if registrationOpen}
				<section class="p-4">
					To register for the 2023 Conference, select your registration type from the list below.
					Secure payment processing powered by Stripe Checkout.
				</section>
			{:else}
				<section class="p-4">Registration will open up soon, please keep an eye out!</section>
			{/if}
		</div>
	</div>
</div>
