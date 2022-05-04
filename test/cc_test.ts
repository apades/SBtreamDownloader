import { downloadFLV } from '../src/downloader'
import { cc_getInfo } from '../src/streamPlaform/cc'

async function main() {
  let info = await cc_getInfo(361433, 'ultra')
  console.log('info', info)
  // downloadFLV(info.url, 'cc_test.flv', {
  //   progress: true,
  // })
}

main()
