<script>
	// @ts-nocheck
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS | Accommodations</title>
</svelte:head>

<!-- ======= Hero Section ======= -->
<Hero>
	<h1>Accommodations</h1>
</Hero>

<!-- End Hero -->

<main id="main">
	<!-- ======= About Section ======= -->
	<section id="greeting" class="about">
		<div class="container">
			<div class="row justify-content-md-center content lead text-center my-3 px-3">
				Below are a few recommendations on nearby hotels you can use for the duration of the
				conference. Being near the venue may ease time and traffic concerns so we urge you to
				consider distance when ultimately selecting your accommodations, whether they are the below
				or not. Shuttle access will be available to and from University of Dallas campus.
			</div>
		</div>
	</section>
	<!-- End About Section -->

	<!-- ======= Card Section ======= -->
	<div class="container mb-5">
		<div class="row content mb-2">
			<div class="col-lg-6">
				<div class="card text-left mb-5">
					<img
						style="height: 2px"
						class="card-img-top h-75"
						src="./assets/holiday-inn-irving-5187921965-3x2"
						alt="Holiday Inn Irving ‐ Las Colinas"
					/>
					<div class="card-body">
						<h4 class="card-title text-center">Holiday Inn Irving ‐ Las Colinas</h4>
						<p class="card-text">
							Irving ‐ Las Colinas is located conveniently in the heart of the DFW Metroplex, so
							this hotel can keep you close to the exciting amusements of it all. With access to
							both the business and fun in Dallas!
						</p>
						<div class="text-muted mb-2 text-center">
							<br /><a
								href="https://maps.google.com/?q=110%20W.%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075039"
								target="_blank"
							/><a
								href="https://maps.apple.com/maps?q=110%20W.%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075039"
								target="_blank"
							>
								<u>110 W. John Carpenter Freeway, Irving, TX 75039</u></a
							>
						</div>
						<p class="text-center pt-3">
							<a
								name="Booking"
								id="holidayBooking"
								class="btn-primary"
								href="https://www.holidayinn.com/redirect?path=rates&amp;brandCode=HI&amp;localeCode=en&amp;regionCode=1&amp;hotelCode=DFWIV&amp;checkInDate=14&amp;checkInMonthYear=022023&amp;checkOutDate=18&amp;checkOutMonthYear=022023&amp;_PMID=99801505&amp;GPC=MCB&amp;cn=no&amp;viewfullsite=true"
								role="button"
								target="_blank"
								rel="noreferrer"
								data-toggle="modal"
								data-target="#holidayModal"
							>
								Booking
							</a>
						</p>
						<div class="alert alert-primary" role="alert">
							<p class="text-center">Holiday Inn Discounts</p>
							<p>Holiday Inn is offering discounted rooms: $115/night</p>
							<p>
								Select Booking to access exclusive deals! At 5:00pm local time local time on March
								1st, 2023, there will be a cut-off on this deal so please plan ahead of time. Those
								who plan to make a reservation in between these dates should contact Mr. Robin
								directly at
								<a href="mailto:gm@hilascolinas.com">gm@hilascolinas.com</a> to receive the discount.
								The guest can ask to book under the MCBIOS Conference group block.
							</p>
							<p>
								Reservations should be made either online or by calling Marriott Reservations at <a
									href="tel:19726501600">(972) 650-1600</a
								>
								or
								<a href="tel:18884654329">1 (888) 465-4329</a> to confirm.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="card text-left">
					<img
						class="card-img-top"
						src="./assets/dfwai-exterior-2639-hor-wide.jpg"
						alt="Aloft Las Colinas"
					/>
					<div class="card-body">
						<h4 class="card-title text-center">Aloft Las Colinas</h4>
						<p class="card-text">
							Experience a sophisticated stay in Irving, Texas, at Aloft Las Colinas. This hotel
							boasts an ideal location in the upscale Las Colinas community providing business
							travelers convenient access to airports &amp; major corporate headquarters.
						</p>
						<div class="text-muted mb-2 text-center">
							<br /><a
								href="https://maps.google.com/?q=122%20East%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075062"
								target="_blank"
							/><a
								href="https://maps.apple.com/maps?q=122%20East%20John%20Carpenter%20Freeway,%20Irving,%20TX%2075062"
								target="_blank"
							>
								<u>122 East John Carpenter Freeway, Irving, TX 75062</u></a
							>
						</div>
						<p class="text-center pt-3">
							<a
								name="Booking"
								id="aloftBooking"
								class="btn-primary"
								href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1669217989829&amp;key=GRP&amp;app=resvlink"
								role="button"
								target="_blank"
								rel="noreferrer">Booking</a
							>
						</p>
						<div class="alert alert-primary" role="alert">
							<p class="text-center">Aloft Discounts</p>
							<p>Aloft Las Colinas is also offering rooms: $154/night</p>
							<p>
								You may call <a href="tel:19727176100">1 (972) 717-6100</a> and mention that you are
								part of the MCBIOS 2023 Conference Block group staying at the Aloft Las Colinas, located
								at 122 East John Carpenter Freeway, Irving, TX 75062.
							</p>
							<p>
								All reservations must be guaranteed with a major credit card. The hotel will not
								hold any reservations unless secured by credit card.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End Card Section -->
</main>
<!-- End #main -->
