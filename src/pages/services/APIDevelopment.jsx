import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function APIDevelopment() {
  return <ServiceDetail config={services['api-development']} />
}
