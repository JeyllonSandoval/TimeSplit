import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), tailwind({
		applyBaseStyles: true,
	})],
	vite: {
		resolve: {
			alias: {
				'~': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},
});


