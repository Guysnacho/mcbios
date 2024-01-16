<script>
	import Abstract from '$lib/assets/background/Chang-Su_abstract.jpg';
	import Hero from '../../components/Hero.svelte';
	let registrationOpen = true;
</script>

<svelte:head>
	<title>MCBIOS 2024 | Registration</title>
</svelte:head>

<Hero imageSrc={Abstract} headerText="Conference Registration" />

<div class="w-9/12 md:w-10/12 grid grid-cols-3 gap-10 gap-y-14 justify-evenly m-auto h-1/4">
	<div class="col-span-3 md:col-span-1 m-auto space-y-4">
		<p class="h3 text-3xl text-center">Information Regarding Registration</p>

		<p class="text-center col-span-3 md:col-span-1 text-lg m-auto">
			Payment is expected at the time of registration (Credit or Debit Card). Demographic
			information gathered during registration will be aggregated and utilized by MCBIOS for grant
			applications. Member's information is never shared or sold.
		</p>
	</div>
	<div class="col-span-3 md:col-span-2 flex m-auto">
		<div
			class="card bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent border-tertiary-500 border-2"
		>
			<header class="card-header text-center"><h3 class="h3">MCBIOS 2024 Registration</h3></header>
			{#if registrationOpen}
				<section class="p-4">
					To register for the 2023 Conference, select your registration type from the list below.
					Secure payment processing powered by Stripe Checkout.
					<div class="flex justify-center">
						<a
							href="https://form.jotform.com/240087559997173"
							class="btn btn-lg variant-ringed-primary my-5">Register Now</a
						>
					</div>
				</section>
			{:else}
				<section class="p-4 text-xl">
					Registration will open up soon, please keep an eye out!
				</section>
			{/if}
		</div>
	</div>
</div>
