'use client'

import { useEffect } from 'react'

// 우하단 AIT 패널 — @apps-in-toss/devtools의 unplugin이 Turbopack을 지원하지 않아
// 자동 주입이 안 되므로 dev 빌드에서만 직접 import해 마운트한다.
export default function DevtoolsPanel() {
  useEffect(() => {
    import('@apps-in-toss/devtools/panel')
  }, [])

  return null
}
