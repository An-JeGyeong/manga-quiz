'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ShareCard from '@/components/ShareCard'
import MascotCharacter from '@/components/MascotCharacter'
import ResultSkeleton from '@/components/ResultSkeleton'
import { RESULT_TYPES, type StatBar, type Work } from '@/data/types'
import { calcType, type Scores } from '@/lib/calcResult'
import { trackWorkClick, trackWorkFeedback } from '@/lib/gtag'

function FadeInImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // 캐시에서 즉시 로드된 이미지는 onLoad가 발생하지 않으므로 마운트 시 complete 여부를 직접 확인한다
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

type Feedback = 'good' | 'bad' | null

const FEEDBACK_LABEL: Record<'good' | 'bad', string> = {
  good: '👍 재밌었어요',
  bad: '👎 취향 아니었어요',
}

function WorkFeedbackButtons({ workTitle }: { workTitle: string }) {
  const [feedback, setFeedback] = useState<Feedback>(null)

  function handleSelect(value: 'good' | 'bad') {
    return (event: React.MouseEvent) => {
      event.stopPropagation()
      setFeedback((prev) => {
        const next = prev === value ? null : value
        if (next) trackWorkFeedback(workTitle, next)
        return next
      })
    }
  }

  return (
    <div className="mt-1 flex gap-1.5">
      <button
        type="button"
        onClick={handleSelect('good')}
        aria-pressed={feedback === 'good'}
        className={
          feedback === 'good'
            ? 'rounded-full bg-[#FAECE7] px-3 py-1 text-xs font-semibold text-[#D85A30]'
            : 'rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-[#FAECE7] hover:text-[#D85A30]'
        }
      >
        {FEEDBACK_LABEL.good}
      </button>
      <button
        type="button"
        onClick={handleSelect('bad')}
        aria-pressed={feedback === 'bad'}
        className={
          feedback === 'bad'
            ? 'rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600'
            : 'rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100'
        }
      >
        {FEEDBACK_LABEL.bad}
      </button>
    </div>
  )
}

const STAT_COLORS: Record<string, string> = {
  강도: '#D85A30',
  관계: '#1D9E75',
  세계관: '#7F77DD',
  성장: '#BA7517',
}

function parseScore(value: string | null): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

function matchRate(index: number): number {
  return Math.max(80, 97 - index * 5)
}

function StatBarRow({ bar }: { bar: StatBar }) {
  const color = STAT_COLORS[bar.label] ?? '#D85A30'
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-sm font-medium text-zinc-600">{bar.label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full" style={{ width: `${bar.value}%`, backgroundColor: color }} />
      </div>
      <span className="w-9 shrink-0 text-right text-sm tabular-nums text-zinc-500">{bar.value}</span>
    </div>
  )
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <div
      onClick={() => trackWorkClick(work.title)}
      className="flex gap-3 rounded-2xl border border-zinc-200 px-4 py-3"
    >
      {work.coverUrl && (
        <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <FadeInImage src={work.coverUrl} alt={`${work.title} 표지`} sizes="64px" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-zinc-900">{work.title}</p>
          <span className="shrink-0 rounded-full bg-[#FAECE7] px-2 py-0.5 text-xs font-semibold text-[#D85A30]">
            일치율 {matchRate(index)}%
          </span>
        </div>
        <p className="text-sm text-zinc-500">{work.author}</p>
        <p className="text-sm text-zinc-600">{work.reason}</p>
        {work.tags && work.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {work.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#FAECE7] px-2 py-0.5 text-xs font-medium text-[#D85A30]">
                {tag}
              </span>
            ))}
          </div>
        )}
        <WorkFeedbackButtons workTitle={work.title} />
      </div>
    </div>
  )
}

function ResultContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const scores: Scores = {
    intensity: parseScore(searchParams.get('i')),
    relation: parseScore(searchParams.get('r')),
    world: parseScore(searchParams.get('w')),
  }
  const typeKey = searchParams.get('type')
  const completed = searchParams.get('completed') === 'true'
  const resultType = (typeKey && RESULT_TYPES[typeKey]) || calcType(scores)

  useEffect(() => {
    // resultType 파싱이 끝난 다음 틱에 로딩 상태를 해제해 스켈레톤 → 실제 결과로 자연스럽게 전환한다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false)
  }, [])

  function handleBack() {
    window.history.go(-1)
  }

  if (!completed && !typeKey) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="text-base font-medium text-zinc-600">테스트를 완료해주세요</p>
        <Link
          href="/"
          className="rounded-2xl bg-[#D85A30] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          테스트 시작하러 가기
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <ResultSkeleton />
  }

  const topWork = resultType.works[0]

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 bg-white px-4 pb-12 animate-fade-in">
      <header className="flex items-center gap-3 pt-6">
        <button
          type="button"
          onClick={handleBack}
          aria-label="뒤로가기"
          className="text-xl text-zinc-400 transition-colors hover:text-zinc-700"
        >
          ←
        </button>
        <Link href="/" aria-label="홈으로 가기" className="text-xl text-zinc-400 transition-colors hover:text-zinc-700">
          ⌂
        </Link>
      </header>

      <section className="flex flex-col items-center gap-2 rounded-3xl bg-[#FAECE7] px-6 py-12 text-center">
        <MascotCharacter className="h-20 w-20" />
        <p className="text-sm font-medium text-[#D85A30]">당신의 manga 취향은</p>
        <h1 className="text-3xl font-bold text-[#712B13]">{resultType.name}</h1>
        <p className="mt-1 text-base text-[#712B13]">{resultType.quote}</p>
      </section>

      {topWork.coverUrl && (
        <section
          onClick={() => trackWorkClick(topWork.title)}
          className="flex gap-4 rounded-3xl border border-zinc-200 px-4 py-4"
        >
          <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
            <FadeInImage src={topWork.coverUrl} alt={`${topWork.title} 표지`} sizes="96px" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs font-semibold text-[#D85A30]">일치율 1위 추천 작품</p>
            <p className="text-lg font-bold text-zinc-900">{topWork.title}</p>
            <p className="text-sm text-zinc-600">{topWork.reason}</p>
            {topWork.tags && topWork.tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {topWork.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#FAECE7] px-2 py-0.5 text-xs font-medium text-[#D85A30]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900">취향 스탯</h2>
        <div className="flex flex-col gap-3">
          {resultType.statBars.map((bar) => (
            <StatBarRow key={bar.label} bar={bar} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900">이런 작품은 어때요?</h2>
        <div className="flex flex-col gap-3">
          {resultType.works.slice(1).map((work, index) => (
            <WorkCard key={work.title} work={work} index={index + 1} />
          ))}
        </div>
      </section>

      <div id="ad-result" className="h-0 w-full overflow-hidden rounded-lg bg-[#F5F5F5]" />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900">친구에게 공유하기</h2>
        <ShareCard resultType={resultType} />
      </section>

      <Link href="/" className="text-center text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-700">
        처음으로 돌아가기
      </Link>
    </div>
  )
}

export default function ResultView() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">결과를 불러오는 중…</div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
