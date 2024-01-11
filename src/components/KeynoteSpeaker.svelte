<script>
	export let name = '';
	export let url = '';
	export let affiliation = '';
	export let photo = '';
</script>

<div class="w-60 mx-auto space-y-4 card-hover">
	<a href={url} target="_blank"> <h4 class="h4 text-center anchor">{name}</h4></a>
	<div class="italic mx-auto flex justify-center">
		<a href={url} target="_blank">
			<img
				class="aspect-square object-cover object-top w-60"
				src={photo}
				alt={name + ' Headshot'}
			/>
		</a>
	</div>
	<p class="italic text-lg text-center">{affiliation}</p>
</div>
