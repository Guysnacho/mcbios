<script>
	export let rep = {
		name: '',
		affiliation: '',
		photo: '',
		position: ''
	};
</script>

<div
	class="card rounded-lg w-3/4 md:w-3/5 h-4/5 m-auto mb-5 md:mb-10 md:pb-3 lg:pb-0 bg-gradient-to-r from-surface-500 to-transparent"
>
	<div class="card-header p-0 overflow-hidden h-2/3">
		<img class="rounded-lg mx-auto w-full object-contain" src={rep.photo} alt={rep.name} />
	</div>
	<h5 class="text-center h4 sm:h2 md:h4 my-2">{rep.affiliation}</h5>
	<h3 class="text-center h3 sm:h1 md:h3">{rep.name}</h3>
	<h4 class="text-center h4 sm:h2 md:h4">{rep.position}</h4>
	<!-- <div class="text-center m-auto my-1 md:my-5 lg:my-7" /> -->
	<div class="card-footer"><br /></div>
</div>
