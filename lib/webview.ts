declare global {
  interface Window {
    ReactNativeWebView?: unknown
    // @apps-in-toss/devtools 목업 패널이 마운트되면 생기는 전역 (dev 전용, 프로덕션에는 존재하지 않음)
    __ait?: unknown
  }
}

export function isAppInTossWebView() {
  if (typeof window === 'undefined') return false
  // 실기기 WebView(ReactNativeWebView) 또는 로컬 devtools 목업(__ait) 중 하나라도 있으면
  // 웹뷰 전용 SDK 경로(backEvent 구독, share 등)를 그대로 테스트할 수 있게 한다
  return Boolean(window.ReactNativeWebView) || Boolean(window.__ait)
}
