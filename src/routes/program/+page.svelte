<script>
	// @ts-nocheck
	import Hero from '../../components/Hero.svelte';
</script>

<svelte:head>
	<title>MCBIOS | Program</title>
</svelte:head>

<!-- ======= Hero Section ======= -->
<Hero>
	<h1>Scientific Program</h1>
</Hero>

<!-- End Hero -->

<main id="main">
	<div class="container w-md-75 w-lg-65 mt-3 mb-5">
		<div class="row justify-content-md-center content lead text-center mt-3 mb-5 px-3">
			Below you can find the sessions that will be held during the conference. All of which cover
			exciting and novel developments in the field. <br /><br />We will touch on machine learning,
			precision medicine, and even hold a workshop on AWS Sagemaker. Click through to learn more!
		</div>

		<div class="container py-7" id="scheduleSession">
			<div class="row my-5">
				<div class="col-md">
					<h2
						class="text-uppercase text-letter-spacing-xs text-primary text-center font-weight-bold"
					>
						Schedule-at-a-Glance
					</h2>
				</div>
			</div>
			<p class="text-lead text-center font-weight-bold mt-1">
				Select an event to see speaker information
			</p>
			<!-- Days -->
			<div 
				class="row"
				id="collapseSchedule"
				aria-labelledby="scheduleSession"
				data-toggle="collapse"
				data-parent="#scheduleSession"
			>
				<div class="col-lg-4 mb-3" id="March 15th, 2023">
					<h4 class="mt-0 mb-3 text-dark op-8 font-weight-bold">DAY 1: March 15th, 2023</h4>
					<ul class="list-timeline list-timeline-primary">
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-0"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								11am - 6:30pm Check-in, Registration, and Posters
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-0"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-1"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">11am Registration opens</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-1"
							>
								<span class="text-primary">Boxed lunch available for attendees</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-2"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								11am - 1pm Meet and Greet/Poster Set Up
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-2"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-3"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">1:15pm Welcome Remarks</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-3"
							>
								<span class="text-primary">Dr Inimary Toby</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-4"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								1:20pm - 2:15pm Keynote Address
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-4"
							>
								<span class="text-primary">Dr Ruth Roberts</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-5"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">2:15pm - 2:30pm Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-5"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-6"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								2:30pm - 3:45pm YSEA Session for Post-doctoral Fellows
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-6"
							>
								<span class="text-primary">Dr Bernie Daigle</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-7"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">3:45pm - 4pm Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-7"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-8"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								4pm - 5:15pm YSEA Session for Students
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-8"
							>
								<span class="text-primary">Dr Bernie Daigle</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-9"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								5:15pm - 6:45pm Poster Session
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-9"
							>
								<span class="text-primary"
									>Students and Post-Doctoral Fellows. Light refreshments provided</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-1-item-10"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								7pm Toyota Music Factory Shuttle
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-1-item-10"
							>
								<span class="text-primary">Restaurant options available for dinner</span>
							</p>
						</li>
					</ul>
				</div>

				<div class="col-lg-4 mb-3" id="March 16th, 2023">
					<h4 class="mt-0 mb-3 text-dark op-8 font-weight-bold">DAY 2: March 16th, 2023</h4>
					<ul class="list-timeline list-timeline-primary">
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-11"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								8am - 4pm Registration Opens
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-11"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-12"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">8:30am Welcome Remarks</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-12"
							>
								<span class="text-primary">Dr Philip Harold</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-13"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								8:30am - 9:30am Keynote Address
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-13"
							>
								<span class="text-primary">Dr Kurt Zimmerman</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-14"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">9:30am - 9:40am Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-14"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-15"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								9:40am - 10:50am Breakout Session I
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-15"
							>
								<span class="text-primary"
									>New developments of applying Big Data and Machine Learning methods to precision
									medicine<br />Dr Steve Qin</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-16"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								9:40am - 10:50am Breakout Session II
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-16"
							>
								<span class="text-primary"
									>Machine learning and deep learning promote safety evaluation and risk assessment<br
									/>Dr Huixiao Hong</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-17"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">10:50am - 11am Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-17"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-18"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								11am - 12:20pm Breakout Sessions III
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-18"
							>
								<span class="text-primary"
									>Computational Approaches for Immuno-Oncology<br />Dr Aik Choon</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-19"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								11am - 12:20pm Breakout Sessions IV
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-19"
							>
								<span class="text-primary"
									>Single-cell multi-omics analysis: from technology development to applications<br
									/>Dr Jake Chen</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-20"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								12:20pm - 1:15pm Lunch and MCBIOS Business Meeting
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-20"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-21"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								1:15pm - 3:45pm Workshop I
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-21"
							>
								<span class="text-primary"
									>AWS SageMaker Immersion Day Workshop<br />Dr Steve Fu</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-22"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								2:30pm - 3:30pm Breakout Session V
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-22"
							>
								<span class="text-primary"
									>Data Science Trends in Industry<br />Dr Funso Kumolu</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-23"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">3:30pm - 3:45pm Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-23"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-24"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								3:45pm - 4:15pm Plenary Talk
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-24"
							>
								<span class="text-primary">Dr Mikhail Dozmorov</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-25"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								4:20pm - 5:30pm Breakout Session VI
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-25"
							>
								<span class="text-primary">Software Resources<br />Dr Saadia Bihmidine</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-26"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">4:20pm - 6pm Workshop II</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-26"
							>
								<span class="text-primary">NIBLSE Educational Resources</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-2-item-27"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">5:30pm - 6pm Workshop III</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-2-item-27"
							>
								<span class="text-primary">Career Symposium</span>
							</p>
						</li>
					</ul>
				</div>

				<div class="col-lg-4 mb-3" id="March 17th, 2023">
					<h4 class="mt-0 mb-3 text-dark op-8 font-weight-bold">DAY 3: March 17th, 2023</h4>
					<ul class="list-timeline list-timeline-primary">
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-28"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								7:30am - 8:50am Board Meeting and Breakfast
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-28"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-29"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								9am - 9:50am Keynote Address
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-29"
							>
								<span class="text-primary">Dr Isaac Chan</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-30"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">9:50am - 10am Break</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-30"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-31"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								10am - 11:20am Breakout Session VI
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-31"
							>
								<span class="text-primary"
									>Network Medicine and Drug Discovery Applications<br />Dr Zongliang Yue</span
								>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-32"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								10am - 11:20am Breakout Session VII
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-32"
							>
								<span class="text-primary">ML and Genomics<br />Dr Inimary Toby</span>
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-33"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								11:30am - 12:15pm Keynote Address
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-33"
							>
								<span class="text-primary" />
							</p>
						</li>
						<li
							class="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column"
							data-toggle="collapse"
							data-target="#day-3-item-34"
						>
							<p class="my-0 text-dark flex-fw text-sm text-uppercase">
								12:15pm - 1:30 pm Lunch, Awards Banquet and Closing
							</p>
							<p
								class="my-0 collapse flex-fw text-uppercase text-xs text-dark op-8"
								id="day-3-item-34"
							>
								<span class="text-primary" />
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- Schedule -->

		<div class="accordion mx-3 mx-md-5 my-5 my-md-10">
			<div class="card" id="sessionAccordion">
				<div class="card-header d-flex justify-content-center" id="sessionOne">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						MCBIOS Keynote
					</button>
				</div>
				<div
					id="collapseOne"
					class="collapse show"
					aria-labelledby="sessionOne"
					data-toggle="collapse"
					data-parent="#sessionAccordion"
				>
					<div class="card-body row content">
						<div class="row p-2 align-items-center">
							<div class="col-lg-4">
								<img
									decoding="async"
									class="img-fluid rounded"
									alt="Dr. Ruth Roberts"
									title="Professor Ruth Roberts"
									src="./images/Ruth-8by6-800x600.jpg"
									srcset="https://www.apconix.com/wp-content/uploads/2022/10/Ruth-8by6-200x150.jpg 200w, https://www.apconix.com/wp-content/uploads/2022/10/Ruth-8by6-400x300.jpg 400w, https://www.apconix.com/wp-content/uploads/2022/10/Ruth-8by6-600x450.jpg 600w, https://www.apconix.com/wp-content/uploads/2022/10/Ruth-8by6-800x600.jpg 800w, https://www.apconix.com/wp-content/uploads/2022/10/Ruth-8by6-1200x901.jpg 1200w"
									sizes="(max-width: 800px) 100vw, 400px"
								/>
							</div>
							<div class="col-lg-8 py-4">
								<h4 class="my-3 text-center">Ruth A. Roberts, PhD</h4>
								<p>
									Dr. Ruth A. Roberts is Chair and Director of Drug Discovery at Birmingham
									University, UK and Cofounder of ApconiX, recent winners of the 2022 Queen's award
									for Enterprise in Exports. Previously, Ruth was Global Head of Regulatory Safety
									at AstraZeneca (2004-2014), Director of Toxicology for Aventis in Paris, France
									(2002-2004) and Head of Cancer Biology at Central Toxicology Laboratory
									(1990-2002).
								</p>
								<div class="container text-center">
									<a
										class="btn-primary btn-lg"
										target="_blank"
										referrerpolicy="no-referrer"
										href="https://www.apconix.com/team-members/ruth-roberts/">Learn More</a
									>
								</div>
							</div>
						</div>
						<div class="row p-2 align-items-center">
							<div class="col-lg-4">
								<img
									decoding="async"
									class="img-fluid rounded"
									alt="Dr. Kurt Zimmerman"
									title="Professor Kurt Zimmerman"
									src="./assets/images/zimmerman-_-widget.jpg"
									sizes="(max-width: 800px) 100vw, 400px"
								/>
							</div>
							<div class="col-lg-8 py-4">
								<h4 class="my-3 text-center">Kurt Zimmerman, PhD</h4>
								<p>
									Dr. Zimmerman is an assistant professor at the University of Oklahoma Health
									Sciences Center who focuses on understanding the role of immune cells in
									polycystic kidney and liver disease(PKD). The goal of this research is to develop
									new approaches and targets for treatment of patients suffering from PKD.
								</p>
								<div class="container text-center">
									<a
										class="btn-primary btn-lg"
										target="_blank"
										referrerpolicy="no-referrer"
										href="https://medicine.ouhsc.edu/Academic-Departments/Internal-Medicine/Sections/Nephrology/Nephrology-Research/Zimmerman-Lab"
										>Learn More</a
									>
								</div>
							</div>
						</div>
						<div class="row p-2 align-items-center">
							<div class="col-lg-4">
								<img
									decoding="async"
									class="img-fluid rounded"
									alt="Dr. Isaac Chan"
									title="Professor Isaac Chan"
									src="./assets/images/KnegAREt_400x400.jpg"
									sizes="(max-width: 800px) 100vw, 400px"
								/>
							</div>
							<div class="col-lg-8 py-4">
								<h4 class="my-3 text-center">Isaac Chan, MD, PhD</h4>
								<p>
									Isaac Chan, M.D. Ph.D., is an Assistant Professor in the Department of Internal
									Medicine at UT Southwestern Medical Center and a member of its Division of
									Hematology Oncology. He specializes in immunotherapy, breast cancer, and
									metastatic cancer.
								</p>
								<p>
									During his MD/PhD training at University of North Carolina and medical oncology
									fellowship at Johns Hopkins University.
								</p>
								<div class="container text-center">
									<a
										class="btn-primary btn-lg"
										target="_blank"
										referrerpolicy="no-referrer"
										href="https://profiles.utsouthwestern.edu/profile/202315/isaac-chan.html"
										>Learn More</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionTwo">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseTwo"
						aria-expanded="false"
						aria-controls="collapseTwo"
					>
						Plenary Speaker
					</button>
				</div>
				<div
					id="collapseTwo"
					class="collapse show"
					aria-labelledby="sessionTwo"
					data-parent="#sessionAccordion"
				>
					<div class="card-body row content">
						<div class="row p-2 align-items-center">
							<div class="col-lg-4">
								<img
									decoding="async"
									class="img-fluid rounded"
									alt="Dr. Ruth Roberts"
									title="Professor Ruth Roberts"
									src="./assets/images/Ruth-8by6-800x600.jpg"
									sizes="(max-width: 800px) 100vw, 400px"
								/>
							</div>
							<div class="col-lg-8 py-4">
								<h4 class="my-3 text-center">Mikhail Dozmorov, PhD</h4>
								<p>
									Dr. Mikhail Dozmorov is an associate professor in the Biostatistics department,
									Virginia Commonwealth University. He develops statistical methods and
									bioinformatics tools for the integrative analysis of genomics datasets.
								</p>
								<p>
									Through collaborations with basic and clinical cancer researchers, he analyzed and
									interpret RNA-seq, ChIP-seq, DNA methylation, single-cell sequencing data. He is
									developing biostatistical methods and software to analyze the three-dimensional
									structure of the genome obtained with Chromatin Conformation Capture sequencing
									technologies (e.g., Hi-C).
								</p>
								<div class="container text-center">
									<a
										class="btn-primary btn-lg"
										target="_blank"
										referrerpolicy="no-referrer"
										href="https://www.chrichmond.org/research/find-a-researcher/mikhail-dozmorov-phd"
										>Learn More</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionThree">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseThree"
						aria-expanded="false"
						aria-controls="collapseThree"
					>
						New developments of applying Big Data and Machine Learning methods to precision medicine
					</button>
				</div>
				<div
					id="collapseThree"
					class="collapse show"
					aria-labelledby="sessionThree"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						<p>
							Precision Medicine advocates for the practice of customized disease treatment and
							prevention such that all clinical decisions are made based on the characteristics of
							individual patients.
							<br />
							<br />
							During this session we'll showcase the latest research developments in the areas of applying
							advanced Artificial Intelligence and Machine Learning and Big Data informatics in precision
							medicine.
						</p>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionFour">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseFour"
						aria-expanded="false"
						aria-controls="collapseFour"
					>
						Machine learning and deep learning promote safety evaluation and risk assessment
					</button>
				</div>
				<div
					id="collapseFour"
					class="collapse show"
					aria-labelledby="sessionFour"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						Machine learning have been widely applied in almost every field such as science and
						medicine.
						<br />
						<br />
						Advancements in machine learning and deep learning are paving the road to future data science
						and will have significant impacts on the public health. This session is intended for experts
						and students in this field to exchange their experiences and achievements and explore potential
						collaborations.
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionFive">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseFive"
						aria-expanded="false"
						aria-controls="collapseFive"
					>
						Network Medicine and Drug Discovery
					</button>
				</div>
				<div
					id="collapseFive"
					class="collapse show"
					aria-labelledby="sessionFive"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						The fundamental questions for the integrative multi-omics network-based analysis are
						"How can we remove noise and boost signals from multi-omics data analytics?", "How can
						we screen biological conditional interactions and regulations using multi-omics data?",
						"How can we further improve the odds of precision medicine's success using the
						multi-omics data?".
						<br />
						<br />
						This session aims to trigger the common interest in the MCBIOS community for rethinking and
						revisiting the crucial questions in utilizing multi-omics data for personalized medicine
						and coupling network biology with cutting-edge multi-omics technologies.
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionSix">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseSix"
						aria-expanded="false"
						aria-controls="collapseSix"
					>
						Single-cell multi-omics analysis: from technology development to applications
					</button>
				</div>
				<div
					id="collapseSix"
					class="collapse show"
					aria-labelledby="sessionSix"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						Single-cell analysis has revolutionized biomedical sciences by becoming a converging
						technology for modern genetics, cell biology, immunology, biochemistry, and disease
						biology studies.
						<br />
						<br />
						Coupling with AI/ML, single-cell multi-omics studies may provide insights on how organs evolve
						and how a disease progresses. In this session, we will solicit late-breaking primary research
						in the follwing topics and more during a 2-hr session:
						<ul class="list-group mt-2">
							<li class="list-group-item">
								How can we impute data and reduce data noises from different single-cell analytical
								assays?
							</li>
							<li class="list-group-item">
								How can we balance knowledge-guided and knowledge-agnostic approaches in
								characterizing cell types and their relationships based on embedding clusters?
							</li>
							<li class="list-group-item">
								How can we infer intercellular and intracellular signaling network data at the
								molecular and cellular level?
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionSeven">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseSeven"
						aria-expanded="false"
						aria-controls="collapseSeven"
					>
						Computational Approaches for Immuno-Oncology
					</button>
				</div>
				<div
					id="collapseSeven"
					class="collapse show"
					aria-labelledby="sessionSeven"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						Despite the significant improvements in the treatment of cancer with new treatment
						agents like advanced and adjuvant disease settings of solid tumors and hematologic
						malignancies, many patients still do not achieve long-term disease remission and
						control.
						<br />
						<br />
						New computational methods are needed to extract, integrate and interpret these high-dimensional
						data sets to develop effective biomarkers for immunotherapies. This session will focus on
						new and innovative computational methods in immuno-oncology.
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header d-flex justify-content-center" id="sessionEight">
					<button
						class="btn btn-outline-info btn-block"
						type="button"
						data-toggle="collapse"
						data-target="#collapseEight"
						aria-expanded="false"
						aria-controls="collapseEight"
					>
						AWS SageMaker Immersion Day workshop
					</button>
				</div>
				<div
					id="collapseEight"
					class="collapse show"
					aria-labelledby="sessionEight"
					data-parent="#sessionAccordion"
				>
					<div class="card-body">
						Amazon SageMaker is a fully managed machine learning service. With SageMaker, data
						scientists and developers can quickly and easily build and train machine learning
						models, and then directly deploy them into a production-ready hosted environment.
						<br />
						<br />
						The only pre-requisite to participate the hands-on workshop is a laptop with internet access.
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
<!-- End #main -->
