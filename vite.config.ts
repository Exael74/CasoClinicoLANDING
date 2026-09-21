import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project from /CasoClinicoLANDING/, while
  // Vercel serves it from the domain root — GITHUB_PAGES is set only in
  // the Pages workflow (see .github/workflows/deploy.yml).
  base: process.env.GITHUB_PAGES ? "/CasoClinicoLANDING/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
