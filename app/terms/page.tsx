import Link from 'next/link'

export const metadata = {
  title: '이용약관 | 일본 만화 취향 테스트',
  description: '일본 만화 취향 테스트 서비스의 이용약관입니다.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 bg-white px-4 pb-16">
      <header className="flex items-center gap-3 pt-6">
        <Link href="/" aria-label="홈으로 가기" className="text-xl text-zinc-400 transition-colors hover:text-zinc-700">
          ←
        </Link>
        <h1 className="text-lg font-bold text-zinc-900">이용약관</h1>
      </header>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-zinc-700">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제1조 (목적)</h2>
          <p>
            이 약관은 안제경(이하 &ldquo;운영자&rdquo;)이 제공하는 일본 만화 취향 테스트 서비스(이하 &ldquo;서비스&rdquo;)의
            이용과 관련하여 운영자와 이용자 간의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제2조 (서비스의 내용)</h2>
          <p>
            운영자는 이용자가 제시된 질문에 응답하면 그 결과를 바탕으로 일본 만화 취향 유형을 안내하는 콘텐츠 서비스를
            제공합니다. 본 서비스는 별도의 회원가입 절차 없이 누구나 이용할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제3조 (서비스 이용료)</h2>
          <p>
            본 서비스는 무료로 제공되며, 이용자는 서비스 이용과 관련하여 어떠한 대가도 지급하지 않습니다. 다만
            운영자는 서비스 운영을 위하여 서비스 내에 광고를 게재할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제4조 (저작권 및 콘텐츠의 귀속)</h2>
          <p>
            서비스 내에서 제공되는 질문, 결과 유형 설명, 일러스트, 디자인 등 모든 콘텐츠에 대한 저작권 및
            지적재산권은 운영자에게 귀속됩니다. 이용자는 운영자의 사전 동의 없이 이를 복제·전송·출판·배포 등의
            방법으로 영리 목적으로 이용하거나 제3자에게 이용하게 할 수 없습니다. 다만 서비스 결과를 개인적인
            용도로 캡처하거나 SNS 등에 공유하는 행위는 허용됩니다.
          </p>
          <p>
            서비스에서 소개되는 추천 작품 정보(제목, 작가, 표지 이미지 등)에 대한 권리는 각 원저작자 및
            권리자에게 있으며, 운영자는 이용자에게 해당 작품을 소개할 목적으로만 이를 인용·게재합니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제5조 (서비스 이용의 제한 및 중단)</h2>
          <p>
            운영자는 시스템 점검, 서버 장애, 운영상 필요 등의 사유로 서비스의 전부 또는 일부를 일시적으로
            중단할 수 있으며, 이 경우 사전에 고지하는 것을 원칙으로 하되 부득이한 경우 사후에 통지할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제6조 (면책조항)</h2>
          <p>
            1. 본 서비스가 제공하는 결과는 재미를 위한 콘텐츠로, 그 정확성이나 신뢰성을 보장하지 않으며 이용자는
            이를 참고용으로만 활용해야 합니다.
            <br />
            2. 운영자는 천재지변, 불가항력적 사유 또는 이용자의 귀책사유로 인해 서비스를 제공할 수 없는 경우에
            대해 책임을 지지 않습니다.
            <br />
            3. 운영자는 이용자가 서비스를 통해 기대하는 효과를 얻지 못하였거나 서비스를 통해 얻은 정보로 인해
            발생한 손해에 대해 책임을 지지 않습니다.
            <br />
            4. 운영자는 이용자 상호 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 개입할 의무가
            없으며, 이로 인한 손해를 배상할 책임도 지지 않습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제7조 (약관의 변경)</h2>
          <p>
            운영자는 관련 법령을 위반하지 않는 범위에서 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은
            서비스 내 공지 등을 통해 고지한 시점부터 효력이 발생합니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">제8조 (문의)</h2>
          <p>서비스 이용과 관련한 문의사항은 아래 이메일로 연락해 주시기 바랍니다.</p>
          <p>
            이메일:{' '}
            <a href="mailto:anjmo456@naver.com" className="font-medium text-[#D85A30] underline-offset-2 hover:underline">
              anjmo456@naver.com
            </a>
          </p>
        </section>

        <p className="text-xs text-zinc-400">시행일자: 2026년 6월 8일</p>
      </div>
    </div>
  )
}
