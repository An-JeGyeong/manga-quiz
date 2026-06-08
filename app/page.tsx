'use client'

import Link from 'next/link'
import MascotCharacter from '@/components/MascotCharacter'
import { trackQuizStart } from '@/lib/gtag'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
        <section className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-[#FAECE7] px-8 py-14 text-center">
          <MascotCharacter className="h-20 w-20" />
          <span className="rounded-full bg-[#FAEEDA] px-3 py-1 text-xs font-semibold text-[#633806]">
            12문항 · 약 2분
          </span>
          <h1 className="text-3xl font-bold leading-snug text-[#712B13]">
            내 manga 취향,
            <br />
            정확히 알고 있나요?
          </h1>
          <p className="text-base leading-relaxed text-[#712B13]">
            질문에 답하면 8가지 유형 중
            <br />
            나와 꼭 맞는 manga 취향을 알려드려요
          </p>
        </section>

        <p className="text-sm text-zinc-400">결과는 친구와 비교하고 공유할 수 있어요</p>

        <Link
          href="/quiz"
          onClick={() => trackQuizStart()}
          className="w-full max-w-xs rounded-2xl bg-[#D85A30] px-6 py-4 text-center text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          테스트 시작하기
        </Link>

        <div id="ad-main" className="h-0 w-full overflow-hidden rounded-lg bg-[#F5F5F5]" />
      </main>
    </div>
  )
}
