export default function HairlineCard({
  children,
  className = '',
  variant = 'dark',
  hover = true,
}) {
  const bg = variant === 'dark' ? 'bg-white' : 'bg-canvas'
  const hoverClasses = hover
    ? 'hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]'
    : ''

  return (
    <div
      className={`group relative rounded-none border-4 border-black text-ink shadow-[6px_6px_0px_0px_#000] transition-all duration-200 ${bg} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  )
}
