<script>
	export let image = '';
	export let name = '';
	export let url = '';
	export let affiliation = '';
	export let heading = '';
	export let body = '';
</script>

<div class="elementor-column-wrap elementor-element-populated">
	<div class="elementor-widget-wrap">
		<div
			class="elementor-element elementor-element-b2a6f3c elementor-position-left elementor-vertical-align-top elementor-widget elementor-widget-image-box"
			data-id="b2a6f3c"
			data-element_type="widget"
			data-widget_type="image-box.default"
		>
			<div class="elementor-widget-container">
				<div class="elementor-image-box-wrapper">
					<figure class="elementor-image-box-img" style="margin-right: 2rem;">
						<img
							width="200"
							height="300"
							src={image}
							class="attachment-full size-full"
							alt="Speaker"
						/>
					</figure>
					<div class="elementor-image-box-content">
						<h4 class="elementor-image-box-title" style="color: black;">
							{name} <br />{affiliation}
						</h4>
					</div>
				</div>
			</div>
		</div>
		<div
			class="elementor-element elementor-element-455a62e elementor-widget elementor-widget-heading"
			data-id="455a62e"
			data-element_type="widget"
			data-widget_type="heading.default"
		>
			<div class="elementor-widget-container">
				<h3 class="elementor-heading-title elementor-size-default" style="color: black;">
					{#if url}
						<a href={url} style="text-decoration: underline;">{heading}</a>
					{:else}
						{heading}
					{/if}
				</h3>
			</div>
		</div>
		<div
			class="elementor-element elementor-element-1d69c7d elementor-widget elementor-widget-text-editor"
			data-id="1d69c7d"
			data-element_type="widget"
			data-widget_type="text-editor.default"
		>
			{@html body}
		</div>
	</div>
</div>
