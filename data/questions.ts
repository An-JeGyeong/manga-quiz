import type { Scores } from '@/lib/calcResult'

export type Answer = {
  text: string
  scores: Partial<Scores> // 언급 안 된 축은 0으로 처리
}

export type Question = {
  id: number
  text: string
  axis: ('intensity' | 'relation' | 'world')[] // 관련 축 명시
  answers: Answer[]
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '다음 중 가장 끌리는 만화 장르는?',
    axis: ['intensity'],
    answers: [
      { text: '손에 땀을 쥐게 하는 배틀/액션물', scores: { intensity: 2 } },
      { text: '스릴 있는 전개의 모험/스포츠물', scores: { intensity: 1 } },
      { text: '잔잔하게 흘러가는 학원/로맨스물', scores: { intensity: -1 } },
      { text: '마음이 편안해지는 잔잔한 일상물', scores: { intensity: -2 } },
    ],
  },
  {
    id: 2,
    text: '스토리에서 가장 몰입하게 되는 부분은?',
    axis: ['relation'],
    answers: [
      { text: '캐릭터들 사이에 쌓이는 관계와 케미스트리', scores: { relation: 2 } },
      { text: '함께하는 동료들의 합과 팀워크', scores: { relation: 1 } },
      { text: '주인공이 홀로 마주하는 갈등과 선택', scores: { relation: -1 } },
      { text: '주인공 한 사람의 내면과 성장 서사', scores: { relation: -2 } },
    ],
  },
  {
    id: 3,
    text: '더 끌리는 이야기의 배경은?',
    axis: ['world'],
    answers: [
      { text: '마법, 이세계, 초능력이 존재하는 세계', scores: { world: 2 } },
      { text: '신비로운 요소가 살짝 섞인 우리 동네', scores: { world: 1 } },
      { text: '특별할 것 없는 보통의 동네와 학교', scores: { world: -1 } },
      { text: '우리가 살아가는 모습과 닮은 현실적인 곳', scores: { world: -2 } },
    ],
  },
  {
    id: 4,
    text: '다음 중 더 보고 싶은 전개는?',
    axis: ['intensity'],
    answers: [
      { text: '한 치 앞도 예측 못하게 몰아치는 전개', scores: { intensity: 2 } },
      { text: '긴장과 여유가 적절히 섞인 전개', scores: { intensity: 1 } },
      { text: '큰 사건 없이 잔잔히 흘러가는 전개', scores: { intensity: -1 } },
      { text: '천천히, 여유롭게 흘러가는 전개', scores: { intensity: -2 } },
    ],
  },
  {
    id: 5,
    text: '가장 응원하게 되는 캐릭터 구도는?',
    axis: ['relation'],
    answers: [
      { text: '끈끈한 동료들과 함께하는 팀/파티', scores: { relation: 2 } },
      { text: '마음 맞는 단짝과 함께하는 듀오', scores: { relation: 1 } },
      { text: '주변 사람과 거리를 두는 무뚝뚝한 주인공', scores: { relation: -1 } },
      { text: '혼자서 묵묵히 길을 걷는 단독 주인공', scores: { relation: -2 } },
    ],
  },
  {
    id: 6,
    text: '만화를 볼 때 더 눈이 가는 디테일은?',
    axis: ['world'],
    answers: [
      { text: '정교하게 짜인 세계관과 설정', scores: { world: 2 } },
      { text: '독특한 능력이나 시스템의 원리', scores: { world: 1 } },
      { text: '등장인물의 직업과 생활 반경', scores: { world: -1 } },
      { text: '현실에서 마주칠 법한 사람들의 사정', scores: { world: -2 } },
    ],
  },
  {
    id: 7,
    text: '다음 중 더 끌리는 작품 분위기는?',
    axis: ['intensity', 'world'],
    answers: [
      { text: '어둡고 강렬한 다크 판타지', scores: { intensity: 2, world: 2 } },
      { text: '산뜻하고 활기찬 모험 판타지', scores: { intensity: 1, world: 1 } },
      { text: '잔잔하고 따뜻한 그림체의 학원물', scores: { intensity: -1, world: -1 } },
      { text: '포근하고 현실적인 그림체의 일상물', scores: { intensity: -2, world: -2 } },
    ],
  },
  {
    id: 8,
    text: '갈등 상황에서 주인공이 이렇게 풀어가면 좋겠다, 싶은 쪽은?',
    axis: ['intensity', 'relation'],
    answers: [
      { text: '정면으로 부딪혀 실력으로 승부를 본다', scores: { intensity: 2, relation: -1 } },
      { text: '라이벌과 경쟁하며 서로 자극을 주고받는다', scores: { intensity: 1, relation: 1 } },
      { text: '동료와 머리를 맞대고 함께 풀어나간다', scores: { intensity: -1, relation: 2 } },
      { text: '갈등을 피해 묵묵히 자기 할 일을 한다', scores: { intensity: -1, relation: -2 } },
    ],
  },
  {
    id: 9,
    text: '더 흥미로운 설정/떡밥은?',
    axis: ['world'],
    answers: [
      { text: '차원 이동, 능력치, 시스템 같은 비현실적 설정', scores: { world: 2 } },
      { text: '특수한 능력이 존재하는 약간 다른 현실', scores: { world: 1 } },
      { text: '특별한 재능을 가진 보통 사람들의 이야기', scores: { world: -1 } },
      { text: '직업, 취미, 가족 같은 현실적인 소재', scores: { world: -2 } },
    ],
  },
  {
    id: 10,
    text: '조연 캐릭터들을 볼 때 더 끌리는 쪽은?',
    axis: ['relation'],
    answers: [
      { text: '주인공 곁을 든든하게 채워주는 동료들', scores: { relation: 2 } },
      { text: '티격태격하면서도 의지가 되는 친구들', scores: { relation: 1 } },
      { text: '스쳐 지나가듯 등장하는 인연들', scores: { relation: -1 } },
      { text: '주인공의 서사에 깊이를 더하는 장치', scores: { relation: -2 } },
    ],
  },
  {
    id: 11,
    text: '더 만족스러운 결말은 어느 쪽에 가까운가?',
    axis: ['intensity'],
    answers: [
      { text: '모든 걸 건 거대한 최종 결전', scores: { intensity: 2 } },
      { text: '긴 여정 끝에 맞이하는 짜릿한 승리', scores: { intensity: 1 } },
      { text: '큰 사건 없이 따뜻하게 마무리되는 일상', scores: { intensity: -1 } },
      { text: '소소하고 담담하게 마무리되는 일상', scores: { intensity: -2 } },
    ],
  },
  {
    id: 12,
    text: '더 자주 손이 가는 클리셰는?',
    axis: ['world', 'relation'],
    answers: [
      { text: '이세계에서 파티원들과 모험하며 쌓는 인연', scores: { world: 2, relation: 1 } },
      { text: '낯선 세계를 홀로 탐험하며 발견하는 비밀들', scores: { world: 1, relation: -1 } },
      { text: '평범한 학교에서 친구들과 보내는 나날', scores: { world: -1, relation: 1 } },
      { text: '동네에서 혼자만의 시간을 즐기는 잔잔한 하루', scores: { world: -2, relation: -1 } },
    ],
  },
]
