import Link from 'next/link'

export const metadata = {
  title: '개인정보 처리방침 | manga 취향 테스트',
  description: 'manga 취향 테스트 서비스의 개인정보 처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 bg-white px-4 pb-16">
      <header className="flex items-center gap-3 pt-6">
        <Link href="/" aria-label="홈으로 가기" className="text-xl text-zinc-400 transition-colors hover:text-zinc-700">
          ←
        </Link>
        <h1 className="text-lg font-bold text-zinc-900">개인정보 처리방침</h1>
      </header>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-zinc-700">
        <p>
          manga 취향 테스트(이하 &ldquo;서비스&rdquo;)를 운영하는 안제경(이하 &ldquo;운영자&rdquo;)은 이용자의 개인정보를
          소중히 여기며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 노력하고 있습니다. 본 방침은 서비스 이용과
          관련하여 개인정보가 어떻게 처리되는지 안내합니다.
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">1. 수집하는 개인정보 항목</h2>
          <p>
            본 서비스는 회원가입 및 로그인 절차 없이 누구나 이용할 수 있는 비로그인 서비스이며, 이름·이메일·전화번호
            등 이용자를 식별할 수 있는 개인정보를 별도로 수집하지 않습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">2. 개인정보의 수집 및 이용 목적</h2>
          <p>
            운영자는 개인정보를 수집하지 않으므로 별도의 수집·이용 목적이 없습니다. 다만 서비스 이용 현황을 파악하고
            품질을 개선하기 위해 아래와 같은 분석 도구 및 외부 SDK를 사용합니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">3. Google Analytics 이용에 관한 사항</h2>
          <p>
            본 서비스는 Google에서 제공하는 웹 분석 도구인 Google Analytics(GA4)를 통해 방문자 수, 페이지 조회,
            이용 패턴 등 익명의 통계 정보를 수집합니다. 이 과정에서 수집되는 정보는 특정 개인을 식별할 수 없는
            형태로 처리되며, Google의 개인정보 처리방침에 따라 관리됩니다. 이용자는 브라우저 설정을 통해 쿠키 저장을
            거부하거나 Google에서 제공하는 분석 차단 도구를 사용하여 수집을 거부할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">4. 카카오 공유 SDK 이용에 관한 사항</h2>
          <p>
            본 서비스는 결과 공유 기능을 제공하기 위해 카카오(Kakao)에서 제공하는 공유 SDK(Kakao Share)를
            사용합니다. 이용자가 공유 버튼을 직접 클릭하는 경우에 한하여 SDK가 동작하며, 이 과정에서 처리되는
            정보는 카카오의 개인정보 처리방침을 따릅니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">5. 개인정보의 제3자 제공</h2>
          <p>운영자는 이용자의 개인정보를 별도로 수집·보유하지 않으므로, 개인정보를 제3자에게 제공하지 않습니다.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">6. 쿠키(Cookie)의 운영</h2>
          <p>
            서비스는 이용 통계 분석을 위해 Google Analytics 등 외부 도구에서 쿠키를 사용할 수 있습니다. 이용자는
            웹 브라우저의 옵션 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 일부 기능 이용에 제한이 있을 수
            있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">7. 이용자의 권리와 행사 방법</h2>
          <p>
            운영자는 이용자의 개인정보를 별도로 보유·관리하지 않으므로 열람, 정정, 삭제 등을 요청할 개인정보가
            존재하지 않습니다. 서비스 이용과 관련하여 궁금한 점이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">8. 개인정보 보호책임자 및 문의처</h2>
          <p>운영자: 안제경</p>
          <p>
            이메일:{' '}
            <a href="mailto:anjmo456@naver.com" className="font-medium text-[#D85A30] underline-offset-2 hover:underline">
              anjmo456@naver.com
            </a>
          </p>
          <p>
            서비스 이용 중 발생한 개인정보 관련 문의나 불만 사항은 위 이메일로 접수해 주시면 신속하고 성실하게
            답변드리겠습니다.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-zinc-900">9. 고지의 의무</h2>
          <p>
            본 방침은 관련 법령, 정책 또는 서비스 내용의 변경에 따라 추가·삭제 및 수정될 수 있으며, 변경 시에는
            서비스 내 공지를 통해 고지합니다.
          </p>
        </section>

        <p className="text-xs text-zinc-400">시행일자: 2026년 6월 8일</p>
      </div>
    </div>
  )
}
