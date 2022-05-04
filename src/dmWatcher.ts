import puppeteer from 'puppeteer'
import { dmTypes, dykey } from './types'

export default async function dmWatcher(
  url: string,
  listContainer: string,
  cb: (el: Element) => dmTypes
) {
  const browser = await puppeteer.launch({})

  const page = await browser.newPage()
  await page.setCacheEnabled(false)

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
  )
  await page.goto(url)

  //   const Event = {
  //     // eslint-disable-next-line @typescript-eslint/ban-types
  //     on: (type: string, cb: Function) => {
  //       Event.events[type] = Event.events[type] || []
  //       Event.events[type].push(cb)
  //     },
  //     emit: (type: string, data: any) => {
  //       ;(Event.events[type] || []).forEach((fn) => fn(data))
  //     },
  //     // eslint-disable-next-line @typescript-eslint/ban-types
  //     events: {} as dykey<Function[]>,
  //   }

  //   Event.on('dmData', (data: any) => {
  //     console.log('dmData', data)
  //   })

  await page.screenshot({ path: 'page.png' })
  await page.exposeFunction('dmData', (data: any) => {
    console.log('dmData', data)
  })

  await page.evaluate(
    (listContainer, cb) => {
      window.dmData('testData')
      let dq = (...q: Parameters<typeof document.querySelector>) =>
        document.querySelector(...q)

      let callback = new Function(`return (${cb})(...arguments)`)
      const tarListEl = dq(`${listContainer}`)
      let observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            let newEl = tarListEl.children[tarListEl.children.length - 1]
            let dmData = callback(newEl)
            window.dmData(dmData)
            // Event.emit('dmData', dmData)
          }
        }
      })

      observer.observe(tarListEl, {
        childList: true,
      })
    },
    listContainer,
    cb.toString()
  )

  //   let _promise = new Promise((resolve, reject) => {})
  //   await browser.close()
  //   return _promise
}
