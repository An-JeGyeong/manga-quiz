# 아키텍처

## 디렉토리 구조
```
app/
  page.tsx          # 메인 (테스트 시작)
  quiz/page.tsx     # 질문 진행 화면
  result/page.tsx   # 결과 + 공유 카드
components/
  ProgressBar.tsx
  AnswerButton.tsx
  StatBar.tsx
  ShareCard.tsx
data/
  questions.ts      # 12문항 정의
  types.ts          # 결과 타입 8개 정의
lib/
  calcResult.ts     # 3축 점수 → 타입 결정 (핵심 로직)
```

## 3축 점수 구조
```ts
type Scores = {
  intensity: number  // 강도: 하드코어(+) ↔ 라이트(-)
  relation:  number  // 관계: 관계형(+)   ↔ 개인형(-)
  world:     number  // 세계: 판타지(+)   ↔ 현실(-)
}
```

## 타입 결정 로직 (lib/calcResult.ts)
```ts
export function calcType(scores: Scores): ResultType {
  const i = scores.intensity > 0 ? 'H' : 'L'
  const r = scores.relation  > 0 ? 'R' : 'S'
  const w = scores.world     > 0 ? 'F' : 'E'
  return TYPE_MAP[`${i}${r}${w}`]
}

const TYPE_MAP = {
  HRF: '성장에 목마른 모험가',   // 강도↑ 관계↑ 판타지↑
  HSF: '폭풍 같은 먼치킨러',     // 강도↑ 개인↑ 판타지↑
  HRE: '감정선에 진심인 사람',   // 강도↑ 관계↑ 현실↑
  HSE: '두뇌전 중독 전략가',     // 강도↑ 개인↑ 현실↑
  LRF: '판타지 로맨스 감수성러', // 라이트 관계↑ 판타지↑
  LSF: '세계관 덕후 설계자',     // 라이트 개인↑ 판타지↑
  LRE: '일상 속 힐링 수집가',   // 라이트 관계↑ 현실↑
  LSE: '현실 공감 스토리텔러',   // 라이트 개인↑ 현실↑
}
```

## 엣지케이스 (Codex가 집중 검증할 부분)
- 세 축이 모두 정확히 0일 때 → 'LSE'로 떨어짐. 의도된 동작.
- 12문항 중 일부를 건너뛰면 0에 가까워짐 → 위와 동일하게 처리.

## 질문 데이터 구조 (data/questions.ts)
```ts
export type Answer = {
  text: string
  scores: Partial<Scores>  // 언급 안 된 축은 0으로 처리
}

export type Question = {
  id: number
  text: string
  axis: ('intensity' | 'relation' | 'world')[]  // 관련 축 명시
  answers: Answer[]
}
```

## 결과 타입 데이터 구조 (data/types.ts)
```ts
export type ResultType = {
  key: string          // 'HRF' 등 3글자 키
  name: string         // 표시 이름
  quote: string        // 공유용 한 줄 설명
  works: Work[]        // 추천 작품 (최대 4개)
  statBars: StatBar[]  // 스탯 바 표시값 (0~100)
}
```

## 라우팅 흐름
```
/ (메인)
  → /quiz (질문 12개, useState로 scores 누적)
    → /result?type=HRF&i=8&r=6&w=9 (쿼리로 점수 전달)
```

## 점수 계산 규칙
- 각 질문당 선택지별 scores는 -2 ~ +2 범위
- 12문항 완료 시 각 축 점수 범위 (18문항 풀 기준 이론상 최대/최소)
  - intensity: -22 ~ +23
  - relation:  -11 ~ +23
  - world:     -7  ~ +23
- calcResult.ts 외부에서 점수 계산 로직 작성 금지
