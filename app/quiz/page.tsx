'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, STAGES, type Question } from '@/data/questions'
import { calcType, type Scores } from '@/lib/calcResult'
import { trackQuizAbandon, trackQuizComplete, trackQuizSkip } from '@/lib/gtag'
import { usePageNavigation } from '@/lib/useAppNavigation'

const QUESTIONS_PER_STAGE = 2
const ANSWER_DELAY_MS = 420

const EMPTY_SCORES: Scores = { intensity: 0, relation: 0, world: 0 }

function addScores(base: Scores, delta: Partial<Scores>): Scores {
  return {
    intensity: base.intensity + (delta.intensity ?? 0),
    relation: base.relation + (delta.relation ?? 0),
    world: base.world + (delta.world ?? 0),
  }
}

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function elapsedSeconds(since: number | null): number {
  if (since === null) return 0
  return Math.round((Date.now() - since) / 1000)
}

// 세션 시작 시 단계별(고르는 순간 → … → 다 읽고)로 2개씩 랜덤 선택해 12문항 구성
function buildSessionQuestions(): Question[] {
  return STAGES.flatMap(({ key }) =>
    pickRandom(
      QUESTIONS.filter((q) => q.stage === key),
      QUESTIONS_PER_STAGE,
    ),
  )
}

export default function QuizPage() {
  const router = useRouter()
  // 세션마다 다른 랜덤 구성이라 SSR과 클라이언트 결과가 어긋나 hydration mismatch가
  // 나므로, 마운트 후(클라이언트에서만) 문항을 선택한다.
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Scores>(EMPTY_SCORES)
  const [isAnswering, setIsAnswering] = useState(false)

  // 이탈 패턴 분석용 타임스탬프 — Date.now()는 impure하므로 렌더가 아닌 effect에서 기록한다
  const quizStartedAtRef = useRef<number | null>(null)
  const questionEnteredAtRef = useRef<number | null>(null)
  // handleBack에서 이미 quiz_abandon을 보냈다면 같은 이탈에 대해
  // visibilitychange 핸들러가 중복 전송하지 않도록 막는 플래그
  const hasTrackedAbandonRef = useRef(false)

  // 토스 내비게이션 바 뒤로가기 버튼 → 커스텀 handleBack과 동일 동작
  usePageNavigation(() => {
    if (isAnswering) return
    hasTrackedAbandonRef.current = true
    const current = questions?.[step]
    if (current !== undefined) {
      trackQuizAbandon(
        step + 1,
        current.id,
        elapsedSeconds(quizStartedAtRef.current),
        elapsedSeconds(questionEnteredAtRef.current),
      )
    }
    window.history.go(-1)
  })

  useEffect(() => {
    // 랜덤 선택 결과가 SSR과 클라이언트에서 달라 hydration mismatch가 발생하므로
    // 마운트 후에만(클라이언트 한정) 문항을 채운다 — React 공식 권장 패턴
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(buildSessionQuestions())
  }, [])

  // 페이지 진입 시각 기록 (이탈까지의 전체 경과 시간 측정용)
  useEffect(() => {
    quizStartedAtRef.current = Date.now()
  }, [])

  // 화면에 새 질문이 표시될 때마다 진입 시각을 갱신해 질문별 체류 시간을 잴 수 있게 한다
  // 새 질문으로 넘어왔다는 것은 이전 질문에서는 이탈하지 않았다는 뜻이므로 플래그도 리셋한다
  // questions 의존성 제거 — null→array 전환 시 플래그가 의도치 않게 리셋되는 문제 방지
  useEffect(() => {
    questionEnteredAtRef.current = Date.now()
    hasTrackedAbandonRef.current = false
  }, [step])

  // 브라우저 뒤로가기 등으로 페이지가 가려지면 이탈로 간주해 quiz_abandon을 전송한다
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState !== 'hidden' || !questions || hasTrackedAbandonRef.current) return
      const current = questions[step]
      trackQuizAbandon(
        step + 1,
        current.id,
        elapsedSeconds(quizStartedAtRef.current),
        elapsedSeconds(questionEnteredAtRef.current),
      )
      hasTrackedAbandonRef.current = true
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [questions, step])

  if (!questions) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
        질문을 준비하는 중…
      </div>
    )
  }

  const TOTAL = questions.length
  const question = questions[step]
  const percent = Math.round(((step + 1) / TOTAL) * 100)

  function finish(finalScores: Scores) {
    const type = calcType(finalScores)
    trackQuizComplete(type.key)
    const params = new URLSearchParams({
      type: type.key,
      i: String(finalScores.intensity),
      r: String(finalScores.relation),
      w: String(finalScores.world),
      completed: 'true',
    })
    router.push(`/result?${params.toString()}`)
  }

  function goNext(nextScores: Scores) {
    if (step + 1 >= TOTAL) {
      finish(nextScores)
      return
    }
    setScores(nextScores)
    setStep((s) => s + 1)
    setIsAnswering(false)
  }

  function handleAnswer(delta: Partial<Scores>) {
    if (isAnswering) return
    setIsAnswering(true)
    const nextScores = addScores(scores, delta)
    setTimeout(() => goNext(nextScores), ANSWER_DELAY_MS)
  }

  function handleSkip() {
    if (isAnswering) return
    trackQuizSkip(step + 1, question.id, elapsedSeconds(questionEnteredAtRef.current))
    goNext(scores)
  }

  function handleBack() {
    if (!hasTrackedAbandonRef.current) {
      hasTrackedAbandonRef.current = true
      trackQuizAbandon(
        step + 1,
        question.id,
        elapsedSeconds(quizStartedAtRef.current),
        elapsedSeconds(questionEnteredAtRef.current),
      )
    }
    window.history.go(-1)
  }

  return (
    <div className="mx-auto flex w-full flex-1 flex-col bg-white px-4 sm:max-w-lg lg:max-w-xl">
      <header className="flex flex-col gap-3 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로가기"
            className="text-xl text-zinc-400 transition-colors hover:text-zinc-700"
          >
            ←
          </button>
          <span className="text-sm font-medium text-zinc-500">
            {step + 1} / {TOTAL} · {percent}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-[#D85A30] transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center gap-4 py-10">
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-[#FAECE7] px-3 py-1 text-xs font-semibold text-[#D85A30]">
            Q{step + 1}
          </span>
          <h1 className="text-2xl font-bold leading-snug text-zinc-900">{question.text}</h1>
        </div>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer, index) => (
            <button
              key={answer.text}
              type="button"
              disabled={isAnswering}
              onClick={() => handleAnswer(answer.scores)}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-5 py-4 text-left text-base text-zinc-800 transition-colors hover:border-[#D85A30] hover:bg-[#FAECE7] disabled:opacity-60"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="flex flex-col items-center gap-4 pb-10">
        <div className="flex items-center gap-1.5">
          {questions.map((q, index) => (
            <span
              key={q.id}
              aria-hidden
              className={
                index < step
                  ? 'h-2 w-2 rounded-full bg-[#D85A30]'
                  : index === step
                    ? 'h-2 w-6 rounded-full bg-[#D85A30]'
                    : 'h-2 w-2 rounded-full bg-zinc-200'
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleSkip}
          disabled={isAnswering}
          className="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-600 hover:underline disabled:opacity-60"
        >
          건너뛰기
        </button>
      </footer>
    </div>
  )
}
