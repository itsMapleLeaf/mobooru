import $ from 'jquery'

const overlays = $('.mb-overlay')

overlays.each((i, overlay) => {
  const $overlay = $(overlay)
  $overlay.click(ev => {
    if (ev.target === overlay) {
      $overlay.removeClass('mb-overlay--visible')
    }
  })
})
