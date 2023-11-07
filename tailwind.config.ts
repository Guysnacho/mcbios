import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			backgroundImage: {
				'hero': "url('src/lib/assets/2024_bg_brad-huchteman.jpg')",
			  }
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'hamlindigo',
						enhancements: true,
					},
					{
						name: 'gold-nouveau',
						enhancements: true,
					},
					{
						name: 'rocket',
						enhancements: true,
					},
					{
						name: 'modern',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
