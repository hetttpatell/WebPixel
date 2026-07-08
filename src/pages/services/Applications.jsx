import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function Applications() {
  return <ServiceDetail config={services['mobile-app-development']} />
}
