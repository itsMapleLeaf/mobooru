const overlays = document.querySelectorAll('.mb-overlay')

for (const overlay of overlays) {
  overlay.addEventListener(event => {
    if (event.target === overlay) {
      event.preventDefault()
      overlay.classList.remove('mb-overlay--visible')
    }
  })
}
