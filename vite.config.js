import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Serves /images/* directly from the project-root images/ folder during dev.
// For production, deploy the images/ folder alongside the dist/ output.
function serveImages() {
  return {
    name: 'serve-images',
    configureServer(server) {
      server.middlewares.use('/images', (req, res, next) => {
        const filePath = path.join(process.cwd(), 'images', req.url)
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase()
          const mime = {
            '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.png': 'image/png',  '.webp': 'image/webp', '.gif': 'image/gif',
          }
          res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveImages()],
})
