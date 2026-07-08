export default function Card({
  children,
  className = '',
  bg = 'bg-white',
  hover = true,
  ...props
}) {
  const hoverClasses = hover
    ? 'hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000]'
    : ''

  return (
    <div
      className={`rounded-none border-4 border-black p-8 text-ink shadow-[8px_8px_0px_0px_#000] transition-all duration-200 ${bg} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
