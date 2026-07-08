import { Link } from 'react-router'
import HairlineCard from '../ui/HairlineCard'
import RefCodeTag from '../ui/RefCodeTag'
import SpecLine from '../ui/SpecLine'
import Badge from '../ui/Badge'

export default function ProjectCard({ project, index }) {
  return (
    <Link to={`/work/${project.slug}`} className="block">
      <HairlineCard className="overflow-hidden h-full hover:shadow-[14px_14px_0px_0px_#000]">
        <RefCodeTag code={`${String(index + 1).padStart(2, '0')}A`} />

        {/* Image area */}
        <div className="aspect-[16/10] bg-vivid-yellow border-b-4 border-black relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-faint opacity-30" />
          <span className="font-sans font-black text-6xl md:text-8xl text-black select-none tracking-tighter opacity-15">
            {project.slug.toUpperCase().slice(0, 4)}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {project.tags.map((tag) => (
              <Badge key={tag} bg="bg-soft-violet" className="text-[9px] px-2 py-0.5 border">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-sans text-xl font-black text-ink mb-2 uppercase tracking-tight">
            {project.title}
          </h3>
          <SpecLine text={`${project.client} — ${project.year}`} />
        </div>
      </HairlineCard>
    </Link>
  )
}
