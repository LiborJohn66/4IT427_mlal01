import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['Filmy_na_cviku/**', 'node_modules/**', 'dist/**'],
  },
})
