import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderPicture } from './js/renderPicture';
import { refs } from './js/refs';
import NewPixabayAPI from './js/pixabayAPI';
import { cleanRender } from './js/cleanRender';

const pixabayAPI = new NewPixabayAPI();

refs.formRef.addEventListener('submit', onInputSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onInputSearch(event) {
  event.preventDefault();
  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();
  cleanRender();

  if (cleanRender) {
    refs.btnLoadMore.classList.add('is-hidden');
  }
  setTimeout(() => {
    refs.btnLoadMore.classList.remove('is-hidden');
  }, 1000);

  // Render
  pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
    if (pictures.hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (pictures.hits.length >= 1) {
      Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
    }
    renderPicture(pictures);
  });
}
// loadMore
async function onLoadMore() {
  try {
    await pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
      renderPicture(pictures);
      if (pictures.hits.length === 0) {
        Notify.info("We're sorry, but you've reached the end of search results");
        refs.btnLoadMore.classList.add('is-hidden');
      }
    });
  } catch (error) {
    return;
  }
}
