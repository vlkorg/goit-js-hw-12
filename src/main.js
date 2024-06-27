
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getArr from './js/pixabay-api.js';
import renderImages from './js/render-function.js';

const section = document.querySelector('section').children;
const form = section.getForm;
const loader = section.loader;
const gallery = section.gallery;
const loadMoreBtn = section.loadMore;

let page = 1;
let searchText;

iziToast.settings({
  progressBar: false,
  timeout: 4000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
});

const addImages = async (searchText, page = 1) => {
  try {
    const response = await getArr(searchText, page);
    loader.style.display = 'block';

    if (response.data.hits.length === 0) {
      return iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    loadMoreBtn.style.display = 'block';
    const totalPages = Math.ceil(response.data.totalHits / 15);
    if (page === totalPages) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    renderImages(response.data.hits, gallery);
  } catch (error) {
    error => console.error('Error', error);
  } finally {
    form.reset();
    loader.style.display = 'none';

    const options = gallery.children.galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: options.height * 2,
      behavior: 'smooth',
    });
  }
};

const submitSearchForm = async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  searchText = e.target.searchTerm.value.trim().toLowerCase();
  page = 1;
  addImages(searchText);
};

const loadMore = async () => {
  page += 1;
  addImages(searchText, page);
};

form.addEventListener('submit', submitSearchForm);
loadMoreBtn.addEventListener('click', loadMore);