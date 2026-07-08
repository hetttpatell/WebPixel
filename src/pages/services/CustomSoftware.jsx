import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function CustomSoftware() {
  return <ServiceDetail config={services['custom-software']} />
}
