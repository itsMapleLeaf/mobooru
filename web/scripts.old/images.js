const images = []

const imageTemplate = document.querySelector('#mb-imageTemplate')
const imageListElement = document.querySelector('.mb-imageList')

function fetchImages() {
  window.fetch('/api/images')
    .then(res => res.json())
    .then(res => (images = images.concat(res.images)))
    .then(render)
}

function render() {
  imageListElement.innerHTML = ''
  for (const id of images) {
    const node = document.importNode(imageTemplate.content, true)
    const link = node.querySelector('a')
    link.style.backgroundImage = `url(/api/image/${id})`
    imageListElement.appendChild(node)
  }
}

fetchImages()
