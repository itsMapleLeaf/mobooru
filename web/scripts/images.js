;(function() {
  const images = Array(10).fill(null)

  const imageTemplate = document.querySelector('#mb-imageTemplate')
  const imageListElement = document.querySelector('.mb-imageList')

  function renderImages() {
    imageListElement.innerHTML = ''

    images
      .map(src => document.importNode(imageTemplate.content, true))
      .forEach(el => imageListElement.appendChild(el))
  }

  renderImages()
})()
