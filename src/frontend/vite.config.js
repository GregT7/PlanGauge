import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
    coverage: {
          provider: 'v8',
          exclude: [
            // Existing excludes...
            'src/components/TestTable2.jsx',
            './eslint.config.js',
            './tailwind.config.js',
            './vite.config.js',
            './src/main.jsx',
            'src/components/ui/**'
          ],
        },
      },

})

