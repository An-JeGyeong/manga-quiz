declare global {
  interface Window {
    ReactNativeWebView?: unknown
  }
}

export function isAppInTossWebView() {
  return typeof window !== 'undefined' && Boolean(window.ReactNativeWebView)
}
