/**
 * MeasurementTick — Decorative dashed measurement line
 * Used in ProcessStrip and other structural elements
 */
export default function MeasurementTick({
  direction = 'horizontal',
  length = '100%',
  className = '',
}) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div
      className={`relative flex items-center ${className}`}
      aria-hidden="true"
      style={{
        width: isHorizontal ? length : '1px',
        height: isHorizontal ? '1px' : length,
      }}
    >
      {/* Dashed line */}
      <div
        className={`${
          isHorizontal ? 'w-full h-px' : 'h-full w-px'
        }`}
        style={{
          backgroundImage: isHorizontal
            ? 'linear-gradient(to right, rgba(154,160,166,0.3) 4px, transparent 4px)'
            : 'linear-gradient(to bottom, rgba(154,160,166,0.3) 4px, transparent 4px)',
          backgroundSize: isHorizontal ? '8px 1px' : '1px 8px',
        }}
      />
      {/* Start tick */}
      <div
        className={`absolute ${
          isHorizontal ? 'left-0 -top-1 w-px h-2' : 'top-0 -left-1 h-px w-2'
        } bg-fog/40`}
      />
      {/* End tick */}
      <div
        className={`absolute ${
          isHorizontal ? 'right-0 -top-1 w-px h-2' : 'bottom-0 -left-1 h-px w-2'
        } bg-fog/40`}
      />
    </div>
  )
}
