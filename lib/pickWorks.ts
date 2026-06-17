import type { Work } from '@/data/types'

export type DisplayWorks = {
  topWork: Work
  restWorks: Work[]
  rotationPeriod: number
}

// KST(UTC+9) 기준 2주 구간 번호: Math.floor(kstDays / 14) % worksCount
export function getRotationPeriod(worksCount: number): number {
  const KST_OFFSET_MS = 9 * 60 * 60 * 1000
  const kstDayNumber = Math.floor((Date.now() + KST_OFFSET_MS) / (86400 * 1000))
  return Math.floor(kstDayNumber / 14) % worksCount
}

export function pickDisplayWorks(works: Work[]): DisplayWorks {
  if (works.length === 0) {
    return { topWork: { title: '', author: '', reason: '' }, restWorks: [], rotationPeriod: 0 }
  }

  const rotationPeriod = getRotationPeriod(works.length)
  const topWork = works[rotationPeriod]

  const pool = works.filter((_, i) => i !== rotationPeriod)
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const restWorks = shuffled.slice(0, 3)

  return { topWork, restWorks, rotationPeriod }
}
