import got from 'got'
import { createWriteStream } from 'fs-extra'
import path from 'path'

type downloadOpt = Partial<{
  progress: boolean
}>
type downloadObject = Promise<any> & {
  stop: () => void
}
export function downloadFLV(
  url: string,
  filename: string,
  opt?: downloadOpt
): downloadObject {
  let gotter = got.stream(url)
  let _this: any = {}
  let writter = createWriteStream(
    path.resolve(__dirname, '../download', filename)
  )
  let promiser = new Promise<any>((resolve, reject) => {
    gotter.on('error', (err) => {
      return reject(err)
    })
    gotter.on('downloadProgress', ({ transferred, total, percent }) => {
      if (!opt?.progress) return
      const percentage = Math.round(percent * 100)
      console.error(`progress: ${transferred}/${total} (${percentage}%)`)
    })
    _this.resolve = resolve
  })
  gotter.pipe(writter)

  let _promiser = Object.assign(promiser, {
    stop: () => {
      gotter.end()
      _this.resolve()
    },
  })
  return _promiser
}
