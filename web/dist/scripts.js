(function () {
'use strict';

const images = Array(10).fill(null);

const imageTemplate = document.querySelector('#mb-imageTemplate');
const imageListElement = document.querySelector('.mb-imageList');

function renderImages() {
  imageListElement.innerHTML = '';

  images
    .map(src => document.importNode(imageTemplate.content, true))
    .forEach(el => imageListElement.appendChild(el));
}

renderImages();

const overlays = document.querySelectorAll('.mb-overlay');

Array.from(overlays).forEach(overlay => {
  overlay.addEventListener('click', ev => {
    if (ev.target === overlay) {
      overlay.classList.remove('mb-overlay--visible');
    }
  });
});

const uploadButton = document.querySelector('.mb-uploadButton');
const uploadOverlay = document.querySelector('.mb-upload');

uploadButton.addEventListener('click', ev => {
  uploadOverlay.classList.add('mb-overlay--visible');
});

}());
//# sourceMappingURL=scripts.js.map
