import { galleryItems } from './gallery-items.js';
// Change code below this line


const gallery = document.querySelector('.gallery')
const galleryMarkup = createGalleryMarkup(galleryItems);



gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
gallery.addEventListener('click', onGalleryClick);



function createGalleryMarkup(galleryItems) {
   return galleryItems.map(function ({ preview, description, original }, index) {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
      data-source="${original}"
      data-index= ${index}
    />
  </a>
</li>`;
    }).join('')
}



function onGalleryClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__image')) {
        return;
        }
 
    const item = e.target;


    const instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery__image"src="${item.dataset.source}" alt="${item.alt}"
    </div>
`)
    instance.show()

    window.addEventListener('keydown', modalCloseOnEsc);


    function modalCloseOnEsc(e) {
    if (e.code === "Escape") {
        instance.close()
        window.removeEventListener('keydown', modalCloseOnEsc);
    } 
    }
    
    // Не впевнений, шо це потрібно, але на відео по кліку на модальне вікно - воно закривалося
    const modalEl = instance.element();
    modalEl.addEventListener('click', modalCloseOnClick)

    function modalCloseOnClick(e) {
        if (basicLightbox.visible()) {
         
        instance.close()
    }
}

}







