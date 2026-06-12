# 프론트엔드

## 컴포넌트 규칙
- 'use client' 필요한 컴포넌트만 클라이언트 컴포넌트로
- props 타입은 반드시 명시 (인라인 타입 허용)
- 스타일은 Tailwind CSS만 (인라인 style 금지)

## 앱인토스 WebView 제약 (반드시 지킬 것)

### 금지 API
```ts
// 금지
router.back()         // → window.history.go(-1) 사용
window.open()         // → @apps-in-toss/web-framework의 openURL(url) 사용
localStorage          // → pre-commit이 차단
sessionStorage        // → pre-commit이 차단

// 허용
window.history.go(-1)
share({ message })    // @apps-in-toss/web-framework, 토스 네이티브 공유 시트
```

### 토스 브릿지 공유 연동
- `@apps-in-toss/web-framework`의 `share({ message })`만 사용 (텍스트 공유 시트, `title`/`url` 별도 필드 없음 — 메시지에 포함)
- 토스 WebView 여부는 `lib/webview.ts`의 `isAppInTossWebView()`(`window.ReactNativeWebView` 존재 여부)로 판단
- WebView 밖이거나 `share` 실패 시: `navigator.clipboard`로 링크 복사 폴백
```ts
// components/ShareCard.tsx
import { share } from '@apps-in-toss/web-framework'
import { isAppInTossWebView } from '@/lib/webview'

async function handleTossShare() {
  if (!isAppInTossWebView()) {
    copyShareUrl() // navigator.clipboard.writeText(shareUrl)
    return
  }
  try {
    await share({ message: `${title}\n${quote}\n${shareUrl}` })
  } catch {
    copyShareUrl()
  }
}
```

### 이미지 저장 / 카카오 공유
- 미지원: DOM 캡처(html2canvas) 및 카카오 전용 공유 API는 앱인토스 SDK에 없어 제거됨
- 카카오톡 공유는 "토스로 공유하기"의 네이티브 공유 시트(OS 공유 대상에 카카오톡 포함)로 대체

## 화면 구성 및 UX 규칙

### 질문 화면 (/quiz)
- 선택지 탭 후 420ms 딜레이 → 자동 다음 질문 전환
- 상단 프로그레스 바: 현재 / 전체 + 퍼센트 동시 표시
- 하단 도트 인디케이터: 완료=코랄, 현재=wide pill, 미완료=회색
- "건너뛰기" 버튼 제공 (이탈률 감소 목적)
- 뒤로가기: window.history.go(-1)

### 결과 화면 (/result)
- 히어로 영역: 코랄(#FAECE7) 배경, 타입명 + 한 줄 설명
- 취향 스탯: 강도 / 관계 / 세계관 / 성장 4개 바 차트
- 공유 카드: 앰버(#FAEEDA) 배경, 스탯 2×2 그리드 + 추천 작품 3개
- 추천 작품: 일치율(%) 표시, 클릭 시 망가 플랫폼 연결 (4단계 연계)
- 공유 버튼 순서: 토스로 공유하기 → 링크 복사하기

## 컬러 토큰
```
코랄 배경: #FAECE7  텍스트: #712B13  강조: #D85A30
앰버 배경: #FAEEDA  텍스트: #633806
강도 바:   #D85A30
관계 바:   #1D9E75
세계관 바: #7F77DD
성장 바:   #BA7517
```
