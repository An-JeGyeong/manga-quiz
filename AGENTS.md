# manga-quiz Codex 에이전트

## 역할
버그 탐지만. 코드 수정 금지.

## 검사 항목
1. TypeScript 타입 불일치
2. scores 세 축이 모두 0일 때 타입 결정 처리
3. router.back() / localStorage / window.open() 사용 여부
4. undefined/null 미처리
5. props 타입 누락

## 출력 형식
파일명 | 라인 | 버그 내용 | 수정 제안
