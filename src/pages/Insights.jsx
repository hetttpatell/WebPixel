import { useState } from 'react'
import { Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import RefCodeTag from '../components/ui/RefCodeTag'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import blogsData from '../content/blogs.json'
import Newsletter from '../components/ui/Newsletter'

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const categories = ['All', ...new Set(blogsData.map((b) => b.category))]

  const filteredBlogs = activeCategory === 'All'
    ? blogsData
    : blogsData.filter((b) => b.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="INSIGHTS — ENGINEERING & PRODUCT IDEAS" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Insights & Guides
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            Developer-led articles, software budgeting guides, and system audits to help you build stable, high-yield digital systems.
          </p>
        </div>
      </section>

      {/* Filter & Listing */}
      <section className="bg-canvas pb-24 border-b-4 border-black pt-12">
        <div className="section-container">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 border-b-4 border-black pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-sans font-black text-xs uppercase tracking-widest border-2 border-black cursor-pointer select-none transition-all duration-100 shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  activeCategory === cat
                    ? 'bg-hot-red text-ink'
                    : 'bg-white text-ink hover:bg-vivid-yellow hover:-rotate-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredBlogs.map((blog, idx) => (
              <HairlineCard
                key={blog.slug}
                className="p-8 bg-white flex flex-col justify-between hover:shadow-[14px_14px_0px_0px_#000] h-full"
              >
                <RefCodeTag code={`INS-${idx + 1}`} />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge bg="bg-soft-violet" className="text-[9px] border">
                      {blog.category}
                    </Badge>
                    <span className="font-mono text-[10px] text-fog font-bold">{blog.date}</span>
                  </div>
                  <h2 className="font-sans text-2xl font-black text-ink mb-4 uppercase tracking-tight hover:text-hot-red">
                    <Link to={`/insights/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-ink font-bold text-sm leading-relaxed mb-6">
                    {blog.description}
                  </p>
                </div>

                <div className="border-t-4 border-black pt-6 flex justify-between items-center mt-auto">
                  <span className="font-mono text-xs text-fog font-bold">{blog.readTime}</span>
                  <Link to={`/insights/${blog.slug}`}>
                    <Button variant="outline" className="border-2 shadow-[2px_2px_0px_0px_#000] py-2 px-4 text-xs bg-white">
                      Read Guide
                    </Button>
                  </Link>
                </div>
              </HairlineCard>
            ))}
          </div>

          {/* Newsletter embed */}
          <div className="max-w-3xl mx-auto">
            <Newsletter />
          </div>

        </div>
      </section>
    </>
  )
}
