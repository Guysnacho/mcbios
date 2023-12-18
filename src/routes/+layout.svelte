<svelte:head>
	<title>MCBIOS 2023</title>
	<script src="./assets/bootstrap.bundle.min.js.download"></script>
	<script src="./assets/glightbox.min.js.download"></script>
	<script src="./assets/isotope.pkgd.min.js.download"></script>
	<script src="./assets/swiper-bundle.min.js.download"></script>
	<script src="./assets/validate.js.download"></script>
	<script src="./assets/main.js.download"></script>
	<script src="./assets/jquery.slim.min.js.download"></script>

	<!-- Vendor CSS Files -->
	<link href="./assets/bootstrap.min.css" rel="stylesheet" />
	<link href="./assets/bootstrap-icons.css" rel="stylesheet" />
	<link href="./assets/boxicons.min.css" rel="stylesheet" />
	<link href="./assets/glightbox.min.css" rel="stylesheet" />
	<link href="./assets/remixicon.css" rel="stylesheet" />
	<link href="./assets/swiper-bundle.min.css" rel="stylesheet" />

	<link href="./assets/style.css" rel="stylesheet" />
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
					<a class="nav-link" href="/abstract_submission">Abstract Submission</a>
				</li>
				<li>
					<a class="nav-link" href="/registration">Registration</a>
				</li>
				<li>
					<a class="nav-link" href="/accommodations">Accomodations</a>
				</li>
				<li><a class="nav-link" href="/program">Program</a></li>
				<li><a class="nav-link" href="/about_us">About Us</a></li>
				<li>
					<a class="nav-link" href="/ysea">Young Scientist Excellence Awards</a>
				</li>
			</ul>

			<i class="bi bi-list mobile-nav-toggle" />
		</nav>
		<!-- .navbar -->
	</div>
</header>
<!-- End Header -->

<slot />

<!-- ======= Footer ======= -->

<footer id="footer">
	<div class="footer-top">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-6">
					<h3>MCBIOS 2023</h3>
					<p>
						The 19th Annual Meeting of MCBIOS will be held on the campus of University of Dallas <br
						/>with the theme of "Big Data and Artificial Intelligence for Genomics and Therapeutics"
						from March 15-17, 2023.
					</p>
				</div>
			</div>

			<div class="social-links">
				<a
					href="https://www.facebook.com/pages/category/Organization/MidSouth-Computational-Biology-and-Bioinformatics-Society-MCBIOS-247738778611609/"
					class="facebook"><i class="bx bxl-facebook" /></a
				>
				<a href="https://www.linkedin.com/groups/9069670/" class="linkedin"
					><i class="bx bxl-linkedin" /></a
				>
			</div>
		</div>
	</div>
</footer>
<!-- End Footer -->
