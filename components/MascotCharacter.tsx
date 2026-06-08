import Image from 'next/image'

type MascotCharacterProps = {
  className?: string
}

export default function MascotCharacter({ className }: MascotCharacterProps) {
  return (
    <Image
      src="/mascot.png"
      alt="manga 취향 테스트 마스코트"
      width={200}
      height={200}
      className={className}
    />
  )
}
