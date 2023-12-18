<svelte:head>
	<title>MCBIOS 2023</title>
	<script src="./assets/bootstrap.bundle.min.js.download"></script>
	<script src="./assets/glightbox.min.js.download"></script>
	<script src="./assets/isotope.pkgd.min.js.download"></script>
	<script src="./assets/swiper-bundle.min.js.download"></script>
	<script src="./assets/validate.js.download"></script>
	<script src="./assets/main.js.download"></script>
	
	<!-- Vendor CSS Files -->
	<link href="assets/bootstrap.min.css" rel="stylesheet" />
	<link href="assets/bootstrap-icons.css" rel="stylesheet" />
	<link href="assets/boxicons.min.css" rel="stylesheet" />
	<link href="assets/glightbox.min.css" rel="stylesheet" />
	<link href="assets/remixicon.css" rel="stylesheet" />
	<link href="assets/swiper-bundle.min.css" rel="stylesheet" />
	
	<link href="assets/style.css" rel="stylesheet" />
	<!-- Template Main CSS File -->
</svelte:head>

<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center header-transparent header-scrolled">
	<div class="container d-flex align-items-center justify-content-between">
		<div class="logo">
			<h1><a href="/">MCBIOS 2023</a></h1>
			<!-- Uncomment below if you prefer to use an image logo -->
			<!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
		</div>

		<nav id="navbar" class="navbar">
			<ul>
				<li><a class="nav-link" href="/">Home</a></li>
				<li>
					<a class="nav-link" href="/abstract_submission"
						>Abstract Submission</a
					>
				</li>
				<li>
					<a class="nav-link" href="/registration">Registration</a>
				</li>
				<li>
					<a class="nav-link" href="/accommodations"
						>Accomodations</a
					>
				</li>
				<li><a class="nav-link" href="/program">Program</a></li>
				<li><a class="nav-link" href="/about_us">About Us</a></li>
				<li>
					<a class="nav-link" href="/ysea"
						>Young Scientist Excellence Awards</a
					>
				</li>
			</ul>

			<i class="bi bi-list mobile-nav-toggle" />
		</nav>
		<!-- .navbar -->
	</div>
</header>
<!-- End Header -->
<slot />
