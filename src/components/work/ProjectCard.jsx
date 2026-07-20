import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import HairlineCard from '../ui/HairlineCard'
import RefCodeTag from '../ui/RefCodeTag'
import SpecLine from '../ui/SpecLine'
import Badge from '../ui/Badge'

export default function ProjectCard({ project, index }) {
  return (
    <HairlineCard className="overflow-hidden h-full hover:shadow-[14px_14px_0px_0px_#000] flex flex-col justify-between">
      <div>
        <RefCodeTag code={`${String(index + 1).padStart(2, '0')}A`} />

        {/* Real Landing Page Image Header */}
        <Link to={`/work/${project.slug}`} className="block">
          <div className="aspect-[16/10] bg-vivid-yellow border-b-4 border-black relative overflow-hidden flex items-center justify-center group">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-grid-faint opacity-30" />
                <span className="font-sans font-black text-6xl md:text-7xl text-black select-none tracking-tighter opacity-20 group-hover:scale-105 transition-transform duration-200">
                  {project.slug.toUpperCase().slice(0, 5)}
                </span>
              </>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {project.isProduct ? (
              <Badge bg="bg-vivid-yellow text-black" className="text-[9px] px-2 py-0.5 border font-black">
                IN-HOUSE SAAS PRODUCT
              </Badge>
            ) : (
              <Badge bg="bg-accent-mint text-black" className="text-[9px] px-2 py-0.5 border font-bold">
                LIVE CLIENT SITE
              </Badge>
            )}
            {project.tags.map((tag) => (
              <Badge key={tag} bg="bg-soft-violet" className="text-[9px] px-2 py-0.5 border">
                {tag}
              </Badge>
            ))}
          </div>

          <Link to={`/work/${project.slug}`}>
            <h3 className="font-sans text-xl font-black text-ink mb-2 uppercase tracking-tight hover:text-hot-red transition-colors">
              {project.title}
            </h3>
          </Link>
          
          <SpecLine text={`${project.client} — ${project.year}`} className="mb-4" />
        </div>
      </div>

      {/* Action Links Row */}
      <div className="p-6 pt-0 bg-white flex justify-between items-center border-t-2 border-black/10 mt-auto">
        <Link
          to={`/work/${project.slug}`}
          className="font-mono text-xs font-black uppercase text-black hover:text-hot-red underline"
        >
          View Case Study →
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] font-black uppercase tracking-wider text-black bg-vivid-yellow border-2 border-black px-2.5 py-1 hover:bg-black hover:text-white transition-colors"
          >
            <span>Visit Live</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </HairlineCard>
  )
}
