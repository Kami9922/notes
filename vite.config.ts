import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: 'Notes',
				short_name: 'Notes',
				start_url: '/',
				display: 'standalone',
				background_color: '#242424',
				icons: [
					{
						src: '/icons/favicon.ico',
						sizes: '48x48',
						type: 'ico',
					},
					{
						src: '/icons/192x192.png',
						sizes: '192x192',
						type: 'png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	server: {
		port: 3002,
		open: true,
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	publicDir: 'public',
})
