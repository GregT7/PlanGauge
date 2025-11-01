import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: path.resolve(__dirname, '..'), // points to src/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
          provider: 'v8',
          exclude: [
            './eslint.config.js',
            './tailwind.config.js',
            './vite.config.js',
            './src/main.jsx',
            'src/components/ui/**',
            'e2e/**',
            'node_modules/**',
            'dist/**',
            'playwright-report/**',
            'test-results/**'
          ],
        },
      },

})

