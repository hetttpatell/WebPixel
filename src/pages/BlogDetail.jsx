import { useParams, Link } from 'react-router'
import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import blogsData from '../content/blogs.json'
import Newsletter from '../components/ui/Newsletter'

export default function BlogDetail() {
  const { slug } = useParams()
  const blog = blogsData.find((b) => b.slug === slug)

  if (!blog) {
    return (
      <section className="bg-canvas min-h-screen flex items-center justify-center border-b-4 border-black">
        <div className="text-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
          <h1 className="font-sans text-4xl font-black text-ink mb-4 uppercase">Article not found</h1>
          <SpecLine text="ERROR — 404" className="mb-6" />
          <Button href="/insights" variant="outline">
            Back to Insights
          </Button>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Article Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-12 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink hover:text-hot-red transition-colors duration-150 mb-8"
          >
            <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge bg="bg-hot-red" className="text-[10px] border">
              {blog.category}
            </Badge>
            <span className="font-mono text-xs text-fog font-bold">{blog.date}</span>
          </div>

          <h1 className="font-sans text-4xl md:text-6xl font-black text-ink mb-6 uppercase tracking-tight leading-[0.95] max-w-4xl">
            {blog.title}
          </h1>

          <SpecLine text={`READ TIME — ${blog.readTime.toUpperCase()}`} className="border-t-4 border-black pt-6" />
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-canvas py-16 md:py-24 border-b-4 border-black">
        <div className="section-container max-w-3xl">
          <article className="space-y-8 font-sans text-base md:text-lg font-bold text-ink leading-relaxed">
            {blog.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>

          {/* Newsletter Section */}
          <div className="mt-16 pt-16 border-t-4 border-black">
            <Newsletter />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canvas py-16 md:py-24 relative overflow-hidden border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10 text-center border-4 border-black bg-white p-12 shadow-[8px_8px_0px_0px_#000] max-w-3xl mx-auto rounded-none">
          <SpecLine text="HAVE A SYSTEM TO BUILD?" className="mb-4 justify-center" />
          <h2 className="font-sans text-3xl md:text-5xl font-black text-ink mb-6 uppercase tracking-tight">
            Let's build your platform
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/estimate-project" variant="primary">Get Ballpark Estimate</Button>
            <Button href="/contact" variant="outline">Consultation Call</Button>
          </div>
        </div>
      </section>
    </>
  )
}
