const uploadButton = document.querySelector('.mb-uploadButton')
const uploadOverlay = document.querySelector('.mb-upload')

uploadButton.addEventListener('click', ev => {
  uploadOverlay.classList.add('mb-overlay--visible')
})
