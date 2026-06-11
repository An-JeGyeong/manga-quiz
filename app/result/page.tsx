import type { Metadata } from 'next'
import ResultView from './ResultView'

export const metadata: Metadata = {
  title: '결과 | 일본 만화 취향 테스트',
  description: '12문항으로 알아보는 나의 일본 만화 취향 — 8가지 유형 중 나와 꼭 맞는 취향을 찾아보세요',
}

export default function ResultPage() {
  return <ResultView />
}
