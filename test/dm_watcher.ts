import dmWatcher from '../src/dmWatcher'

dmWatcher('https://cc.163.com/1234567/', '#js-chat-list-ul', (el) => {
  let charEl = el.querySelector('.js-chat-item')
  if (charEl) {
    let name = el.querySelector('[aid]').textContent
    let content = el.querySelector('[class^="styles-module_chatContent"]')
      .textContent

    return {
      type: 'chart',
      data: {
        name,
        content,
      },
    }
  }
  return {
    type: 'unkown',
  }
})
