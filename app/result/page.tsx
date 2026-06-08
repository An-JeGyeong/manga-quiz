import type { Metadata } from 'next'
import ResultView from './ResultView'
import { RESULT_TYPES } from '@/data/types'
import { calcType, type Scores } from '@/lib/calcResult'

type SearchParams = { [key: string]: string | string[] | undefined }

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function parseScore(value: string | string[] | undefined): number {
  const n = Number(firstParam(value))
  return Number.isFinite(n) ? n : 0
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const typeKey = firstParam(resolvedSearchParams.type)
  const completed = firstParam(resolvedSearchParams.completed) === 'true'

  // 결과가 없을 때(테스트 미완료/직접 접근)는 안내 화면이 노출되므로 기본 메타데이터로 폴백
  if (!completed && !typeKey) {
    return {}
  }

  const scores: Scores = {
    intensity: parseScore(resolvedSearchParams.i),
    relation: parseScore(resolvedSearchParams.r),
    world: parseScore(resolvedSearchParams.w),
  }
  const resultType = (typeKey && RESULT_TYPES[typeKey]) || calcType(scores)
  const title = `${resultType.name} | manga 취향 테스트`
  const description = resultType.quote

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function ResultPage() {
  return <ResultView />
}
