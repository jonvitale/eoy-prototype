import QdtComponents from 'qdt-components'

const host = 'dashboards.philasd.org' // window.location.hostname

const isTesting = true
const appId = isTesting
  ? '60765b7c-d34b-402a-a482-dfdbfe873de1'
  : '5c250b02-5c11-4910-977a-d2bb1fadffc7'

const config = {
  host,
  prefix: '',
  port: host === 'localhost' ? 4848 : 443, // window.location.port,
  secure: host === 'localhost' ? window.location.protocol === 'https:' : true,
  appId,
}
const connections = {
  vizApi: true,
  engineApi: true,
}
const qdtComponents = new QdtComponents(config, connections)

console.log('opening port', config.port)

export default ({ app }, inject) => {
  inject('qdt', qdtComponents)
}
