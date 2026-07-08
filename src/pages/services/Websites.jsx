import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function Websites() {
  return <ServiceDetail config={services['websites']} />
}
