import { useState } from 'react'
import SpecLine from './SpecLine'
import HairlineCard from './HairlineCard'

const categories = {
  All: [
    { name: 'React', type: 'Frontend' },
    { name: 'Next.js', type: 'Frontend' },
    { name: 'TypeScript', type: 'Frontend' },
    { name: 'Tailwind CSS', type: 'Frontend' },
    { name: 'Node.js', type: 'Backend' },
    { name: 'Express', type: 'Backend' },
    { name: 'Laravel', type: 'Backend' },
    { name: 'Django', type: 'Backend' },
    { name: 'PostgreSQL', type: 'Database' },
    { name: 'MongoDB', type: 'Database' },
    { name: 'Supabase', type: 'Database' },
    { name: 'Firebase', type: 'Database' },
    { name: 'AWS', type: 'Cloud' },
    { name: 'Vercel', type: 'Cloud' },
    { name: 'Docker', type: 'Cloud' },
    { name: 'OpenAI', type: 'AI' },
    { name: 'LangChain', type: 'AI' },
    { name: 'Twilio', type: 'AI' },
    { name: 'Meta API', type: 'AI' },
  ],
  Frontend: [
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'TypeScript' },
    { name: 'Tailwind CSS' },
  ],
  Backend: [
    { name: 'Node.js' },
    { name: 'Express' },
    { name: 'Laravel' },
    { name: 'Django' },
  ],
  Database: [
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'Supabase' },
    { name: 'Firebase' },
  ],
  Cloud: [
    { name: 'AWS' },
    { name: 'Vercel' },
    { name: 'Docker' },
  ],
  AI: [
    { name: 'OpenAI' },
    { name: 'LangChain' },
    { name: 'Twilio' },
    { name: 'Meta API' },
  ],
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <div className="w-full">
      {/* Category selector */}
      <div className="flex flex-wrap gap-3 mb-10">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 font-sans font-black text-xs uppercase tracking-widest border-2 border-black cursor-pointer select-none transition-all duration-100 shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              activeTab === cat
                ? 'bg-hot-red text-ink'
                : 'bg-white text-ink hover:bg-vivid-yellow hover:-rotate-1'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories[activeTab].map((tech) => (
          <HairlineCard
            key={tech.name}
            className="p-6 flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_#000] border-2 bg-white"
            hover={true}
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-fog mb-2">
                {tech.type || activeTab}
              </p>
              <h4 className="font-sans font-black text-lg text-ink uppercase tracking-tight">
                {tech.name}
              </h4>
            </div>
            <div className="mt-6 border-t-2 border-black/10 pt-3 flex justify-between items-center">
              <span className="font-mono text-[10px] text-hot-red font-bold">READY</span>
              <span className="w-2.5 h-2.5 bg-accent-mint border border-black rounded-full" />
            </div>
          </HairlineCard>
        ))}
      </div>
    </div>
  )
}
