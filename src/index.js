
// a helper function with the side effect of modifying the passed logs array
// function log(width, logs) {
//   logs.push(width)
//   return width
// }

function factory() {

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

      return function(val) {
        const logged = logger.next(val)
        if (logged.done && logged.value === 'undefined') {return null}
        return logged.value
      }
    },

    repeatText(text, times) {
      var str = ''
      while (times >= 0) {
        str += text + ' '
        times--
      }

      return str

    }
  }


}

window.addEventListener('load', () => {
  const tk = factory()

  const html = document.querySelector('html')
  const outputEl = document.querySelector('#output span')

  var log = tk.makeLogger()
  outputEl.innerText = log(tk.getWidth(html)).toString() + ' px'

  // var dataSent = false
  var timeoutId = null
  window.addEventListener('resize', () => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      // console.log('after resize')
      // if (dataSent) return
      log(tk.getWidth(html))
    }, 500)

    // const logVal = log(tk.getWidth(html))
    // if (!logVal) {
    //   outputEl.innerText = tk.repeatText('the data has been sent, to restart session refresh the page', 21)
    //   return
    // }

    // if (dataSent) return
    outputEl.innerText = tk.getWidth(html) + ' px'
  })

  document.querySelector('#output').addEventListener('click', () => {

    // if (dataSent) {
    //   outputEl.innerText = tk.repeatText('already have sent the data, to continue playing around refresh the page', 21)
    //   return
    // }

    const logs = log(null)
    outputEl.innerText = JSON.stringify(logs)
    tk.sendLogs(logs)
    .then((responseText) => {
      log = tk.makeLogger()
      // dataSent = true
      // outputEl.innerText = responseText
    })
  })
})
