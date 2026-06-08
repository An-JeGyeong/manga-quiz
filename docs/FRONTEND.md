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
window.open()         // → bridge.openExternalBrowser(url) 사용
localStorage          // → pre-commit이 차단
sessionStorage        // → pre-commit이 차단

// 허용
window.history.go(-1)
window.toss?.share({ title, text, url })  // 토스 네이티브 공유
```

### 토스 브릿지 공유 연동
```ts
// components/ShareCard.tsx
function handleTossShare() {
  if (window.toss?.share) {
    window.toss.share({
      title: '내 manga 취향은?',
      text: resultType.quote,
      url: `https://manga-quiz.vercel.app/result?type=${typeKey}`,
    })
  } else {
    // 앱 밖에서 접근 시 fallback: 클립보드 복사
    navigator.clipboard.writeText(shareUrl)
  }
}
```

### 이미지 저장 (공유 카드)
```ts
// html2canvas로 ShareCard 컴포넌트 캡처 후 PNG 다운로드
import html2canvas from 'html2canvas'

async function saveCardImage(ref: RefObject<HTMLDivElement>) {
  const canvas = await html2canvas(ref.current!)
  const link = document.createElement('a')
  link.download = 'manga-result.png'
  link.href = canvas.toDataURL()
  link.click()
}
```

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
- 공유 버튼 순서: 토스 → 카카오 → 인스타 스토리 → 링크 복사

## 컬러 토큰
```
코랄 배경: #FAECE7  텍스트: #712B13  강조: #D85A30
앰버 배경: #FAEEDA  텍스트: #633806
강도 바:   #D85A30
관계 바:   #1D9E75
세계관 바: #7F77DD
성장 바:   #BA7517
```
