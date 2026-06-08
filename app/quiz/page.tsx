'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/data/questions'
import { calcType, type Scores } from '@/lib/calcResult'

const TOTAL = QUESTIONS.length
const ANSWER_DELAY_MS = 420

const EMPTY_SCORES: Scores = { intensity: 0, relation: 0, world: 0 }

function addScores(base: Scores, delta: Partial<Scores>): Scores {
  return {
    intensity: base.intensity + (delta.intensity ?? 0),
    relation: base.relation + (delta.relation ?? 0),
    world: base.world + (delta.world ?? 0),
  }
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Scores>(EMPTY_SCORES)
  const [isAnswering, setIsAnswering] = useState(false)

  const question = QUESTIONS[step]
  const percent = Math.round(((step + 1) / TOTAL) * 100)

  function finish(finalScores: Scores) {
    const type = calcType(finalScores)
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
    goNext(scores)
  }

  function handleBack() {
    window.history.go(-1)
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col bg-white px-4">
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
          {QUESTIONS.map((q, index) => (
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
