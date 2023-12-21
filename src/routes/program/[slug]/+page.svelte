<script lang="ts">
	import KeynoteInfo from '$lib/KeynoteInfo';
	import KeynoteSpeaker from '../../../components/KeynoteSpeaker.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let slug = Number.parseInt(data.slug) || 0;
</script>

<main id="main" class="site-main">
	<article
		itemtype="https://schema.org/CreativeWork"
		itemscope
		id="post-729"
		class="post-729 page type-page status-publish ast-article-single"
	>
		<header class="entry-header ast-header-without-markup" />
		<!-- .entry-header -->

		<div class="entry-content clear" itemprop="text">
			<div
				data-elementor-type="post"
				data-elementor-id="729"
				class="elementor elementor-729 elementor-bc-flex-widget"
				data-elementor-settings="[]"
			>
				<div class="elementor-inner">
					<div class="elementor-section-wrap">
						<section
							class="elementor-element elementor-element-1f07971 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section"
							data-id="1f07971"
							data-element_type="section"
							data-settings={{ background_background: 'classic' }}
						>
							<div class="elementor-background-overlay" />
							<div class="elementor-container elementor-column-gap-default">
								<div class="elementor-row">
									<div
										class="elementor-element elementor-element-e43d12d elementor-column elementor-col-16 elementor-top-column"
										data-id="e43d12d"
										data-element_type="column"
									>
										<div class="elementor-column-wrap elementor-element-populated">
											<div class="elementor-widget-wrap">
												<div
													class="elementor-element elementor-element-d329fa5 elementor-widget elementor-widget-button"
													data-id="d329fa5"
													data-element_type="widget"
													data-widget_type="button.default"
												>
													<div class="elementor-widget-container">
														<div class="elementor-button-wrapper">
															<a class="elementor-size-xs elementor-animation-shrink">
																<span
																	class="elementor-button-text"
																	style="font-size: large;font-weight: bold;">Keynote Speakers</span
																>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										class="elementor-element elementor-element-c474e3e elementor-column elementor-col-16 elementor-top-column"
										data-id="c474e3e"
										data-element_type="column"
									>
										<div class="elementor-column-wrap">
											<div class="elementor-widget-wrap" />
										</div>
									</div>
									{#each KeynoteInfo as speaker, index}
										<div
											class="elementor-element elementor-element-6395d6e elementor-column elementor-col-16 elementor-top-column"
											data-id="6395d6e"
											data-element_type="column"
										>
											<div class="elementor-column-wrap elementor-element-populated">
												<div class="elementor-widget-wrap">
													<div
														class="elementor-element elementor-element-5044f1e elementor-widget elementor-widget-button"
														data-id="5044f1e"
														data-element_type="widget"
														data-widget_type="button.default"
													>
														<div class="elementor-widget-container">
															<div class="elementor-button-wrapper">
																<a
																	href={'/program/' + index}
																	class="elementor-button-link elementor-button elementor-size-sm elementor-animation-shrink"
																	target="_self"
																	role="button"
																>
																	<span class="elementor-button-content-wrapper">
																		<span class="elementor-button-text">{speaker.name}</span>
																	</span>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</section>
						<section
							class="elementor-element elementor-element-d1b0439 elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section"
							data-id="d1b0439"
							data-element_type="section"
						>
							<div class="elementor-container elementor-column-gap-default">
								<div class="elementor-row">
									<div
										class="elementor-element elementor-element-8380caf elementor-column elementor-col-100 elementor-top-column"
										data-id="8380caf"
										data-element_type="column"
									>
										{#if KeynoteInfo[slug]}
											<KeynoteSpeaker
												affiliation={KeynoteInfo[slug].affiliation}
												heading={KeynoteInfo[slug].heading}
												name={KeynoteInfo[slug].name}
												image={KeynoteInfo[slug].image}
												url={KeynoteInfo[slug].url}
												body={KeynoteInfo[slug].body}
											/>
										{:else}
											<h3 style="text-align: center;">Select a Speaker</h3>
										{/if}
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
		<!-- .entry-content .clear -->
	</article>
	<!-- #post-## -->
</main>
