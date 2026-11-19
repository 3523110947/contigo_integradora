import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza el Service Worker automáticamente
      injectRegister: 'auto',     // Inyecta el registro del SW en el HTML
      devOptions: {
        enabled: true             // Permite que el SW funcione en desarrollo (localhost)
      },
      manifest: {
        name: 'Contigo App',
        short_name: 'Contigo',
        description: 'PWA de ayuda inmediata y empoderamiento contra el ciberacoso.',
        theme_color: '#8B5CF6',
        background_color: '#F8F6FC',
        display: 'standalone',    // Para que se abra como app nativa
        start_url: '/',
        icons: [
          {
            src: 'logo1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})