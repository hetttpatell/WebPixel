import ServiceDetail from '../ServiceDetail'
import services from '../../content/services.json'

export default function AIAutomation() {
  return <ServiceDetail config={services['ai-automation']} />
}
