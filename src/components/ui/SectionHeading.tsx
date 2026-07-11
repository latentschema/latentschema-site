interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment} max-w-2xl`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">{heading}</h2>
      {subheading && <p className="text-lg leading-relaxed text-slate-400">{subheading}</p>}
    </div>
  )
}
