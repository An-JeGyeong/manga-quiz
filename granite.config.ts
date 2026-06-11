import { defineConfig } from '@apps-in-toss/web-framework/config'

export default defineConfig({
  appName: 'manga-quiz',
  brand: {
    displayName: '일본 만화 취향 테스트',
    primaryColor: '#D85A30',
    icon: './public/mascot.png',
  },
  permissions: [],
  outdir: 'dist',
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'next dev',
      build: 'next build',
    },
  },
})
