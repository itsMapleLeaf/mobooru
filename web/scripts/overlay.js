(function() {
  const overlays = document.querySelectorAll('.mb-overlay')

  Array.from(overlays).forEach(overlay => {
    overlay.addEventListener('click', ev => {
      if (ev.target === overlay) {
        overlay.classList.remove('mb-overlay--visible')
      }
    })
  })
})()
