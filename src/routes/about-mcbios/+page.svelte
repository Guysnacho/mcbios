<script>
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS | ABOUT</title>
</svelte:head>

<main>
	<Hero bannerText="ABOUT US">
		<strong>
			The purposes of the Society are scientific, educational, literary, charitable, and no other.
		</strong>
	</Hero>

	<section class="about section">
		<div class="container">
			<div class="row">
				<h3
					style="
			padding: 15px;
			border-radius: 5px;
			background-color: rgba(0, 0, 0, 0.1);
		  "
				>
					<center>
						MCBIOS is currently accepting the following open nominations for 2 board seats for a
						3-year term, 1 trainee seat, and 1 president elect. Nominees must be registered for the
						meeting by March 31st. We encourage nominees who have been involved in Bioinformatics
						and Computational Biology research, education, policy or related areas. Nominees will be
						screened by the nomination committee and voting will take place as soon as possible
						after March 31st and polls will remain open to all MCBIOS members until 11:59pm of the
						second day of our conference in Whova.
					</center>
					<br />
					<center>
						<span style="color: red"
							>Nominations must be submitted by email to Dr. Weida Tong, Chair of the MCBIOS
							Nominations Committee (<b
								><a href="mailto:weida.tong@fda.hhs.gov">weida.tong@fda.hhs.gov</a></b
							>) and cc’d to Dr. Jake Chen, President of MCBIOS (<b
								><a href="mailto:jakechen@uab.edu">akechen@uab.edu</a></b
							>)</span
						>
						<br /><br />
						<b><i>Download the nomination forms:</i></b>
						<br /><br />
						<a
							href="./assets/docs/MCBIOS_Board_of_Directors_Nomination_Form.docx"
							class="btn btn-main">Board of Directors Nomination Form</a
						>
						<a
							href="./assets/docs/MCBIOS_Student_Nomination_form_to_Board_of_Directors.docx"
							class="btn btn-main">Student Nomination to Board of Directors Form</a
						>
					</center>
				</h3>
				<div class="col-md-6">
					<div class="about-img">
						<img
							class="img-responsive"
							src="./assets/images/thumbnail_mcbios_com.jpg"
							alt="logo"
							width="800"
							height="905"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<h2 class="mt-40"><b>THE MISSION OF MCBIOS IS TO:</b></h2>
					<ul class="list-circle">
						<li>Advance the understanding of bioinformatics and computational biology</li>
						<li>Bring together scientists of various backgrounds and disciplines</li>
						<li>
							Facilitate the collaboration of researchers with similar or complementary backgrounds
							to solve biological, health and/or medical problems
						</li>
						<li>Promote education in bioinformatics and computational biology</li>
						<li>
							Inform the general public on the results and implications of current research in
							bioinformatics and computational biology
						</li>
						<li>
							Promote other activities that will contribute to the development of bioinformatics and
							computational biology
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="about-feature bg-dark section dark-service">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="title">
						<center><h1>PROGRAM CHAIRS</h1></center>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Dr.-Joshua-Xu.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Joshua Xu</h4>
						<p>Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/ACT.png"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Aik Choon Tan</h4>
						<p>Abstract Review Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Dr_andy_perkins.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Andy Perkins</h4>
						<p>Poster Session Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Bernie J Daigle Jr 2019.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Bernie Daigle</h4>
						<p>Young Scientist Award Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Dongying Li.png"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Dongying Li</h4>
						<p>Whova/EasyChair/Website (Technology) Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Homayouni_Profile_lowRes_2019.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Ramin Homayouni</h4>
						<p>Publication Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/RobertDoerksen_2018-195x240.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Robert Doerksen</h4>
						<p>Communication/Outreach Chair</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="service-item">
						<img
							src="./assets/images/board/Dr-Zhichao-Liu.jpg"
							alt="Img"
							width="200"
							height="250"
							style="border-radius: 100%"
						/>
						<h4>Dr. Zhichao Liu</h4>
						<p>Logistics and Workshop Chair</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
