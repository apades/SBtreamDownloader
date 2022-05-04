import dmWatcher from '../src/dmWatcher'

dmWatcher('http://192.168.1.5:8080/test/dm_test.html', 'ul', (el) => {
  console.log(el.textContent)
  return {
    type: 'chart',
    data: {
      content: el.textContent,
      name: el.textContent,
    },
  }
})
