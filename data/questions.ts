import type { Scores } from '@/lib/calcResult'

export type Answer = {
  text: string
  scores: Partial<Scores> // 언급 안 된 축은 0으로 처리
}

// 스토리 흐름 6단계 — 등장 순서 그대로 진행 흐름을 의미
export type Stage = 'choosing' | 'firstEpisode' | 'midpoint' | 'climax' | 'ending' | 'afterglow'

export const STAGES: { key: Stage; label: string }[] = [
  { key: 'choosing', label: '고르는 순간' },
  { key: 'firstEpisode', label: '1화 시작' },
  { key: 'midpoint', label: '중반부' },
  { key: 'climax', label: '클라이맥스' },
  { key: 'ending', label: '결말' },
  { key: 'afterglow', label: '다 읽고' },
]

export type Question = {
  id: number
  stage: Stage
  text: string
  axis: ('intensity' | 'relation' | 'world')[] // 관련 축 명시
  answers: Answer[]
}

// 18문항 (6단계 × 3개) — 세션마다 단계별 2개씩 랜덤 선택해 총 12문항 진행
export const QUESTIONS: Question[] = [
  // [고르는 순간] 표지/제목을 보는 순간
  {
    id: 1,
    stage: 'choosing',
    text: '서점 매대에 놓인 신작 만화, 표지부터 눈에 들어오는 스타일은?',
    axis: ['intensity', 'world'],
    answers: [
      { text: '강렬한 색채와 박력 있는 액션 포즈', scores: { intensity: 2 } },
      { text: '모험을 떠나는 듯 역동적인 구도', scores: { intensity: 1, world: 1 } },
      { text: '따뜻한 색감의 잔잔한 일상 풍경', scores: { intensity: -1 } },
      { text: '차분하고 정적인 분위기의 인물 클로즈업', scores: { intensity: -2 } },
    ],
  },
  {
    id: 2,
    stage: 'choosing',
    text: '표지 옆 한 줄 소개, 어떤 문구에 손이 멈출까?',
    axis: ['intensity', 'world', 'relation'],
    answers: [
      { text: '"세계의 운명을 건 거대한 전투가 시작된다"', scores: { intensity: 2, world: 1 } },
      { text: '"낯선 세계, 새로운 동료들과의 모험"', scores: { world: 2, relation: 1 } },
      { text: '"평범한 동네에서 벌어지는 소소한 이야기"', scores: { world: -1, intensity: -1 } },
      { text: '"그저 흘러가는 어느 하루의 기록"', scores: { world: -2, intensity: -2 } },
    ],
  },
  {
    id: 3,
    stage: 'choosing',
    text: '제목만 보고 가장 먼저 떠오르는 기대감은?',
    axis: ['intensity', 'relation'],
    answers: [
      { text: '"얼마나 짜릿한 전투가 펼쳐질까"', scores: { intensity: 2 } },
      { text: '"어떤 동료들을 만나게 될까"', scores: { relation: 2 } },
      { text: '"주인공은 어떤 갈등을 마주하게 될까"', scores: { relation: -1 } },
      { text: '"어떤 잔잔한 위로를 받을 수 있을까"', scores: { intensity: -2 } },
    ],
  },

  // [1화 시작] 첫 페이지, 주인공 첫 만남
  {
    id: 4,
    stage: 'firstEpisode',
    text: '1화 첫 장면, 주인공이 이렇게 등장하면 더 끌릴 것 같은 쪽은?',
    axis: ['intensity', 'world', 'relation'],
    answers: [
      { text: '강력한 적과 맞서며 강렬하게 등장', scores: { intensity: 2 } },
      { text: '새로운 세계에 발을 들이는 두근거리는 첫걸음', scores: { world: 2, intensity: 1 } },
      { text: '평범한 일상 속에서 무심하게 시작하는 하루', scores: { intensity: -1, world: -1 } },
      { text: '조용한 방 안에서 혼자만의 시간을 보내며', scores: { intensity: -2, relation: -1 } },
    ],
  },
  {
    id: 5,
    stage: 'firstEpisode',
    text: '주인공이 1화에서 처음 마주치는 인물, 어느 쪽이 더 흥미로울까?',
    axis: ['intensity', 'relation'],
    answers: [
      { text: '거칠게 부딪히게 되는 라이벌', scores: { intensity: 2, relation: -1 } },
      { text: '앞으로 함께할 든든한 동료가 될 인물', scores: { relation: 2 } },
      { text: '스쳐 지나가듯 잠깐 마주친 인연', scores: { relation: -1 } },
      { text: '굳이 마주치지 않고 혼자 걸어가는 길', scores: { relation: -2, intensity: -2 } },
    ],
  },
  {
    id: 6,
    stage: 'firstEpisode',
    text: '1화를 다 읽고 나서, 어떤 기분이 들면 계속 보고 싶어질까?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '"다음 화에 무슨 일이 벌어질지 심장이 뛴다"', scores: { intensity: 2 } },
      { text: '"이 인물들 관계가 앞으로 어떻게 될지 궁금하다"', scores: { relation: 2 } },
      { text: '"이 세계는 대체 어떤 곳일지 궁금해진다"', scores: { world: 2 } },
      { text: '"그냥 편안하게 계속 보고 싶은 분위기다"', scores: { intensity: -2, world: -1 } },
    ],
  },

  // [중반부] 갈등, 관계, 전개
  {
    id: 7,
    stage: 'midpoint',
    text: '이야기가 중반에 접어들 때, 더 몰입하게 되는 전개는?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '한 치 앞도 예측할 수 없이 몰아치는 사건들', scores: { intensity: 2 } },
      { text: '동료들과 부딪히고 화해하며 단단해지는 관계', scores: { relation: 2 } },
      { text: '조금씩 드러나는 세계관의 비밀', scores: { world: 2 } },
      { text: '큰 사건 없이 잔잔하게 쌓이는 일상의 결', scores: { intensity: -2, world: -1 } },
    ],
  },
  {
    id: 8,
    stage: 'midpoint',
    text: '주인공이 위기를 만났을 때, 더 마음이 가는 모습은?',
    axis: ['intensity', 'relation'],
    answers: [
      { text: '혼자서라도 정면으로 부딪혀 돌파하는 모습', scores: { intensity: 1, relation: -2 } },
      { text: '동료들과 머리를 맞대고 함께 헤쳐나가는 모습', scores: { relation: 2 } },
      { text: '라이벌과 부딪히며 서로를 자극하는 모습', scores: { intensity: 1, relation: 1 } },
      { text: '묵묵히 자기만의 방식으로 견뎌내는 모습', scores: { intensity: -1, relation: -1 } },
    ],
  },
  {
    id: 9,
    stage: 'midpoint',
    text: '스토리 중간, 어떤 떡밥이 던져지면 더 두근거릴까?',
    axis: ['intensity', 'world', 'relation'],
    answers: [
      { text: '"사실 이 세계엔 아무도 모르는 비밀이 있다"', scores: { world: 2 } },
      { text: '"이 능력엔 숨겨진 대가가 있다"', scores: { world: 1 } },
      { text: '"이 사람과의 관계엔 말 못 할 사연이 있다"', scores: { relation: 1, world: -1 } },
      { text: '"평범해 보였던 일상에 작은 균열이 생긴다"', scores: { world: -2, intensity: -1 } },
    ],
  },

  // [클라이맥스] 가장 두근거리는 순간
  {
    id: 10,
    stage: 'climax',
    text: '이야기에서 가장 손에 땀을 쥐게 되는 순간은?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '모든 걸 건 거대한 최종 결전의 한복판', scores: { intensity: 2 } },
      { text: '동료와 함께 위기를 넘기며 터지는 합', scores: { relation: 2 } },
      { text: '감춰졌던 진실이 한순간에 드러나는 순간', scores: { world: 2 } },
      { text: '인물들의 감정이 폭발하듯 터져나오는 장면', scores: { relation: 1, intensity: -1 } },
    ],
  },
  {
    id: 11,
    stage: 'climax',
    text: '클라이맥스에서 가장 짜릿한 카타르시스를 느끼는 포인트는?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '압도적인 힘으로 모든 걸 쓸어버리는 순간', scores: { intensity: 2, relation: -1 } },
      { text: '함께 쌓아온 신뢰가 결정적인 순간 빛을 발할 때', scores: { relation: 2 } },
      { text: '세계의 비밀이 맞아떨어지며 모든 게 이해되는 순간', scores: { world: 2 } },
      { text: '거창하지 않아도 마음 깊이 와닿는 잔잔한 한마디', scores: { intensity: -2 } },
    ],
  },
  {
    id: 12,
    stage: 'climax',
    text: '절정의 순간, 주인공 곁에 누가 있을 때 더 마음이 동할까?',
    axis: ['relation', 'intensity'],
    answers: [
      { text: '끝까지 함께한 동료들 전원', scores: { relation: 2 } },
      { text: '둘도 없는 단 한 명의 단짝', scores: { relation: 1 } },
      { text: '결국 자기 자신의 힘만으로', scores: { relation: -2, intensity: 1 } },
      { text: '곁에 누가 있는지보다 그 순간의 감정 자체', scores: { relation: -1, intensity: -1 } },
    ],
  },

  // [결말] 엔딩의 여운
  {
    id: 13,
    stage: 'ending',
    text: '마지막 화를 덮을 때, 어떤 엔딩이 가장 만족스러울까?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '모든 걸 쏟아낸 거대한 최종 결전 뒤의 승리', scores: { intensity: 2 } },
      { text: '함께한 동료들과 웃으며 맞이하는 마무리', scores: { relation: 2 } },
      { text: '긴 여정 끝에 드러나는 세계의 진실과 새로운 시작', scores: { world: 2 } },
      { text: '별다른 사건 없이 잔잔하게 마무리되는 일상', scores: { intensity: -2, world: -1 } },
    ],
  },
  {
    id: 14,
    stage: 'ending',
    text: '엔딩에서 가장 마음에 남는 장면은 어느 쪽일까?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '끝까지 살아남은 자의 벅찬 승리의 순간', scores: { intensity: 2, relation: -1 } },
      { text: '함께 걸어온 이들과 나누는 마지막 인사', scores: { relation: 2 } },
      { text: '모든 떡밥이 회수되며 드러나는 세계의 전모', scores: { world: 2 } },
      { text: '주인공 혼자 조용히 써 내려가는 마지막 페이지', scores: { relation: -2, intensity: -2 } },
    ],
  },
  {
    id: 15,
    stage: 'ending',
    text: '이야기가 끝난 뒤에도 가장 오래 머무는 여운은?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '"그 결전의 순간이 아직도 생생하다"', scores: { intensity: 2 } },
      { text: '"그 인물들의 관계가 계속 마음에 남는다"', scores: { relation: 2 } },
      { text: '"그 세계가 아직도 머릿속에 펼쳐진다"', scores: { world: 2 } },
      { text: '"그냥 마음이 따뜻해지는 잔잔한 기분이 남는다"', scores: { intensity: -2, world: -1 } },
    ],
  },

  // [다 읽고] 덮은 후 기분, 다음 작품
  {
    id: 16,
    stage: 'afterglow',
    text: '마지막 페이지를 덮은 직후, 가장 먼저 드는 생각은?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '"심장이 아직도 두근거린다, 다음 화는 언제 나오지"', scores: { intensity: 2 } },
      { text: '"이 동료들이랑 더 오래 함께하고 싶었는데"', scores: { relation: 2 } },
      { text: '"이 세계관, 더 깊이 파고들고 싶다"', scores: { world: 2 } },
      { text: '"마음이 편안해지네, 잠깐 이대로 있고 싶다"', scores: { intensity: -2, world: -1 } },
    ],
  },
  {
    id: 17,
    stage: 'afterglow',
    text: '다음에 손이 가는 작품은 어떤 쪽일까?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '못지않게 강렬한 전투와 박진감 넘치는 작품', scores: { intensity: 2 } },
      { text: '비슷한 매력의 인물 관계가 담긴 작품', scores: { relation: 2 } },
      { text: '새로운 세계관을 탐험할 수 있는 작품', scores: { world: 2 } },
      { text: '잔잔하게 마음을 쉬게 해줄 수 있는 작품', scores: { intensity: -2, world: -1 } },
    ],
  },
  {
    id: 18,
    stage: 'afterglow',
    text: '이 작품 이야기를 누군가와 나눈다면, 가장 먼저 무슨 말을 하게 될까?',
    axis: ['intensity', 'relation', 'world'],
    answers: [
      { text: '"그 전투 장면 진짜 미쳤더라"', scores: { intensity: 2 } },
      { text: '"그 둘 케미 봤어? 진짜 못 참겠더라"', scores: { relation: 2 } },
      { text: '"그 세계관 설정 너무 신선하지 않아?"', scores: { world: 2 } },
      { text: '"그냥… 보고 나니까 마음이 편안해지더라"', scores: { intensity: -2, world: -1 } },
    ],
  },
]
