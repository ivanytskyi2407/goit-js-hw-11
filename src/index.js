import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderPicture } from './js/renderPicture';
import { refs } from './js/refs';
import NewPixabayAPI from './js/pixabayAPI';

const pixabayAPI = new NewPixabayAPI();

refs.formRef.addEventListener('submit', onInputSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onInputSearch(event) {
  event.preventDefault();
  refs.btnLoadMore.classList.remove('is-hidden');

  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();
  pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
    if (pictures) {
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
