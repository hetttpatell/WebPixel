export default function Badge({
  children,
  className = '',
  bg = 'bg-vivid-yellow',
  rotate = '',
}) {
  return (
    <span
      className={`inline-block font-sans font-black text-xs uppercase tracking-widest px-3.5 py-1.5 border-2 border-black text-ink shadow-[2px_2px_0px_0px_#000] select-none rounded-none ${bg} ${rotate} ${className}`}
    >
      {children}
    </span>
  )
}
