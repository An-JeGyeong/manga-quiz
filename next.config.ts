import type { NextConfig } from "next";

const isTossBuild = process.env.BUILD_TARGET === 'toss';
const isDev = process.env.NODE_ENV !== 'production';

// 앱인토스 SDK 3.x WebView Origin. Access-Control-Allow-Origin은 단일 값만 허용되므로
// 요청 Origin 헤더와 일치할 때만 해당 Origin을 그대로 돌려준다.
const TOSS_ORIGINS = [
  'https://manga-quiz.apps.tossmini.com',
  'https://manga-quiz.private-apps.tossmini.com',
];

const nextConfig: NextConfig = {
  ...(isTossBuild ? { output: 'export' as const, distDir: 'dist/web' } : {}),
  images: {
    ...(isTossBuild ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/images/manga/**",
      },
    ],
  },
  // output: 'export'(토스 빌드)에서는 headers()가 동작하지 않으므로 Vercel 빌드에만 적용
  ...(isTossBuild
    ? {}
    : {
        async headers() {
          return TOSS_ORIGINS.map((origin) => ({
            source: '/:path*',
            has: [{ type: 'header' as const, key: 'origin', value: origin.replace(/\./g, '\\.') }],
            headers: [
              { key: 'Access-Control-Allow-Origin', value: origin },
              { key: 'Vary', value: 'Origin' },
            ],
          }));
        },
      }),
  // next dev는 Turbopack을 쓰므로 @apps-in-toss/devtools의 unplugin(webpack/vite 전용) 대신
  // resolve alias로 직접 SDK를 mock으로 치환한다. 프로덕션 빌드(next build)에는 적용되지 않는다.
  ...(isDev
    ? {
        turbopack: {
          resolveAlias: {
            '@apps-in-toss/web-framework': '@apps-in-toss/devtools/mock',
          },
        },
      }
    : {}),
};

export default nextConfig;
