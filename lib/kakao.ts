const SHARE_BASE_URL = 'https://manga-quiz.vercel.app'
const OG_IMAGE_URL = `${SHARE_BASE_URL}/og-placeholder.svg`

type KakaoLink = {
  webUrl?: string
  mobileWebUrl?: string
}

type KakaoFeedTemplate = {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: KakaoLink
  }
  buttons?: Array<{
    title: string
    link: KakaoLink
  }>
}

type KakaoSDK = {
  init: (jsKey: string) => void
  isInitialized: () => boolean
  Share: {
    sendDefault: (template: KakaoFeedTemplate) => void
  }
}

declare global {
  interface Window {
    Kakao?: KakaoSDK
  }
}

export function initKakao(): boolean {
  if (typeof window === 'undefined' || !window.Kakao) return false
  if (window.Kakao.isInitialized()) return true

  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY
  if (!jsKey) return false

  try {
    window.Kakao.init(jsKey)
    return window.Kakao.isInitialized()
  } catch {
    return false
  }
}

export function shareToKakao(resultTypeName: string, quote: string, typeKey: string): boolean {
  if (typeof window === 'undefined' || !window.Kakao?.isInitialized()) return false

  const link: KakaoLink = {
    webUrl: `${SHARE_BASE_URL}/result?type=${typeKey}`,
    mobileWebUrl: `${SHARE_BASE_URL}/result?type=${typeKey}`,
  }

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${resultTypeName} | manga 취향 테스트`,
        description: quote,
        imageUrl: OG_IMAGE_URL,
        link,
      },
      buttons: [
        {
          title: '결과 보러가기',
          link,
        },
      ],
    })
    return true
  } catch {
    return false
  }
}
