const PULSE_BLOCK = 'animate-pulse rounded-full bg-[#E8E8E8]'
const PULSE_PANEL = 'animate-pulse rounded-2xl bg-[#F5F5F5]'

export default function ResultSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 bg-white px-4 pb-12">
      <div className="h-8 pt-6" />

      {/* 히어로 섹션 skeleton */}
      <section className={`flex flex-col items-center gap-3 px-6 py-12 ${PULSE_PANEL}`}>
        <div className={`h-20 w-20 ${PULSE_BLOCK} bg-[#E8E8E8]`} />
        <div className={`h-4 w-32 ${PULSE_BLOCK}`} />
        <div className={`h-7 w-40 ${PULSE_BLOCK}`} />
        <div className={`h-4 w-56 ${PULSE_BLOCK}`} />
      </section>

      {/* 1위 추천 작품 카드 skeleton (이미지 + 텍스트) */}
      <section className="flex gap-4 rounded-3xl border border-zinc-200 px-4 py-4">
        <div className={`aspect-[2/3] w-24 shrink-0 rounded-xl ${PULSE_PANEL}`} />
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className={`h-3 w-24 ${PULSE_BLOCK}`} />
          <div className={`h-5 w-32 ${PULSE_BLOCK}`} />
          <div className={`h-3 w-full ${PULSE_BLOCK}`} />
          <div className={`h-3 w-3/4 ${PULSE_BLOCK}`} />
        </div>
      </section>

      {/* 취향 스탯 바 skeleton (4개) */}
      <section className="flex flex-col gap-3">
        <div className={`h-5 w-24 ${PULSE_BLOCK}`} />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`h-3 w-12 shrink-0 ${PULSE_BLOCK}`} />
              <div className={`h-2.5 flex-1 ${PULSE_PANEL}`} />
              <div className={`h-3 w-9 shrink-0 ${PULSE_BLOCK}`} />
            </div>
          ))}
        </div>
      </section>

      {/* 추천 작품 카드 skeleton (3개) */}
      <section className="flex flex-col gap-3">
        <div className={`h-5 w-32 ${PULSE_BLOCK}`} />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
              <div className={`aspect-[2/3] w-16 shrink-0 rounded-lg ${PULSE_PANEL}`} />
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className={`h-4 w-28 ${PULSE_BLOCK}`} />
                <div className={`h-3 w-20 ${PULSE_BLOCK}`} />
                <div className={`h-3 w-full ${PULSE_BLOCK}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
