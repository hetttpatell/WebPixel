/**
 * BookingEmbed — Cal.com iframe placeholder
 */
export default function BookingEmbed({ calUrl = 'https://cal.com' }) {
  return (
    <div className="border border-fog/20 rounded overflow-hidden bg-canvas-dark/50">
      <div className="p-4 border-b border-fog/10">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-fog">
          [BOOKING — CAL.COM EMBED]
        </p>
      </div>
      <div className="aspect-[4/3] relative">
        <iframe
          src={calUrl}
          title="Book a call"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}
