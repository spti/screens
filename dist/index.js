function getWidth(el) {
  const width = parseInt(window.getComputedStyle(
    el
  ).width, 10)

  return width
}

window.addEventListener('load', () => {
  const html = document.querySelector('html')
  const outputEl = document.querySelector('#output span')

  outputEl.innerText = getWidth(html).toString() + ' px'

  window.addEventListener('resize', () => {
    outputEl.innerText = getWidth(html).toString() + ' px'
  })
})
