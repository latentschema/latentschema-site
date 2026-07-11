import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const baseStyles =
  'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border border-cobalt-bright/60 bg-cobalt text-white shadow-glow-cobalt hover:brightness-110 hover:-translate-y-0.5 focus-visible:ring-cobalt-bright',
  secondary:
    'border border-white/15 bg-white/5 text-slate-100 hover:border-cobalt-bright/50 hover:bg-white/[0.08] focus-visible:ring-white/40',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
