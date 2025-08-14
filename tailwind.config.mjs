/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./index.html',
	],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.25' },
				},
					flipDownOld: {
						'0%': { transform: 'translateY(0%) rotateX(0deg)', opacity: '1' },
						'100%': { transform: 'translateY(100%) rotateX(15deg)', opacity: '0.6' },
					},
					flipDownNew: {
						'0%': { transform: 'translateY(-100%) rotateX(-15deg)', opacity: '0.6' },
						'100%': { transform: 'translateY(0%) rotateX(0deg)', opacity: '1' },
					},
			},
			animation: {
					blink: 'blink 900ms steps(2, start) infinite',
					flipOld: 'flipDownOld 350ms ease-in forwards',
					flipNew: 'flipDownNew 350ms ease-out forwards',
			},
		},
	},
	plugins: [],
}


