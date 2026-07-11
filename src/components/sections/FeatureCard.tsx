import type { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-white/10 bg-base-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt-bright/40 hover:shadow-glow-cobalt">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cobalt-bright/30 bg-cobalt-bright/10 text-cobalt-bright">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}
