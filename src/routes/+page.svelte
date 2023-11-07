<script>
	let vari = '';
</script>

<svelte:head>
	<title>MCBIOS 2024</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<!-- Animated Logo -->
		<h2 class="h2 fill-token select-none" aria-disabled="true">Under Construction</h2>
		<h2 class="h2 fill-token" id="img-bg">Under Construction</h2>

		<div class="space-y-2 select-none" aria-disabled="true">
			<p>Thank you for your patience, the site will be available soon!</p>
		</div>
	</div>
</div>

<style lang="postcss">
	#img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
