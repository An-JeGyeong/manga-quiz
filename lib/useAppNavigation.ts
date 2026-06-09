import { useEffect, useLayoutEffect, useRef } from 'react'
import { graniteEvent, closeView } from '@apps-in-toss/web-framework'

export function useRootNavigation() {
  useEffect(() => {
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
    return graniteEvent.addEventListener('backEvent', {
      onEvent: () => { onBackRef.current() },
    })
  }, [])
}
