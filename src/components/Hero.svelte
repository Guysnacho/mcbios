<script>
	export let bannerText = '';
</script>

<section class="slider">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="block">
					{#if bannerText}
						<h1 class="animated fadeInUp">
							{bannerText}
						</h1>
					{/if}
					<slot />
				</div>
			</div>
		</div>
	</div>
</section>
