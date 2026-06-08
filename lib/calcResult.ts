import { RESULT_TYPES, type ResultType } from '@/data/types'

export type Scores = {
  intensity: number // 강도: 하드코어(+) ↔ 라이트(-)
  relation: number // 관계: 관계형(+) ↔ 개인형(-)
  world: number // 세계: 판타지(+) ↔ 현실(-)
}

export function calcType(scores: Scores): ResultType {
  const i = scores.intensity > 0 ? 'H' : 'L'
  const r = scores.relation > 0 ? 'R' : 'S'
  const w = scores.world > 0 ? 'F' : 'E'
  return RESULT_TYPES[`${i}${r}${w}`]
}
