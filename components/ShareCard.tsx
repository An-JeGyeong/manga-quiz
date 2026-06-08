'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import type { ResultType } from '@/data/types'

declare global {
  interface Window {
    toss?: {
      share?: (payload: { title: string; text: string; url: string }) => void
    }
  }
}

const STAT_COLORS: Record<string, string> = {
  강도: '#D85A30',
  관계: '#1D9E75',
  세계관: '#7F77DD',
  성장: '#BA7517',
}

const SHARE_TITLE = '내 manga 취향은?'
const SHARE_BASE_URL = 'https://manga-quiz.vercel.app/result'

type ShareCardProps = {
  resultType: ResultType
}

export default function ShareCard({ resultType }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [isSaving, setIsSaving] = useState(false)

  const shareUrl = `${SHARE_BASE_URL}?type=${resultType.key}`

  async function copyShareUrl() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('clipboard unavailable')
      }
      await navigator.clipboard.writeText(shareUrl)
      setCopyStatus('copied')
    } catch {
      // 클립보드 미지원·권한 거부 환경(앱인토스 WebView 포함) 대비
      setCopyStatus('failed')
    } finally {
      setTimeout(() => setCopyStatus('idle'), 1500)
    }
  }

  function handleTossShare() {
    const share = window.toss?.share
    if (share) {
      share({ title: SHARE_TITLE, text: resultType.quote, url: shareUrl })
    } else {
      // 앱 밖에서 접근 시 fallback: 클립보드 복사
      copyShareUrl()
    }
  }

  async function handleSaveImage() {
    if (!cardRef.current || isSaving) return
    setIsSaving(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        // Next.js 개발 툴바("N" 아이콘, <nextjs-portal>)는 fixed 포지션이라
        // 캡처 영역과 겹치면 함께 찍히므로 명시적으로 제외
        ignoreElements: (element) => element.tagName.toLowerCase() === 'nextjs-portal',
      })
      const link = document.createElement('a')
      link.download = 'manga-result.png'
      link.href = canvas.toDataURL()
      link.click()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={cardRef} className="flex flex-col gap-4 rounded-3xl bg-[#FAEEDA] px-6 py-6">
        <div>
          <p className="text-sm font-medium text-[#633806]">내 manga 취향 카드</p>
          <h3 className="text-xl font-bold text-[#633806]">{resultType.name}</h3>
          <p className="mt-1 text-sm text-[#633806]">{resultType.quote}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {resultType.statBars.map((bar) => (
            <div key={bar.label} className="rounded-2xl bg-white/60 px-3 py-2">
              <p className="text-xs font-medium text-[#633806]">{bar.label}</p>
              <p className="text-lg font-bold" style={{ color: STAT_COLORS[bar.label] ?? '#633806' }}>
                {bar.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {resultType.works.slice(0, 3).map((work) => (
            <p key={work.title} className="text-sm text-[#633806]">
              · {work.title} <span className="text-[#633806]/70">— {work.author}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSaveImage}
          disabled={isSaving}
          className="rounded-2xl border border-[#633806]/20 px-5 py-3 text-center text-sm font-semibold text-[#633806] transition-colors hover:bg-[#FAEEDA] disabled:opacity-60"
        >
          {isSaving ? '이미지 저장 중…' : '이미지로 저장하기'}
        </button>
        <button
          type="button"
          onClick={handleTossShare}
          className="rounded-2xl bg-[#0064FF] px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          토스로 공유하기
        </button>
        {/* 카카오·인스타그램 공유 SDK 미연동 — 링크 복사로 폴백 */}
        <button
          type="button"
          onClick={copyShareUrl}
          className="rounded-2xl bg-[#FEE500] px-5 py-3 text-center text-sm font-semibold text-[#3C1E1E] transition-opacity hover:opacity-90"
        >
          카카오톡으로 공유하기
        </button>
        <button
          type="button"
          onClick={copyShareUrl}
          className="rounded-2xl bg-[#E1306C] px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          인스타그램 스토리에 공유하기
        </button>
        <button
          type="button"
          onClick={copyShareUrl}
          className="rounded-2xl border border-zinc-200 px-5 py-3 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          {copyStatus === 'copied' ? '링크가 복사되었어요' : copyStatus === 'failed' ? '복사 실패' : '링크 복사하기'}
        </button>
      </div>
    </div>
  )
}
