<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>MCBIOS19</title>
	<link rel="dns-prefetch" href="http://fonts.googleapis.com/" />
	<link rel="dns-prefetch" href="http://s.w.org/" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="MCBIOS19 » Feed"
		href="http://mcbios2019.mcbios.com/?feed=rss2"
	/>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="MCBIOS19 » Comments Feed"
		href="http://mcbios2019.mcbios.com/?feed=comments-rss2"
	/>
	<script type="text/javascript">
		window._wpemojiSettings = {
			baseUrl: 'https://s.w.org/images/core/emoji/11.2.0/72x72/',
			ext: '.png',
			svgUrl: 'https://s.w.org/images/core/emoji/11.2.0/svg/',
			svgExt: '.svg',
			source: {
				concatemoji:
					'http://mcbios2019.mcbios.com/wp-includes/js/wp-emoji-release.min.js?ver=5.1.17'
			}
		};
		!(function (e, a, t) {
			var n,
				r,
				o,
				i = a.createElement('canvas'),
				p = i.getContext && i.getContext('2d');
			function s(e, t) {
				var a = String.fromCharCode;
				p.clearRect(0, 0, i.width, i.height), p.fillText(a.apply(this, e), 0, 0);
				e = i.toDataURL();
				return (
					p.clearRect(0, 0, i.width, i.height),
					p.fillText(a.apply(this, t), 0, 0),
					e === i.toDataURL()
				);
			}
			function c(e) {
				var t = a.createElement('script');
				(t.src = e),
					(t.defer = t.type = 'text/javascript'),
					a.getElementsByTagName('head')[0].appendChild(t);
			}
			for (
				o = Array('flag', 'emoji'),
					t.supports = { everything: !0, everythingExceptFlag: !0 },
					r = 0;
				r < o.length;
				r++
			)
				(t.supports[o[r]] = (function (e) {
					if (!p || !p.fillText) return !1;
					switch (((p.textBaseline = 'top'), (p.font = '600 32px Arial'), e)) {
						case 'flag':
							return s([55356, 56826, 55356, 56819], [55356, 56826, 8203, 55356, 56819])
								? !1
								: !s(
										[
											55356, 57332, 56128, 56423, 56128, 56418, 56128, 56421, 56128, 56430, 56128,
											56423, 56128, 56447
										],
										[
											55356, 57332, 8203, 56128, 56423, 8203, 56128, 56418, 8203, 56128, 56421,
											8203, 56128, 56430, 8203, 56128, 56423, 8203, 56128, 56447
										]
								  );
						case 'emoji':
							return !s([55358, 56760, 9792, 65039], [55358, 56760, 8203, 9792, 65039]);
					}
					return !1;
				})(o[r])),
					(t.supports.everything = t.supports.everything && t.supports[o[r]]),
					'flag' !== o[r] &&
						(t.supports.everythingExceptFlag = t.supports.everythingExceptFlag && t.supports[o[r]]);
			(t.supports.everythingExceptFlag = t.supports.everythingExceptFlag && !t.supports.flag),
				(t.DOMReady = !1),
				(t.readyCallback = function () {
					t.DOMReady = !0;
				}),
				t.supports.everything ||
					((n = function () {
						t.readyCallback();
					}),
					a.addEventListener
						? (a.addEventListener('DOMContentLoaded', n, !1), e.addEventListener('load', n, !1))
						: (e.attachEvent('onload', n),
						  a.attachEvent('onreadystatechange', function () {
								'complete' === a.readyState && t.readyCallback();
						  })),
					(n = t.source || {}).concatemoji
						? c(n.concatemoji)
						: n.wpemoji && n.twemoji && (c(n.twemoji), c(n.wpemoji)));
		})(window, document, window._wpemojiSettings);
	</script>
	<script
		src="/assets/MCBIOS19_files/wp-emoji-release.min.js.download"
		type="text/javascript"
		defer
	></script>
	<style type="text/css">
		img.wp-smiley,
		img.emoji {
			display: inline !important;
			border: none !important;
			box-shadow: none !important;
			height: 1em !important;
			width: 1em !important;
			margin: 0 0.07em !important;
			vertical-align: -0.1em !important;
			background: none !important;
			padding: 0 !important;
		}
	</style>
	<link
		rel="stylesheet"
		id="astra-theme-css-css"
		href="/assets/MCBIOS19_files/style.min.css"
		type="text/css"
		media="all"
	/>
	<style id="astra-theme-css-inline-css" type="text/css">
		html {
			font-size: 93.75%;
		}
		a,
		.page-title {
			color: #006608;
		}
		a:hover,
		a:focus {
			color: #47e855;
		}
		body,
		button,
		input,
		select,
		textarea {
			font-family: 'Open Sans', sans-serif;
			font-weight: 400;
			font-size: 15px;
			font-size: 1rem;
		}
		blockquote {
			border-color: rgba(0, 102, 8, 0.05);
		}
		.site-title {
			font-size: 35px;
			font-size: 2.3333333333333rem;
		}
		header .site-logo-img .custom-logo-link img {
			max-width: 165px;
		}
		.astra-logo-svg {
			width: 165px;
		}
		.ast-archive-description .ast-archive-title {
			font-size: 40px;
			font-size: 2.6666666666667rem;
		}
		.site-header .site-description {
			font-size: 15px;
			font-size: 1rem;
		}
		.entry-title {
			font-size: 30px;
			font-size: 2rem;
		}
		.comment-reply-title {
			font-size: 24px;
			font-size: 1.6rem;
		}
		.ast-comment-list #cancel-comment-reply-link {
			font-size: 15px;
			font-size: 1rem;
		}
		h1,
		.entry-content h1 {
			font-size: 48px;
			font-size: 3.2rem;
		}
		h2,
		.entry-content h2 {
			font-size: 42px;
			font-size: 2.8rem;
		}
		h3,
		.entry-content h3 {
			font-size: 30px;
			font-size: 2rem;
		}
		h4,
		.entry-content h4 {
			font-size: 20px;
			font-size: 1.3333333333333rem;
		}
		h5,
		.entry-content h5 {
			font-size: 18px;
			font-size: 1.2rem;
		}
		h6,
		.entry-content h6 {
			font-size: 15px;
			font-size: 1rem;
		}
		.ast-single-post .entry-title,
		.page-title {
			font-size: 30px;
			font-size: 2rem;
		}
		#secondary,
		#secondary button,
		#secondary input,
		#secondary select,
		#secondary textarea {
			font-size: 15px;
			font-size: 1rem;
		}
		::selection {
			background-color: #000000;
			color: #ffffff;
		}
		body,
		h1,
		.entry-title a,
		.entry-content h1,
		h2,
		.entry-content h2,
		h3,
		.entry-content h3,
		h4,
		.entry-content h4,
		h5,
		.entry-content h5,
		h6,
		.entry-content h6 {
			color: #000000;
		}
		.tagcloud a:hover,
		.tagcloud a:focus,
		.tagcloud a.current-item {
			color: #ffffff;
			border-color: #006608;
			background-color: #006608;
		}
		.main-header-menu a,
		.ast-header-custom-item a {
			color: #000000;
		}
		.main-header-menu li:hover > a,
		.main-header-menu li:hover > .ast-menu-toggle,
		.main-header-menu .ast-masthead-custom-menu-items a:hover,
		.main-header-menu li.focus > a,
		.main-header-menu li.focus > .ast-menu-toggle,
		.main-header-menu .current-menu-item > a,
		.main-header-menu .current-menu-ancestor > a,
		.main-header-menu .current_page_item > a,
		.main-header-menu .current-menu-item > .ast-menu-toggle,
		.main-header-menu .current-menu-ancestor > .ast-menu-toggle,
		.main-header-menu .current_page_item > .ast-menu-toggle {
			color: #006608;
		}
		input:focus,
		input[type='text']:focus,
		input[type='email']:focus,
		input[type='url']:focus,
		input[type='password']:focus,
		input[type='reset']:focus,
		input[type='search']:focus,
		textarea:focus {
			border-color: #006608;
		}
		input[type='radio']:checked,
		input[type='reset'],
		input[type='checkbox']:checked,
		input[type='checkbox']:hover:checked,
		input[type='checkbox']:focus:checked,
		input[type='range']::-webkit-slider-thumb {
			border-color: #006608;
			background-color: #006608;
			box-shadow: none;
		}
		.site-footer a:hover + .post-count,
		.site-footer a:focus + .post-count {
			background: #006608;
			border-color: #006608;
		}
		.ast-small-footer {
			color: #ffffff;
		}
		.ast-small-footer > .ast-footer-overlay {
			background-color: #000000;
		}
		.ast-small-footer a {
			color: #ffffff;
		}
		.ast-small-footer a:hover {
			color: #27890f;
		}
		.ast-comment-meta {
			line-height: 1.666666667;
			font-size: 12px;
			font-size: 0.8rem;
		}
		.single .nav-links .nav-previous,
		.single .nav-links .nav-next,
		.single .ast-author-details .author-title,
		.ast-comment-meta {
			color: #006608;
		}
		.menu-toggle,
		button,
		.ast-button,
		.button,
		input#submit,
		input[type='button'],
		input[type='submit'],
		input[type='reset'] {
			border-radius: 2px;
			padding: 10px 40px;
			color: #ffffff;
			border-color: #000000;
			background-color: #000000;
		}
		button:focus,
		.menu-toggle:hover,
		button:hover,
		.ast-button:hover,
		.button:hover,
		input[type='reset']:hover,
		input[type='reset']:focus,
		input#submit:hover,
		input#submit:focus,
		input[type='button']:hover,
		input[type='button']:focus,
		input[type='submit']:hover,
		input[type='submit']:focus {
			color: #000000;
			border-color: #47e855;
			background-color: #47e855;
		}
		.entry-meta,
		.entry-meta * {
			line-height: 1.45;
			color: #006608;
		}
		.entry-meta a:hover,
		.entry-meta a:hover *,
		.entry-meta a:focus,
		.entry-meta a:focus * {
			color: #47e855;
		}
		blockquote,
		blockquote a {
			color: #000000;
		}
		.ast-404-layout-1 .ast-404-text {
			font-size: 200px;
			font-size: 13.333333333333rem;
		}
		.widget-title {
			font-size: 21px;
			font-size: 1.4rem;
			color: #000000;
		}
		#cat option,
		.secondary .calendar_wrap thead a,
		.secondary .calendar_wrap thead a:visited {
			color: #006608;
		}
		.secondary .calendar_wrap #today,
		.ast-progress-val span {
			background: #006608;
		}
		.secondary a:hover + .post-count,
		.secondary a:focus + .post-count {
			background: #006608;
			border-color: #006608;
		}
		.calendar_wrap #today > a {
			color: #ffffff;
		}
		.ast-pagination a,
		.page-links .page-link,
		.single .post-navigation a {
			color: #006608;
		}
		.ast-pagination a:hover,
		.ast-pagination a:focus,
		.ast-pagination > span:hover:not(.dots),
		.ast-pagination > span.current,
		.page-links > .page-link,
		.page-links .page-link:hover,
		.post-navigation a:hover {
			color: #47e855;
		}
		.ast-header-break-point .ast-mobile-menu-buttons-minimal.menu-toggle {
			background: transparent;
			color: #000000;
		}
		.ast-header-break-point .ast-mobile-menu-buttons-outline.menu-toggle {
			background: transparent;
			border: 1px solid #000000;
			color: #000000;
		}
		.ast-header-break-point .ast-mobile-menu-buttons-fill.menu-toggle {
			background: #000000;
		}
		@media (min-width: 545px) {
			.ast-page-builder-template .comments-area,
			.single.ast-page-builder-template .entry-header,
			.single.ast-page-builder-template .post-navigation {
				max-width: 1240px;
				margin-left: auto;
				margin-right: auto;
			}
		}
		@media (max-width: 768px) {
			.ast-archive-description .ast-archive-title {
				font-size: 40px;
			}
			.entry-title {
				font-size: 30px;
			}
			h1,
			.entry-content h1 {
				font-size: 30px;
			}
			h2,
			.entry-content h2 {
				font-size: 25px;
			}
			h3,
			.entry-content h3 {
				font-size: 20px;
			}
			.ast-single-post .entry-title,
			.page-title {
				font-size: 30px;
			}
		}
		@media (max-width: 544px) {
			.ast-archive-description .ast-archive-title {
				font-size: 40px;
			}
			.entry-title {
				font-size: 30px;
			}
			h1,
			.entry-content h1 {
				font-size: 30px;
			}
			h2,
			.entry-content h2 {
				font-size: 25px;
			}
			h3,
			.entry-content h3 {
				font-size: 20px;
			}
			.ast-single-post .entry-title,
			.page-title {
				font-size: 30px;
			}
		}
		@media (max-width: 768px) {
			html {
				font-size: 85.5%;
			}
		}
		@media (max-width: 544px) {
			html {
				font-size: 85.5%;
			}
		}
		@media (min-width: 769px) {
			.ast-container {
				max-width: 1240px;
			}
		}
		@font-face {
			font-family: 'Astra';
			src: url(http://mcbios2019.mcbios.com/wp-content/themes/astra/assets/fonts/astra.woff)
					format('woff'),
				url(http://mcbios2019.mcbios.com/wp-content/themes/astra/assets/fonts/astra.ttf)
					format('truetype'),
				url(http://mcbios2019.mcbios.com/wp-content/themes/astra/assets/fonts/astra.svg#astra)
					format('svg');
			font-weight: normal;
			font-style: normal;
		}
		@media (max-width: 921px) {
			.main-header-bar .main-header-bar-navigation {
				display: none;
			}
		}
		.ast-desktop .main-header-menu.submenu-with-border .sub-menu,
		.ast-desktop .main-header-menu.submenu-with-border .children,
		.ast-desktop .main-header-menu.submenu-with-border .astra-full-megamenu-wrapper {
			border-color: #000000;
		}
		.ast-desktop .main-header-menu.submenu-with-border .sub-menu,
		.ast-desktop .main-header-menu.submenu-with-border .children {
			border-top-width: 2px;
			border-right-width: 0px;
			border-left-width: 0px;
			border-bottom-width: 0px;
			border-style: solid;
		}
		.ast-desktop .main-header-menu.submenu-with-border .sub-menu .sub-menu,
		.ast-desktop .main-header-menu.submenu-with-border .children .children {
			top: -2px;
		}
		.ast-desktop .main-header-menu.submenu-with-border .sub-menu a,
		.ast-desktop .main-header-menu.submenu-with-border .children a {
			border-bottom-width: 0px;
			border-style: solid;
			border-color: #eaeaea;
		}
		@media (min-width: 769px) {
			.main-header-menu .sub-menu li.ast-left-align-sub-menu:hover > ul,
			.main-header-menu .sub-menu li.ast-left-align-sub-menu.focus > ul {
				margin-left: -0px;
			}
		}
		.ast-small-footer {
			border-top-style: solid;
			border-top-width: 4px;
			border-top-color: #ffffff;
		}
		@media (max-width: 920px) {
			.ast-404-layout-1 .ast-404-text {
				font-size: 100px;
				font-size: 6.6666666666667rem;
			}
		}
		.ast-header-break-point .site-header {
			border-bottom-width: 1px;
			border-bottom-color: #17289b;
		}
		@media (min-width: 769px) {
			.main-header-bar {
				border-bottom-width: 1px;
				border-bottom-color: #17289b;
			}
		}
		.main-header-menu .menu-item,
		.main-header-bar .ast-masthead-custom-menu-items {
			-js-display: flex;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-moz-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			-moz-box-orient: vertical;
			-moz-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
		}
		.main-header-menu > .menu-item > a {
			height: 100%;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-moz-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-js-display: flex;
			display: flex;
		}
	</style>
	<link
		rel="stylesheet"
		id="astra-google-fonts-css"
		href="/assets/MCBIOS19_files/css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="astra-menu-animation-css"
		href="/assets/MCBIOS19_files/menu-animation.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="wp-block-library-css"
		href="/assets/MCBIOS19_files/style(1).min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="wpda_countdown_gutenberg_css-css"
		href="/assets/MCBIOS19_files/style.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-icons-css"
		href="/assets/MCBIOS19_files/elementor-icons.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="font-awesome-css"
		href="/assets/MCBIOS19_files/font-awesome.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-animations-css"
		href="/assets/MCBIOS19_files/animations.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-frontend-css"
		href="/assets/MCBIOS19_files/frontend.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-pro-css"
		href="/assets/MCBIOS19_files/frontend(1).min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-global-css"
		href="/assets/MCBIOS19_files/global.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="elementor-post-22-css"
		href="/assets/MCBIOS19_files/post-22.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="google-fonts-1-css"
		href="/assets/MCBIOS19_files/css(1)"
		type="text/css"
		media="all"
	/>
	<meta name="generator" content="WordPress 5.1.17" />
	<link rel="canonical" href="/" />
	<link rel="shortlink" href="/" />
	<style type="text/css">
		.recentcomments a {
			display: inline !important;
			padding: 0 !important;
			margin: 0 !important;
		}
	</style>

	<link
		rel="stylesheet"
		id="countdown_css-css"
		href="/assets/MCBIOS19_files/style(1).css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="dashicons-css"
		href="/assets/MCBIOS19_files/dashicons.min.css"
		type="text/css"
		media="all"
	/>
	<link
		rel="stylesheet"
		id="thickbox-css"
		href="/assets/MCBIOS19_files/thickbox.css"
		type="text/css"
		media="all"
	/>
	<script type="text/javascript">
		/* <![CDATA[ */
		var astra = { break_point: '921', isRtl: '' };
		/* ]]> */
	</script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/style.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/wp-embed.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/front_end_js.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/jquery.js.download"></script>
	<script
		type="text/javascript"
		src="/assets/MCBIOS19_files/jquery-migrate.min.js.download"
	></script>
	<script type="text/javascript">
		/* <![CDATA[ */
		var thickboxL10n = {
			next: 'Next >',
			prev: '< Prev',
			image: 'Image',
			of: 'of',
			close: 'Close',
			noiframes:
				'This feature requires inline frames. You have iframes disabled or your browser does not support them.',
			loadingAnimation: 'http://mcbios2019.mcbios.com/wp-includes/js/thickbox/loadingAnimation.gif'
		};
		/* ]]> */
	</script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/thickbox.js.download"></script>
	<script
		type="text/javascript"
		src="/assets/MCBIOS19_files/frontend-modules.min.js.download"
	></script>
	<script
		type="text/javascript"
		src="/assets/MCBIOS19_files/jquery.sticky.min.js.download"
	></script>
	<script type="text/javascript">
		var ElementorProFrontendConfig = {
			ajaxurl: 'http://mcbios2019.mcbios.com/wp-admin/admin-ajax.php',
			nonce: 'c8c1ff9a9b',
			shareButtonsNetworks: {
				facebook: { title: 'Facebook', has_counter: true },
				twitter: { title: 'Twitter' },
				google: { title: 'Google+', has_counter: true },
				linkedin: { title: 'LinkedIn', has_counter: true },
				pinterest: { title: 'Pinterest', has_counter: true },
				reddit: { title: 'Reddit', has_counter: true },
				vk: { title: 'VK', has_counter: true },
				odnoklassniki: { title: 'OK', has_counter: true },
				tumblr: { title: 'Tumblr' },
				delicious: { title: 'Delicious' },
				digg: { title: 'Digg' },
				skype: { title: 'Skype' },
				stumbleupon: { title: 'StumbleUpon', has_counter: true },
				telegram: { title: 'Telegram' },
				pocket: { title: 'Pocket', has_counter: true },
				xing: { title: 'XING', has_counter: true },
				whatsapp: { title: 'WhatsApp' },
				email: { title: 'Email' },
				print: { title: 'Print' }
			},
			facebook_sdk: { lang: 'en_US', app_id: '' }
		};
	</script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/frontend.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/position.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/dialog.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/waypoints.min.js.download"></script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/swiper.min.js.download"></script>
	<script type="text/javascript">
		var elementorFrontendConfig = {
			environmentMode: { edit: false, wpPreview: false },
			is_rtl: false,
			breakpoints: { xs: 0, sm: 480, md: 768, lg: 1025, xl: 1440, xxl: 1600 },
			version: '2.5.14',
			urls: {
				assets: 'http://mcbios2019.mcbios.com/wp-content/plugins/elementor/assets/'
			},
			settings: {
				page: [],
				general: {
					elementor_global_image_lightbox: 'yes',
					elementor_enable_lightbox_in_editor: 'yes'
				}
			},
			post: { id: 22, title: 'Home', excerpt: '' }
		};
	</script>
	<script type="text/javascript" src="/assets/MCBIOS19_files/frontend.min(1).js.download"></script>
</svelte:head>

<Nav />
<div id="page" class="hfeed site">
	<div id="content" class="site-content">
		<div class="ast-container">
			<slot />
		</div>
	</div>
</div>
<span id="elementor-device-mode" class="elementor-screen-only" />
<Footer />
