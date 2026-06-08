# manga-quiz

manga 취향 테스트 미니앱. 앱인토스(토스 WebView) 배포 목표.

## 스택
- Next.js 14 App Router + TypeScript + Tailwind CSS
- 상태: useState만 (DB 없음, 외부 API 없음)
- 배포: Vercel → 앱인토스 WebView로 임베드

## 자세한 내용은 여기서 찾아
- 점수 계산 · 타입 결정 로직 → docs/ARCHITECTURE.md
- 컴포넌트 규칙 · WebView 제약 → docs/FRONTEND.md
- 서비스 목적 · 유저 · 비즈니스 맥락 → docs/PRODUCT_SENSE.md

## 기계적으로 강제되는 규칙 (pre-commit이 차단)
- `any` 타입 금지
- `console.log` 커밋 금지
- `localStorage` / `sessionStorage` 사용 금지
- `router.back()` 사용 금지

## Claude-Codex 협업 프로토콜
- Claude Code: 설계 + 전체 구현 (Guide)
- Codex: 구현 완료 후 버그 탐지만, 코드 수정 금지 (Sensor)
- Codex 검증 트리거: 새 기능 완성 후 / 점수 로직 변경 후 / SDK 연동 후

## 하지 말 것
- 구현 방식은 네가 판단해
- 완벽한 하네스를 미리 설계하려 하지 마
- 규칙은 실패가 생겼을 때만 추가해
