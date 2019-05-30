function makeToolkit() {

  function* Log() {
    var width = yield null
    const widths = []

    while (width) {
      widths.push(width)
      width = yield width
    }

    return widths

  }

  return {
    getWidth(el) {
      const width = parseInt(window.getComputedStyle(
        el
      ).width, 10)

      return width
    },

    sendLogs(logs) {
      // send logs to a server
      return Promise.resolve('sent the widths')
    },

    makeLogger() {
      const logger = Log()
      logger.next()

      function last(val) {log.last = () => {return val}}

      function log(val) {
        const logged = logger.next(val)
        if (logged.done && logged.value === 'undefined') {return null}
        last(logged.value)
        return logged.value
      }

      return log
    },
  }

}

window.addEventListener('load', () => {
  const tk = makeToolkit()

  const html = document.querySelector('html')
  const outputEl = document.querySelector('#output span')

  var log = tk.makeLogger()
  outputEl.innerText = log(tk.getWidth(html)).toString() + ' px'

  var timeoutId = null

  window.addEventListener('orientationchange', () => {
    const width = tk.getWidth(html)
    if (log.last() == width) return

    outputEl.innerText = log(width) + ' px'
  })

  window.addEventListener('resize', () => {
    window.clearTimeout(timeoutId)
    const width = tk.getWidth(html)

    if (log.last() == width) return

    timeoutId = window.setTimeout(() => {
      log(width)
    }, 500)

    outputEl.innerText = width + ' px'
  })

  document.querySelector('#output').addEventListener('click', () => {

    const logs = log(null)
    outputEl.innerText = JSON.stringify(logs)
    tk.sendLogs(logs)
    .then((responseText) => {
      log = tk.makeLogger()
    })
  })
})
