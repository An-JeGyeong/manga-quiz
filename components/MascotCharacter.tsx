type MascotCharacterProps = {
  className?: string
}

export default function MascotCharacter({ className }: MascotCharacterProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="manga 취향 테스트 마스코트"
      className={className}
    >
      <circle cx="60" cy="60" r="56" fill="#FAEEDA" />
      <circle cx="60" cy="66" r="40" fill="#FFFFFF" />
      <circle cx="46" cy="62" r="6" fill="#712B13" />
      <circle cx="74" cy="62" r="6" fill="#712B13" />
      <path d="M48 80 Q60 90 72 80" stroke="#D85A30" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M40 44 Q46 36 54 40" stroke="#D85A30" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M80 44 Q74 36 66 40" stroke="#D85A30" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}
