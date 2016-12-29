const images = []
const imageListElement = document.querySelector('.mb-image-list')

function last(list) {
  return list[list.length - 1]
}

function fetchImages() {
  const url = images.length > 0
    ? '/api/images/' + last(images)
    : '/api/images'

  window.fetch(url)
    .then(res => res.json())
    .then(data => {
      data.images.forEach(image => images.push(image))
      renderImages()
    })
}

function renderImages() {
  imageListElement.innerHTML = images.map(renderImageElement).join('')
}

function renderImageElement(url) {
  return `<a href='#'
    class='mb-image ui-shadow'
    style='background-image: url(images/${url})'>
  </a>`
}

function scrolledToBottom() {
  const {scrollTop, scrollHeight} = imageListElement
  const {innerHeight} = window
  return scrollTop === scrollHeight - innerHeight
}

function init() {
  fetchImages()
  imageListElement.addEventListener('scroll', ev => {
    if (scrolledToBottom()) {
      fetchImages()
    }
  })
}

init()
