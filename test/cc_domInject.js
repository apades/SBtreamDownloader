let dq = (...q) => document.querySelector(...q)

const tarListEl = dq('#js-chat-list-ul')
let observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      let newEl = tarListEl.children[tarListEl.children.length - 1]
      console.log('newEl', newEl)
      console.log(resolveCCdanmu(newEl))
    }
  }
})

observer.observe(tarListEl, {
  childList: true,
})

/**@param el {Element} */
function resolveCCdanmu(el) {
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
}
