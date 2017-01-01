(function() {
  const images = []

  const imageTemplate = document.querySelector('#mb-imageTemplate')
  const imageListElement = document.querySelector('.mb-imageList')

  function renderImages() {
    imageListElement.innerHTML = ''
    for (const src of images) {
      const el = document.importNode(imageTemplate.content, true)
      imageListElement.appendChild(el)
    }
  }

  renderImages()
})()
