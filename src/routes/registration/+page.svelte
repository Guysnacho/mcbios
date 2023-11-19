<script>
	let registrationOpen = false;
</script>

<svelte:head>
	<title>MCBIOS 2024 | Registration</title>
</svelte:head>

<div class="w-5/6 h-full grid grid-cols-3 gap-10 justify-evenly m-auto">
	<p class="text-center col-span-3 md:col-span-1 m-auto">
		Payment is expected at the time of registration (Credit or Debit Card). Demographic information
		gathered during registration will be aggregated and utilized by MCBIOS for grant applications.
		Member's information is never shared or sold.
	</p>
	<div class="col-span-3 md:col-span-2 h-1/3 flex m-auto">
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
