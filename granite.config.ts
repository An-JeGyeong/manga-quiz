import { defineConfig } from '@apps-in-toss/web-framework/config'

export default defineConfig({
  appName: 'manga-quiz',
  brand: {
    displayName: 'manga 취향 테스트',
    primaryColor: '#D85A30',
    icon: './public/mascot.png',
  },
  permissions: [],
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'next dev',
      build: 'next build',
    },
  },
})
