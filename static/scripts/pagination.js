const images = []
const imageListElement = document.querySelector('.mb-image-list')

function last(list) {
  return list[list.length - 1]
}

function fetchImages() {
  const url = images.length > 0
    ? '/api/images/' + last(images)
    : '/api/images'

  return window.fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.images != null && data.images.length > 0) {
        data.images.forEach(image => images.push(image))
        renderImages()
      } else {
        throw 'no more images'
      }
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
  return scrollTop > (scrollHeight - innerHeight) - 50
}

function init() {
  let fetching = false
  fetchImages()
  imageListElement.addEventListener('wheel', ev => {
    if (ev.deltaY > 0 && scrolledToBottom() && !fetching) {
      console.log('fetching images...')
      fetching = true
      fetchImages()
        .then(() => {
          console.log('done')
          fetching = false
        })
        .catch(err => {
          console.log("couldn't fetch:", err)
        })
    }
  }, { passive: true })
}

init()
