const imageListElement = document.querySelector('.mb-image-list')

let lastImage = ''

fetch('/api/images')
  .then(res => res.json())
  .then(data => {
    for (const src of data.images) {
      imageListElement.innerHTML += `
        <a class='mb-image ui-shadow'
          href='#'
          style='background-image: url(images/${src})'>
        </a>
      `
    }

    lastImage = data.images[data.images.length - 1]
  })

imageListElement.addEventListener('scroll', ev => {
  const {scrollTop, scrollHeight} = imageListElement
  const {innerHeight} = window
  if (scrollTop === scrollHeight - innerHeight) {
    console.log('more images pls')
  }
})
