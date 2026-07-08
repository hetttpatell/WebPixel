import Badge from '../ui/Badge'

export default function TechBadgeList({ stack = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <Badge key={tech} bg="bg-white" className="text-[9px] px-2.5 py-1 border">
          {tech}
        </Badge>
      ))}
    </div>
  )
}
