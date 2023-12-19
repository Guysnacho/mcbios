<svelte:head>
	<title>MCBIOS 2022</title>
	<!-- Vendor CSS Files -->
	<link rel="stylesheet" href="./assets/style/bootstrap.min.css" />
	<!-- Ionic Icon Css -->
	<link rel="stylesheet" href="./assets/style/ionicons.min.css" />
	<!-- animate.css -->
	<link rel="stylesheet" href="./assets/style/animate.css" />
	<!-- Magnify Popup -->
	<link rel="stylesheet" href="./assets/style/magnific-popup.css" />
	<!-- Owl Carousel CSS -->
	<link rel="stylesheet" href="./assets/style/slick.css" />
	<!-- Main Stylesheet -->
	<link rel="stylesheet" href="./assets/style.css" />

	<script src="./assets/js_bundle/ionicons.esm.js.download" type="module"></script>
	<script src="./assets/js_bundle/ionicons(1).js.download" nomodule></script>
	<script
		src="./assets/js_bundle/common.js.download"
		type="text/javascript"
		charset="UTF-8"
	></script>
	<script src="./assets/js_bundle/util.js.download" type="text/javascript" charset="UTF-8"></script>
</svelte:head>

<!-- Header Start -->
<header class="navigation">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<!-- header Nav Start -->
				<nav class="navbar">
					<div class="container-fluid">
						<!-- Brand and toggle get grouped for better mobile display -->
						<div class="navbar-header">
							<button
								type="button"
								class="navbar-toggle collapsed"
								data-toggle="collapse"
								data-target="#bs-example-navbar-collapse-1"
							>
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar" />
								<span class="icon-bar" />
								<span class="icon-bar" />
							</button>
							<a class="navbar-brand" href="/">
								<img
									src="./assets/images/MCBIOS_Logo2.png"
									alt="Logo"
									height="85"
									style="margin-top: -15px;"
								/>
							</a>
						</div>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul class="nav navbar-nav navbar-right">
								<li><a href="/">Home</a></li>
								<li>
									<a href="/abstract-submission">Abstract Submission</a>
								</li>
								<li><a href="/about-mcbios">About Us</a></li>
								<li>
									<a href="/ysea">Young Scientist Excellence Awards</a>
								</li>
								<li />
								<li><a href="/program">Program</a></li>
								<li />
								<li><a href="/registration">Registration</a></li>
							</ul>
						</div>
						<!-- /.navbar-collapse -->
					</div>
					<!-- /.container-fluid -->
				</nav>
			</div>
		</div>
	</div>
</header>

<slot />

<!-- footer Start -->
<footer class="footer">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="footer-manu">
					<ul>
						<li><a href="/">Home</a></li>
						<li>
							<a href="/abstract-submission">Abstract Submissions</a>
						</li>
						<li><a href="/about-mcbios">About Us</a></li>
						<li>
							<a href="/ysea">Young Scientist Excellence Awards</a>
						</li>
						<li><a href="/program">Program</a></li>
						<li><a href="/registration">Registration</a></li>
					</ul>
				</div>
				<!--<p class="copyright">Copyright 2018 &copy; Design & Developed by <a href="http://www.themefisher.com">themefisher.com</a>. All rights reserved.-->
				<br />
				<p />
			</div>
		</div>
	</div>
</footer>
