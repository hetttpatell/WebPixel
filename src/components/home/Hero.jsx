import { useState, useRef } from 'react'
import { Cpu, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import SpecLine from '../ui/SpecLine'
import GridTexture from '../ui/GridTexture'

export default function Hero() {
  // SVG Cursor Coordinates State
  const [coords, setCoords] = useState({ x: 200, y: 200 })
  const [isHovered, setIsHovered] = useState(false)
  const svgRef = useRef(null)



  // Handle Mouse Movement inside the SVG Container
  const handleMouseMove = (e) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    // Bound the values inside the SVG viewBox coordinates (0 to 400)
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 400)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 400)
    setCoords({
      x: Math.max(0, Math.min(400, x)),
      y: Math.max(0, Math.min(400, y)),
    })
  }

  // Calculate Parallax Skew from the center (200, 200)
  const dx = (coords.x - 200) / 10
  const dy = (coords.y - 200) / 10

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center border-b-4 border-black py-16 lg:py-24 bg-canvas overflow-hidden">
      <GridTexture />

      {/* Grid-breach element — oversized numeral */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 font-mono text-[24rem] font-bold leading-none text-black/[0.02] select-none pointer-events-none"
        aria-hidden="true"
      >
        01
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column — Content & Terminal (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges */}
            <div className="inline-flex gap-3 mb-2 flex-wrap">
              <Badge rotate="-rotate-1" bg="bg-vivid-yellow">
                PREMIUM SOFTWARE ENGINEERING
              </Badge>
              <Badge rotate="rotate-2" bg="bg-soft-violet">
                DESIGN STUDIO
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-[70px] xl:text-[82px] uppercase leading-[0.95] tracking-tighter text-ink">
              WE ENGINEER <br />
              <span className="text-stroke-3 block sm:inline">HIGH-PERFORMANCE</span> <br />
              DIGITAL SYSTEMS.
            </h1>

            {/* Description */}
            <p className="font-sans font-bold text-base sm:text-lg max-w-2xl text-ink/80 leading-relaxed">
              We build custom software, web platforms, and mobile apps that power enterprise operations. No templates. No shortcuts. Just high-impact technology engineered to scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button href="/estimate-project" variant="primary" className="shadow-[4px_4px_0px_0px_#000]">
                START PROJECT <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="/work" variant="outline" className="shadow-[4px_4px_0px_0px_#000]">
                EXPLORE CASE STUDIES
              </Button>
            </div>
          </div>

          {/* Right Column — SVG Canvas Widget (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={svgRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false)
                setCoords({ x: 200, y: 200 })
              }}
              className="relative w-full max-w-[420px] aspect-square border-4 border-black bg-white shadow-neo-md hover:shadow-neo-lg transition-all duration-300 select-none overflow-hidden cursor-crosshair"
            >
              {/* Corner Indicators */}
              <div className="absolute top-2 left-3 font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                [Calibration Grid]
              </div>
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3 h-3 text-accent-cobalt" /> Core v1.0
              </div>

              {/* Dynamic Interactive SVG */}
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  {/* Technical graph grid pattern */}
                  <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* Grid Overlay */}
                <rect width="400" height="400" fill="url(#blueprint-grid)" />

                {/* Self-contained CSS Animations */}
                <style>{`
                  @keyframes spin-clockwise {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes spin-counter {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                  }
                  .spin-slow {
                    animation: spin-clockwise 24s linear infinite;
                    transform-origin: 200px 200px;
                  }
                  .spin-reverse {
                    animation: spin-counter 16s linear infinite;
                    transform-origin: 200px 200px;
                  }
                `}</style>

                {/* Outer tech circles & orbits */}
                <circle cx="200" cy="200" r="170" stroke="black" strokeWidth="1.5" strokeDasharray="4 8" className="spin-slow opacity-30" />
                <circle cx="200" cy="200" r="140" stroke="black" strokeWidth="2" strokeDasharray="30 40 10 10" className="spin-reverse opacity-50" />
                <circle cx="200" cy="200" r="110" stroke="black" strokeWidth="1" strokeDasharray="5 5" className="opacity-40" />

                {/* Crosshairs alignment marks */}
                <line x1="200" y1="10" x2="200" y2="390" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="10" y1="200" x2="390" y2="200" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Target rings */}
                <circle cx="200" cy="200" r="10" stroke="black" strokeWidth="1.5" className="opacity-20" />
                <circle cx="200" cy="200" r="3" fill="black" className="opacity-40" />

                {/* 3D Parallax Isometric Wireframe Core */}
                <g style={{ transform: `translate(${dx}px, ${dy}px)`, transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                  {/* We anchor the transform to the center 200,200 */}
                  <g transform="translate(200, 200)">
                    {/* Isometric Cube Faces with Neo-Brutalist Colors */}
                    
                    {/* Top Face (Violet) */}
                    <polygon points="0,-50 43.3,-25 0,0 -43.3,-25" fill="rgba(196,181,253,0.35)" stroke="black" strokeWidth="2.5" />
                    
                    {/* Left Face (Hot Red) */}
                    <polygon points="-43.3,-25 0,0 0,50 -43.3,25" fill="rgba(255,107,107,0.25)" stroke="black" strokeWidth="2.5" />
                    
                    {/* Right Face (Yellow) */}
                    <polygon points="0,0 43.3,-25 43.3,25 0,50" fill="rgba(255,217,61,0.25)" stroke="black" strokeWidth="2.5" />
                    
                    {/* Isometric Grid Breaker Outline */}
                    <polygon points="0,-75 64.9,-37.5 0,0 -64.9,-37.5" fill="none" stroke="#2F5CFF" strokeWidth="1.5" strokeDasharray="3 3" />
                    
                    {/* Inner core points */}
                    <circle cx="0" cy="0" r="5" fill="#2F5CFF" stroke="black" strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="50" stroke="black" strokeWidth="1.5" />
                  </g>
                </g>

                {/* Corner blueprint crosshair markings */}
                <path d="M 15 15 L 25 15 M 20 10 L 20 20" stroke="black" strokeWidth="1.5" />
                <path d="M 375 15 L 385 15 M 380 10 L 380 20" stroke="black" strokeWidth="1.5" />
                <path d="M 15 380 L 25 380 M 20 375 L 20 385" stroke="black" strokeWidth="1.5" />
                <path d="M 375 380 L 385 380 M 380 375 L 380 385" stroke="black" strokeWidth="1.5" />

                {/* Technical text annotations */}
                <text x="25" y="45" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="bold" fill="black">CALIBER_SYS: ENGAGE</text>
                <text x="25" y="60" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="gray">STABILIZER: OK</text>
                
                {isHovered ? (
                  <>
                    <text x="375" y="45" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="black" fill="#2F5CFF">COORD_X: {coords.x}PX</text>
                    <text x="375" y="60" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="black" fill="#2F5CFF">COORD_Y: {coords.y}PX</text>
                    <text x="200" y="375" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="bold" fill="#FF6B6B">SIGNAL_LOCK</text>
                  </>
                ) : (
                  <>
                    <text x="375" y="45" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="gray">X: --</text>
                    <text x="375" y="60" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="gray">Y: --</text>
                    <text x="200" y="375" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="gray">HOVER TO INITIALIZE</text>
                  </>
                )}

                {/* Dynamic Cursor tracking crosshair lines */}
                {isHovered && (
                  <g className="pointer-events-none">
                    {/* Horizontal tracking line */}
                    <line x1="10" y1={coords.y} x2="390" y2={coords.y} stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Vertical tracking line */}
                    <line x1={coords.x} y1="10" x2={coords.x} y2="390" stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Concentric rings at cursor intersection */}
                    <circle cx={coords.x} cy={coords.y} r="5" fill="#FF6B6B" stroke="black" strokeWidth="1.5" />
                    <circle cx={coords.x} cy={coords.y} r="12" fill="none" stroke="#FF6B6B" strokeWidth="1" className="opacity-80 animate-ping" style={{ transformOrigin: `${coords.x}px ${coords.y}px` }} />
                  </g>
                )}
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
