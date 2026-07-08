/**
 * App — Root component with React Router
 */
import { Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Services from './pages/Services'
import Websites from './pages/services/Websites'
import Applications from './pages/services/Applications'
import CustomSoftware from './pages/services/CustomSoftware'
import MobileAppDevelopment from './pages/services/MobileAppDevelopment'
import SaaSDevelopment from './pages/services/SaaSDevelopment'
import AIAutomation from './pages/services/AIAutomation'
import APIDevelopment from './pages/services/APIDevelopment'
import Industries from './pages/Industries'
import IndustryDetail from './pages/IndustryDetail'
import ProjectEstimator from './pages/ProjectEstimator'
import ClientPortal from './pages/ClientPortal'
import Insights from './pages/Insights'
import BlogDetail from './pages/BlogDetail'
import Process from './pages/Process'
import Careers from './pages/Careers'
import BookCall from './pages/BookCall'
import Legal from './pages/Legal'
import About from './pages/About'
import Contact from './pages/Contact'
import Retainer from './pages/Retainer'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        
        {/* Services */}
        <Route path="services" element={<Services />} />
        <Route path="services/websites" element={<Websites />} />
        <Route path="services/applications" element={<Applications />} />
        <Route path="services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="services/saas-development" element={<SaaSDevelopment />} />
        <Route path="services/ai-automation" element={<AIAutomation />} />
        <Route path="services/api-development" element={<APIDevelopment />} />
        <Route path="services/custom-software" element={<CustomSoftware />} />
        
        {/* Industries */}
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryDetail />} />
        
        {/* Scoping & Lead Captures */}
        <Route path="estimate-project" element={<ProjectEstimator />} />
        <Route path="book-call" element={<BookCall />} />
        
        {/* Company Pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="retainer" element={<Retainer />} />
        <Route path="process" element={<Process />} />
        <Route path="careers" element={<Careers />} />
        
        {/* Client Workspace */}
        <Route path="client-login" element={<ClientPortal />} />
        
        {/* Insights / Blog */}
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<BlogDetail />} />
        
        {/* Legal pages */}
        <Route path="privacy-policy" element={<Legal type="privacy" />} />
        <Route path="terms" element={<Legal type="terms" />} />
      </Route>
    </Routes>
  )
}
