/**
 * SpecLine — Mono caption used beneath every major headline
 * [CALIBER Design System]
 */
export default function SpecLine({ text, className = '' }) {
  return (
    <p
      className={`font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink select-none ${className}`}
      aria-hidden="true"
    >
      [{text}]
    </p>
  )
}
