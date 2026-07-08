import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function SaaSDevelopment() {
  return <ServiceDetail config={services['saas-development']} />
}
