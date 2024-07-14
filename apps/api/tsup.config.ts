import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entryPoints: ['src/presentation/server.ts'],
  clean: true,
  format: ['cjs'],
  ...options,
}))
