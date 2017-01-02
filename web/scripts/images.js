import $ from 'jquery'

const images = Array(10).fill(null)

const imageTemplate = $('#mb-imageTemplate')
const imageListElement = $('.mb-imageList')

function renderImages() {
  imageListElement.html('')
  for (const src of images) {
    imageListElement.append(imageTemplate.clone(true))
  }
}

renderImages()
