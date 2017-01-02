import $ from 'jquery'

const uploadButton = $('.mb-uploadButton')
const uploadOverlay = $('.mb-upload')

uploadButton.click(ev => {
  uploadOverlay.addClass('mb-overlay--visible')
})
