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
      <path
        d="M30 92 C24 102 14 110 6 113 C16 116 32 110 44 98 C40 95 34 92 30 92 Z"
        fill="#FFF3EF"
        stroke="#F2380F"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <ellipse cx="64" cy="54" rx="50" ry="42" fill="#FFF3EF" stroke="#F2380F" strokeWidth="6" />
      <circle cx="48" cy="54" r="7" fill="#3A160A" />
      <circle cx="80" cy="54" r="7" fill="#3A160A" />
      <path d="M60 70 Q70 76 80 70" stroke="#3A160A" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
