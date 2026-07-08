/**
 * RefCodeTag — Corner reference code that reveals on hover
 * Placed inside a HairlineCard (which has group class)
 */
export default function RefCodeTag({ code = '01A', className = '' }) {
  return (
    <span
      className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.15em] text-fog opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      [{code}]
    </span>
  )
}
