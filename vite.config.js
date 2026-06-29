import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'Temple';
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : `/${repoName}/`,
    server: {
      port: 5180,
      strictPort: true,
    },
  };
})

