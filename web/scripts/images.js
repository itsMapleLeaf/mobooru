const images = Array(10).fill(null)

const imageTemplate = document.querySelector('#mb-imageTemplate')
const imageListElement = document.querySelector('.mb-imageList')

function renderImages() {
  imageListElement.innerHTML = ''
  for (const src of images) {
    const node = document.importNode(imageTemplate.content, true)
    imageListElement.appendChild(node)
  }
}

renderImages()
