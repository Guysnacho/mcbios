<script>
	export let name = '';
	export let affiliation = '';
	export let photo = '';
	export let position = '' || undefined;
</script>

<div
	class="card rounded-lg w-3/4 md:w-3/5 h-4/5 m-auto mb-5 md:mb-10 md:pb-3 bg-gradient-to-r from-tertiary-400 to-surface-700"
>
	<div class="card-header rounded-lg overflow-clip h-4/6 mb-2">
		<img class="rounded-lg mx-auto w-full object-contain" src={photo} alt={name} />
	</div>
	<h5 class="text-center h5 md:h6 lg:h6 xl:h5">{affiliation}</h5>
	<h3 class="text-center h3 sm:h2 md:h3 lg:h4">{name}</h3>
	<h4 class="text-center h4 sm:h3 md:h4 {position == undefined ? 'hidden' : undefined}">
		{position}
	</h4>
</div>
