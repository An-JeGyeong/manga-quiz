export type Work = {
  title: string
  author: string
  reason: string
  coverUrl?: string // 표지 이미지 URL (MyAnimeList CDN)
  tags?: string[] // MyAnimeList 장르 기반 대표 태그 2~3개
}

export type StatBar = {
  label: string
  value: number // 0~100
}

export type ResultType = {
  key: string // 'HRF' 등 3글자 키
  name: string // 표시 이름
  quote: string // 공유용 한 줄 설명
  works: Work[] // 추천 작품 (최대 4개)
  statBars: StatBar[] // 스탯 바 표시값 (0~100)
}

export const RESULT_TYPES: Record<string, ResultType> = {
  HRF: {
    key: 'HRF',
    name: '성장에 목마른 모험가',
    quote: '함께 부딪히고, 함께 성장하는 그 순간을 위해 만화를 본다',
    works: [
      {
        title: '원피스',
        author: '오다 에이이치로',
        reason: '동료들과 함께 모험하며 성장하는 이야기의 정수',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
        tags: ['#액션', '#모험', '#소년'],
      },
      {
        title: '나의 히어로 아카데미아',
        author: '호리코시 코헤이',
        reason: '동료들과 부딪히며 한계를 넘어서는 뜨거운 성장담',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/1/209370.jpg',
        tags: ['#액션', '#학원', '#초능력'],
      },
      {
        title: '강철의 연금술사',
        author: '아라카와 히로무',
        reason: '형제와 동료가 함께 위기를 헤쳐가는 모험 서사',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/243675.jpg',
        tags: ['#액션', '#모험', '#판타지'],
      },
      {
        title: '귀멸의 칼날',
        author: '고토우게 코요하루',
        reason: '동료와의 유대 속에서 단단해지는 주인공의 성장',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg',
        tags: ['#액션', '#판타지', '#시대극'],
      },
    ],
    statBars: [
      { label: '강도', value: 85 },
      { label: '관계', value: 80 },
      { label: '세계관', value: 75 },
      { label: '성장', value: 90 },
    ],
  },
  HSF: {
    key: 'HSF',
    name: '폭풍 같은 먼치킨러',
    quote: '압도적인 힘으로 모든 걸 쓸어버리는 카타르시스, 그게 진리다',
    works: [
      {
        title: '오버로드',
        author: '마루야마 쿠가네',
        reason: '압도적인 힘을 가진 주인공이 선사하는 짜릿한 카타르시스',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/161407.jpg',
        tags: ['#액션', '#판타지', '#이세계'],
      },
      {
        title: '전생했더니 슬라임이었던 건에 대하여',
        author: '후세',
        reason: '환생 후 압도적인 힘으로 거침없이 성장해가는 먼치킨 판타지',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/167639.jpg',
        tags: ['#판타지', '#이세계', '#환생'],
      },
      {
        title: '던전에서 만남을 추구하면 안 되는 걸까',
        author: '오모리 후지노',
        reason: '판타지 던전을 무대로 펼쳐지는 화려한 성장과 전투',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/121555.jpg',
        tags: ['#액션', '#모험', '#판타지'],
      },
      {
        title: '모브사이코 100',
        author: 'ONE',
        reason: '압도적인 힘을 지닌 주인공의 개성 강한 활약상',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/204842.jpg',
        tags: ['#액션', '#코미디', '#초능력'],
      },
    ],
    statBars: [
      { label: '강도', value: 90 },
      { label: '관계', value: 25 },
      { label: '세계관', value: 85 },
      { label: '성장', value: 60 },
    ],
  },
  HRE: {
    key: 'HRE',
    name: '감정선에 진심인 사람',
    quote: '캐릭터들의 관계와 감정이 무너지는 순간, 같이 무너진다',
    works: [
      {
        title: '진격의 거인',
        author: '이사야마 하지메',
        reason: '치열한 전개 속에서 폭발하는 인물들의 관계와 감정선',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/37846.jpg',
        tags: ['#액션', '#드라마', '#서바이벌'],
      },
      {
        title: '약속의 네버랜드',
        author: '시라이 카이우',
        reason: '한계 상황 속 동료들의 선택이 만드는 강렬한 감정의 파고',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/186922.jpg',
        tags: ['#미스터리', '#심리', '#서바이벌'],
      },
      {
        title: '너의 췌장을 먹고 싶어',
        author: '스미노 요루',
        reason: '관계의 깊이가 감정을 강하게 뒤흔드는 이야기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/191611.jpg',
        tags: ['#드라마', '#로맨스'],
      },
      {
        title: '4월은 너의 거짓말',
        author: '아라카와 나오시',
        reason: '인연을 통해 성장하는 인물들의 감정이 진하게 그려진 작품',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/102691.jpg',
        tags: ['#드라마', '#음악', '#학원'],
      },
    ],
    statBars: [
      { label: '강도', value: 75 },
      { label: '관계', value: 85 },
      { label: '세계관', value: 30 },
      { label: '성장', value: 65 },
    ],
  },
  HSE: {
    key: 'HSE',
    name: '두뇌전 중독 전략가',
    quote: '한 수 앞을 내다보는 심리전이야말로 진짜 액션이다',
    works: [
      {
        title: '데스노트',
        author: '오바 츠구미',
        reason: '끝까지 긴장을 놓을 수 없는 치밀한 두뇌 싸움',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/1/258245.jpg',
        tags: ['#초자연', '#서스펜스', '#심리'],
      },
      {
        title: '카이지',
        author: '후쿠모토 노부유키',
        reason: '벼랑 끝 심리전이 만들어내는 압도적인 몰입감',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/286560.jpg',
        tags: ['#드라마', '#두뇌게임', '#전략'],
      },
      {
        title: '히카루의 바둑',
        author: '호타 유미',
        reason: '한 수 한 수에 모든 걸 거는 진검승부의 재미',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/170574.jpg',
        tags: ['#드라마', '#초자연', '#전략'],
      },
      {
        title: '주술회전',
        author: '아쿠타미 게게',
        reason: '전략과 두뇌 싸움이 살아있는 박진감 넘치는 전투',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/210341.jpg',
        tags: ['#액션', '#초자연', '#학원'],
      },
    ],
    statBars: [
      { label: '강도', value: 80 },
      { label: '관계', value: 25 },
      { label: '세계관', value: 30 },
      { label: '성장', value: 55 },
    ],
  },
  LRF: {
    key: 'LRF',
    name: '판타지 로맨스 감수성러',
    quote: '마법 같은 세계에서 피어나는 잔잔한 설렘이 좋다',
    works: [
      {
        title: '장송의 프리렌',
        author: '야마다 칸나',
        reason: '판타지 세계를 배경으로 천천히 쌓여가는 따뜻한 인연',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/232121.jpg',
        tags: ['#모험', '#드라마', '#판타지'],
      },
      {
        title: '늑대와 향신료',
        author: '하세쿠라 이스나',
        reason: '신비로운 여정 속에서 차곡차곡 쌓이는 두 사람의 케미',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/153861.jpg',
        tags: ['#판타지', '#로맨스', '#초자연'],
      },
      {
        title: '마법사의 신부',
        author: '야마자키 코레',
        reason: '신비로운 세계관 속에서 조용히 피어나는 사랑 이야기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/121263.jpg',
        tags: ['#판타지', '#로맨스', '#신화'],
      },
      {
        title: '신부 이야기',
        author: '모리 카오루',
        reason: '이국적인 세계관 속에 담긴 따뜻한 인연의 기록',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/188950.jpg',
        tags: ['#로맨스', '#시대극', '#청년'],
      },
    ],
    statBars: [
      { label: '강도', value: 30 },
      { label: '관계', value: 80 },
      { label: '세계관', value: 80 },
      { label: '성장', value: 50 },
    ],
  },
  LSF: {
    key: 'LSF',
    name: '세계관 덕후 설계자',
    quote: '정교하게 짜인 세계관 설정만 봐도 배가 부르다',
    works: [
      {
        title: '메이드 인 어비스',
        author: '츠카시 아키히토',
        reason: '치밀하게 설계된 세계관과 압도적인 설정의 깊이',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/161645.jpg',
        tags: ['#모험', '#드라마', '#판타지'],
      },
      {
        title: '던전밥',
        author: '쿠이 료코',
        reason: '디테일한 세계관 설정을 파고드는 재미가 가득한 작품',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/148949.jpg',
        tags: ['#모험', '#판타지', '#요리'],
      },
      {
        title: '헌터×헌터',
        author: '토가시 요시히로',
        reason: '정교하게 짜인 「념」 능력 체계와 세계관을 파고드는 재미',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/253119.jpg',
        tags: ['#액션', '#모험', '#판타지'],
      },
      {
        title: '노 게임 노 라이프',
        author: '카미야 유우',
        reason: '독특한 규칙으로 짜인 세계관을 탐구하는 즐거움',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/209665.jpg',
        tags: ['#판타지', '#이세계', '#전략'],
      },
    ],
    statBars: [
      { label: '강도', value: 25 },
      { label: '관계', value: 25 },
      { label: '세계관', value: 90 },
      { label: '성장', value: 45 },
    ],
  },
  LRE: {
    key: 'LRE',
    name: '일상 속 힐링 수집가',
    quote: '소소한 하루와 사람 사이의 온기를 모으는 게 취미',
    works: [
      {
        title: '요츠바랑!',
        author: '아즈마 키요히코',
        reason: '평범한 하루 속 작은 행복을 모으는 따뜻한 이야기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/5/259524.jpg',
        tags: ['#코미디', '#일상', '#힐링'],
      },
      {
        title: '유루캠△',
        author: '아후로',
        reason: '잔잔한 일상 속에서 천천히 쌓여가는 우정과 온기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/1/168083.jpg',
        tags: ['#일상', '#힐링'],
      },
      {
        title: '심야식당',
        author: '아베 야로',
        reason: '작은 공간에 모인 사람들이 만들어내는 잔잔한 인연',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/1/27502.jpg',
        tags: ['#일상', '#요리', '#청년'],
      },
      {
        title: '바닷마을 다이어리',
        author: '요시다 아키미',
        reason: '네 자매가 함께 보내는 일상이 주는 잔잔한 위로',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/219711.jpg',
        tags: ['#드라마', '#일상', '#소녀'],
      },
    ],
    statBars: [
      { label: '강도', value: 20 },
      { label: '관계', value: 80 },
      { label: '세계관', value: 25 },
      { label: '성장', value: 40 },
    ],
  },
  LSE: {
    key: 'LSE',
    name: '현실 공감 스토리텔러',
    quote: '특별할 것 없는 하루도, 결국엔 다 이야기가 된다',
    works: [
      {
        title: '목소리의 형태',
        author: '오이마 요시토키',
        reason: '관계의 어려움과 자기 자신과의 화해를 섬세하게 그린 이야기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/1/120529.jpg',
        tags: ['#드라마', '#소년'],
      },
      {
        title: '허니와 클로버',
        author: '우미노 치카',
        reason: '평범한 청춘들의 고민과 성장이 담담하게 담긴 작품',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/3/184591.jpg',
        tags: ['#드라마', '#로맨스', '#일상'],
      },
      {
        title: '슬램덩크',
        author: '이노우에 다케히코',
        reason: '현실적인 성장통 속에서 빛나는 인물들의 이야기',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/258749.jpg',
        tags: ['#스포츠', '#학원', '#소년'],
      },
      {
        title: '기생수',
        author: '이와아키 히토시',
        reason: '현실적인 갈등 속에서 드러나는 인간에 대한 깊은 통찰',
        coverUrl: 'https://cdn.myanimelist.net/images/manga/2/188928.jpg',
        tags: ['#액션', '#SF', '#심리'],
      },
    ],
    statBars: [
      { label: '강도', value: 20 },
      { label: '관계', value: 30 },
      { label: '세계관', value: 20 },
      { label: '성장', value: 35 },
    ],
  },
}
