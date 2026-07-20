import SpecLine from '../components/ui/SpecLine'
import GridTexture from '../components/ui/GridTexture'
import HairlineCard from '../components/ui/HairlineCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import CtaBand from '../components/home/CtaBand'

const jobs = [
  {
    title: 'Senior Frontend Developer',
    type: 'Full-Time / Remote',
    salary: '₹12 Lakhs – ₹18 Lakhs',
    requirements: ['5+ years with React & Next.js', 'Mastery of semantic HTML and custom CSS layout coding', 'Experience with Framer Motion, GSAP, and Lighthouse speed tuning.']
  },
  {
    title: 'Backend Systems Engineer',
    type: 'Full-Time / Remote',
    salary: '₹15 Lakhs – ₹22 Lakhs',
    requirements: ['5+ years with Node.js, Express, or Django', 'Expertise in PostgreSQL, database indexing, and serverless architectures', 'Familiarity with AWS Cognito, IAM, and HIPAA compliance protocols.']
  },
  {
    title: 'UI/UX Product Designer',
    type: 'Full-Time / Remote',
    salary: '₹10 Lakhs – ₹15 Lakhs',
    requirements: ['4+ years in design systems and Figma component mapping', 'Strong portfolio in brutalist, data-dense SaaS dashboards and map listing interfaces', 'Ability to output clean HTML/CSS templates.']
  }
]

export default function Careers() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-20 md:pt-32 pb-16 md:pb-24 relative border-b-4 border-black">
        <GridTexture />
        <div className="section-container relative z-10">
          <SpecLine text="CAREERS — SCALE YOUR TALENT" className="mb-3" />
          <h1 className="font-sans text-5xl md:text-7xl font-black text-ink mb-4 uppercase tracking-tight">
            Work With WebPixel
          </h1>
          <p className="text-ink font-bold text-lg max-w-xl leading-relaxed">
            We are looking for self-directed full-stack engineers and product designers who value technical craft over templates.
          </p>
        </div>
      </section>

      {/* Culture & Open Roles */}
      <section className="bg-canvas pb-24 border-b-4 border-black pt-12">
        <div className="section-container">
          
          {/* Culture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <HairlineCard className="p-8 bg-white" hover={false}>
              <Badge bg="bg-hot-red" className="mb-4">01</Badge>
              <h3 className="font-sans font-black text-xl uppercase mb-3">No Template Mentality</h3>
              <p className="text-xs font-bold text-ink/75 leading-relaxed">
                We write custom code from scratch. We believe in performance, clean file architecture, and speed profiles that standard page builders cannot reach.
              </p>
            </HairlineCard>

            <HairlineCard className="p-8 bg-white" hover={false}>
              <Badge bg="bg-vivid-yellow" className="mb-4">02</Badge>
              <h3 className="font-sans font-black text-xl uppercase mb-3">Remote & Independent</h3>
              <p className="text-xs font-bold text-ink/75 leading-relaxed">
                Work from anywhere in the world. We coordinate via weekly milestones and Slack updates. We evaluate output and engineering quality, not hours logged.
              </p>
            </HairlineCard>

            <HairlineCard className="p-8 bg-white" hover={false}>
              <Badge bg="bg-soft-violet" className="mb-4">03</Badge>
              <h3 className="font-sans font-black text-xl uppercase mb-3">Strict Design Aesthetics</h3>
              <p className="text-xs font-bold text-ink/75 leading-relaxed">
                We build premium, custom-tailored systems with sharp border-lines, zero blur shadows, and custom layouts that stand out from typical SaaS templates.
              </p>
            </HairlineCard>
          </div>

          {/* Job Openings */}
          <SpecLine text="ACTIVE JOB ROLES — JOIN OUR REPOSITORY" className="mb-8" />
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {jobs.map((job) => (
              <div key={job.title} className="border-4 border-black p-8 bg-white shadow-[6px_6px_0px_0px_#000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b-4 border-black pb-4">
                  <div>
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tight">{job.title}</h3>
                    <p className="font-mono text-xs text-fog font-bold mt-1">{job.type}</p>
                  </div>
                  <Badge bg="bg-accent-mint/35" className="border w-fit text-sm">
                    {job.salary}
                  </Badge>
                </div>
                
                <h4 className="font-sans font-black text-sm uppercase mb-3">Role Requirements:</h4>
                <ul className="space-y-2 mb-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-xs font-bold text-ink flex items-start gap-2 leading-relaxed">
                      <span className="text-hot-red mt-0.5">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <Button href="mailto:careers@webpixel.io" variant="outline" className="border-2 text-xs py-2.5 shadow-[2px_2px_0px_0px_#000]">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CtaBand />
    </>
  )
}
