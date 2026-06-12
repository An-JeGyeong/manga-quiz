'use client'

import { useState } from 'react'
import { share } from '@apps-in-toss/web-framework'
import type { ResultType } from '@/data/types'
import { trackResultShare } from '@/lib/gtag'
import { isAppInTossWebView } from '@/lib/webview'

const STAT_COLORS: Record<string, string> = {
  강도: '#D85A30',
  관계: '#1D9E75',
  세계관: '#7F77DD',
  성장: '#BA7517',
}

const SHARE_TITLE = '내 일본 만화 취향은?'
const SHARE_BASE_URL = 'https://manga-quiz.vercel.app/result'

type ShareCardProps = {
  resultType: ResultType
}

export default function ShareCard({ resultType }: ShareCardProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const shareUrl = `${SHARE_BASE_URL}?type=${resultType.key}`
  const shareMessage = `${SHARE_TITLE}\n${resultType.quote}\n${shareUrl}`

  async function copyShareUrl() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('clipboard unavailable')
      }
      await navigator.clipboard.writeText(shareUrl)
      setCopyStatus('copied')
    } catch {
      // 클립보드 미지원·권한 거부 환경 대비
      setCopyStatus('failed')
    } finally {
      setTimeout(() => setCopyStatus('idle'), 1500)
    }
  }

  async function handleTossShare() {
    if (!isAppInTossWebView()) {
      // 앱 밖에서 접근 시 fallback: 클립보드 복사
      copyShareUrl()
      return
    }
    try {
      await share({ message: shareMessage })
    } catch {
      copyShareUrl()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-3xl bg-[#FAEEDA] px-6 py-6">
        <div>
          <p className="text-sm font-medium text-[#633806]">내 일본 만화 취향 카드</p>
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
          onClick={() => {
            trackResultShare('toss')
            handleTossShare()
          }}
          className="rounded-2xl bg-[#0064FF] px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          토스로 공유하기
        </button>
        <button
          type="button"
          onClick={() => {
            trackResultShare('copy_link')
            copyShareUrl()
          }}
          className="rounded-2xl border border-zinc-200 px-5 py-3 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          {copyStatus === 'copied' ? '링크가 복사되었어요' : copyStatus === 'failed' ? '복사 실패' : '링크 복사하기'}
        </button>
      </div>
    </div>
  )
}
