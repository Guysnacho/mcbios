<script>
	import CourtyardAtlanta from '$lib/assets/accom/courtyard-atlanta.jpg';
	import EmoryConferenceCenter from '$lib/assets/accom/emory-conference-center-hotel.jpg';
	import AccommodationsPic from '$lib/assets/background/photo-1494948858638-8f2f3be0ef78.avif';
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS 2024 | Accommodations</title>
</svelte:head>

<div class="w-full justify-center">
	<Hero imageSrc={AccommodationsPic} headerText="Accommodations" />
</div>
<div class="w-full justify-center bg-surface-700 shadow-lg py-10 -mt-16">
	<div class="space-y-5 w-11/12 md:w-5/6 mx-auto">
		<p class="text-center blockquote">
			A few recommendations on nearby hotels are provided for you to use for the duration of the
			conference. Being near the venue may ease time and traffic concerns so we urge you to consider
			distance when ultimately selecting your accommodations, whether they are the below or not.
		</p>
	</div>
</div>

<div class="justify-center py-10 w-11/12 md:w-5/6 mx-auto block md:flex gap-10">
	<div class="w-5/6 sm:w-4/5 md:w-1/2 mx-auto">
		<div class="card bg-gradient-to-br variant-gradient-secondary-tertiary my-8">
			<div class="card-header flex items-center">
				<img
					src={EmoryConferenceCenter}
					alt="Emory Conference Center Hotel"
					class="object-cover mx-auto rounded-md"
				/>
			</div>
			<section class="p-4 space-y-3">
				<h4 class="h4 text-center">Emory Conference Center Hotel</h4>
				<p class="text-center">
					<a
						class="text-amber-300 hover:text-amber-600 active:text-purple-800"
						href="https://maps.app.goo.gl/KF155M8YpHqp37Dx7"
						target="_blank">1615 Clifton Road, Atlanta, GA 30329</a
					>
				</p>
				<p class="max-h-40 overflow-auto">
					The Emory Conference Center Hotel is conveniently located within walking distance of the
					Emory campus. This hotel is offering a discounted rate at $169/night for king or double
					room. Rooms are limited and we encourage you to make reservations at your earliest
					convenience. Reservations can be made online and must be made before
					<span class="text-red-400 underline underline-offset-1">March 1, 2024</span> with the link
					below.
				</p>
			</section>
			<footer class="card-footer text-center pb-6">
				<div class="flex justify-center">
					<a
						class="btn-md variant-outline-primary text-amber-300 hover:text-amber-600 active:text-purple-800"
						href="https://book.passkey.com/e/50736611"
						target="_blank">Booking</a
					>
				</div>
			</footer>
		</div>
	</div>

	<div class="w-5/6 sm:w-4/5 md:w-1/2 mx-auto">
		<div class="card bg-gradient-to-br variant-gradient-tertiary-secondary my-8">
			<div class="card-header flex items-center">
				<img
					src={CourtyardAtlanta}
					alt="Emory Conference Center Hotel"
					class="object-cover mx-auto rounded-md"
				/>
			</div>
			<section class="p-4 space-y-3">
				<h4 class="h4 text-center">Courtyard Atlanta Executive Park/Emory</h4>
				<p class="text-center">
					<a
						class="text-amber-300 hover:text-amber-600 active:text-purple-800"
						href="https://maps.app.goo.gl/BEMKm2GbPnRXCXao7"
						target="_blank"
						>1236 Executive Park Drive Atlanta, Georgia 30329
					</a>
				</p>
				<p class="max-h-40 overflow-auto">
					In North Druid Hills, Courtyard Atlanta Executive Park/Emory offers amenities such as free
					Wi-Fi, complimentary parking, and a convenient location near leading health facilities.
					This hotel is offering a discounted rate at $117/night for a King room and $127/night for
					a Double room. Reservations must be made before
					<span class="underline">Feb 23, 2024</span> and availability is limited.
				</p>
			</section>
			<footer class="card-footer text-center">
				<div class="flex justify-center">
					<a
						class="btn-md variant-outline-primary text-amber-300 hover:text-amber-600 active:text-purple-800"
						href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1702500603260&key=GRP&app=resvlink"
						target="_blank">Booking</a
					>
				</div>
				<hr class="border-t-1 border my-2" />
				You may also book by calling the Marriott reservation line at
				<a
					class="link text-amber-300 hover:text-amber-600 active:text-purple-800"
					href="tel:+18667545927"
					target="_blank">1-866-754-5927</a
				> with the group name, MCBIOS 2024.
			</footer>
		</div>
	</div>
</div>
