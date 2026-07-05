interface AuthorAvatarProps {
  name: string
  className?: string
}

export default function AuthorAvatar({ name, className = '' }: AuthorAvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pomelo-blue to-pomelo-purple text-xs font-bold text-white ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
