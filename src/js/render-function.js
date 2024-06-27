
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const renderImages = (arrImgs, gallery) => {
  const HTMLElement = arrImgs
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li name="galleryItem" class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="description">
          <p>Likes <span class="desc-span">${likes}</span></p>
          <p>Views <span class="desc-span">${views}</span></p>
          <p>Comments <span class="desc-span">${comments}</span></p>
          <p>Downloads <span class="desc-span">${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', HTMLElement);
  lightbox.refresh();
};

export default renderImages;