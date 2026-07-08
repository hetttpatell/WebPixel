/**
 * GridTexture — Faint grid overlay, decorative only
 */
export default function GridTexture({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 bg-grid-faint pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
