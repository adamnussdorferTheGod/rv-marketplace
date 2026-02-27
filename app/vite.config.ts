import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, '.'),
        '@components': path.resolve(__dirname, '../components'),
        'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl'),
      },
      dedupe: ['react', 'react-dom', 'react-router-dom', 'motion'],
    },
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: () => '/v1/messages',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.VITE_ANTHROPIC_API_KEY || ''
              if (key) {
                proxyReq.setHeader('x-api-key', key)
              }
              proxyReq.setHeader('anthropic-version', '2023-06-01')
            })
          },
        },
      },
    },
  }
})
