export type ButtonVariant = 'primary' | 'outline' | 'light' | 'outline-light'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-forest',
  outline: 'border border-ink/20 text-ink hover:border-ink',
  light: 'bg-paper text-ink hover:bg-sand',
  'outline-light': 'border border-paper/30 text-paper hover:border-paper',
}

export const buttonClass = (variant: ButtonVariant = 'primary') =>
  `inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm whitespace-nowrap font-medium tracking-wide transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.97] ${variants[variant]}`

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
