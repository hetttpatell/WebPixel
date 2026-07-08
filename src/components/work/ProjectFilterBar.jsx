export default function ProjectFilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'websites', label: 'WEBSITES' },
    { id: 'applications', label: 'APPS' },
    { id: 'saas', label: 'SAAS' },
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onFilterChange(filter.id)}
          className={`font-sans font-black text-xs uppercase tracking-widest px-5 py-3 border-2 border-black transition-all duration-100 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none select-none rounded-none ${
            activeFilter === filter.id
              ? 'bg-hot-red text-ink'
              : 'bg-white text-ink hover:bg-vivid-yellow'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
