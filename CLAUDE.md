# manga-quiz

manga 취향 테스트 미니앱. 앱인토스(토스 WebView) 배포 목표.

## 스택
- Next.js 14 App Router + TypeScript + Tailwind CSS
- 상태: useState만 (DB 없음, 외부 API 없음)
- 배포: Vercel → 앱인토스 WebView로 임베드

## 환경 변수
- `NEXT_PUBLIC_KAKAO_JS_KEY` — 카카오 공유 SDK(Kakao Share) JS 키 (lib/kakao.ts)

## 질문 데이터 구조
- data/questions.ts에 18문항(스토리 흐름 6단계 × 3개)을 정의
- 세션 시작마다 app/quiz/page.tsx에서 단계별로 2개씩 랜덤 선택 → 매번 12문항 진행
- 단계: 고르는 순간 → 1화 시작 → 중반부 → 클라이맥스 → 결말 → 다 읽고

## 추천 작품 피드백
- app/result/ResultView.tsx의 추천 작품 카드(works[1]~[3])에 👍 재밌었어요 / 👎 취향 아니었어요 버튼
- 클릭 시 lib/gtag.ts의 trackWorkFeedback(title, 'good' | 'bad')로 GA4 이벤트 전송, 재클릭 가능

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

## 검사 에이전트 (.claude/agents/)
Sensor 역할(코드 수정 없이 검사·보고만)을 Claude 쪽에서도 수행하는 읽기 전용 서브에이전트 3개:
- `bug-sensor` — PRODUCT_SENSE.md의 버그 탐지 체크리스트(타입·점수 엣지케이스·금지 API·null 처리·props 타입)를 수행하는 범용 검사
- `score-logic-reviewer` — 3축 점수·타입 결정 로직(data/questions.ts, lib/calcResult.ts)이 ARCHITECTURE.md 스펙과 일치하는지 검증
- `webview-policy-auditor` — 앱인토스 WebView 정책(금지 API, 외부 링크 이동) 위반 여부 감사

트리거 예시: "버그 검사해줘" / "점수 로직 검증해줘" / "앱인토스 정책 감사해줘"

## 하지 말 것
- 구현 방식은 네가 판단해
- 완벽한 하네스를 미리 설계하려 하지 마
- 규칙은 실패가 생겼을 때만 추가해
