const uploadButton = document.querySelector('.mb-uploadButton')
const uploadOverlay = document.querySelector('.mb-upload')

uploadButton.addEventListener('click', event => {
  uploadOverlay.classList.add('mb-overlay--visible')
})
