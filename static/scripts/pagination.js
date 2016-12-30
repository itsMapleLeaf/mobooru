const images = []
const imageListElement = document.querySelector('.mb-image-list')

function last (list) {
  return list[list.length - 1]
}

function fetchImages () {
  // const url = images.length > 0
  //   ? '/images/' + last(images)
  //   : '/images'

  const url = '/images'

  return window.fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.images != null && data.images.length > 0) {
        data.images.forEach(image => images.push(image))
        renderImages()
      } else {
        throw new Error('no more images')
      }
    })
}

function renderImages () {
  imageListElement.innerHTML = images.map(renderImageElement).join('')
}

function renderImageElement (id) {
  return `<a href='#'
    class='mb-image ui-shadow'
    style='background-image: url(image/${id})'>
  </a>`
}

function scrolledToBottom () {
  const {scrollTop, scrollHeight} = imageListElement
  const {innerHeight} = window
  return scrollTop > (scrollHeight - innerHeight) - 50
}

function init () {
  // let fetching = false

  fetchImages()

  // imageListElement.addEventListener('wheel', ev => {
  //   if (ev.deltaY > 0 && scrolledToBottom() && !fetching) {
  //     fetching = true
  //     fetchImages()
  //       .then(() => { fetching = false })
  //       .catch(err => { console.log("couldn't fetch:", err) })
  //   }
  // }, { passive: true })
}

init()
