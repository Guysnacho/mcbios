<script>
	export let headerText = '';
	export let imageSrc = '';
</script>

<div class="w-full h-96">
	<header class="align-middle mx-auto relative text-center flex justify-center h-5/6 mb-16">
		<img src={imageSrc} alt="Abstract submission" class="w-full overflow-clip object-cover" />
		<div
			class="w-full py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-40"
		>
			<h1 class="h1 fill-token select-none drop-shadow-sm">{headerText}</h1>
		</div>
	</header>
</div>
