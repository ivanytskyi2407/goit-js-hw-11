import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderPicture } from './js/renderPicture';
import { refs } from './js/refs';
import NewPixabayAPI from './js/pixabayAPI';

const pixabayAPI = new NewPixabayAPI();

refs.formRef.addEventListener('submit', onInputSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
function cleanupRender() {
  refs.gallery.innerHTML = '';
}

function onInputSearch(event) {
  event.preventDefault();
  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();
  cleanupRender();
  if (cleanupRender) {
    refs.btnLoadMore.classList.add('is-hidden');
  }
  setTimeout(() => {
    refs.btnLoadMore.classList.remove('is-hidden');
  }, 1000);

  pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
    // if (pictures.hits.length === 0) {
    //   refs.btnLoadMore.classList.add('is-hidden');
    // }
    if (pictures.hits.length >= 1) {
      Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
    }
    renderPicture(pictures);
  });
}
function onLoadMore() {
  pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
    renderPicture(pictures);
  });
}
