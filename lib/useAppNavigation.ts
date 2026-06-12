'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { graniteEvent, closeView } from '@apps-in-toss/web-framework'
import { isAppInTossWebView } from '@/lib/webview'

export function useRootNavigation() {
  useEffect(() => {
    if (!isAppInTossWebView()) return

    return graniteEvent.addEventListener('backEvent', {
      onEvent: () => { void closeView() },
    })
  }, [])
}

export function usePageNavigation(onBack: () => void) {
  const onBackRef = useRef(onBack)

  // DOM 커밋 직후 동기 갱신 — backEvent와 effect 실행 사이 경합 방지
  useLayoutEffect(() => {
    onBackRef.current = onBack
  }, [onBack])

  useEffect(() => {
    if (!isAppInTossWebView()) return

    return graniteEvent.addEventListener('backEvent', {
      onEvent: () => { onBackRef.current() },
    })
  }, [])
}
