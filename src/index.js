import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderPicture } from './js/renderPicture';
import { refs } from './js/refs';
import NewPixabayAPI from './js/pixabayAPI';
import { cleanRender } from './js/cleanRender';
import { smoothScroll } from './js/smoothScroll';

const pixabayAPI = new NewPixabayAPI();

refs.formRef.addEventListener('submit', onInputSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
function onInputSearch(event) {
  event.preventDefault();
  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();
  if (pixabayAPI.query === '') {
    return;
  }
  cleanRender();
  if (cleanRender) {
    refs.btnLoadMore.style.display = 'none';
  }
  // Render
  pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
    if (pictures.hits.length < 1) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (pictures.hits.length >= 1) {
      Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
      refs.btnLoadMore.style.display = 'block';
    }
    if (pictures.hits.length < 40) {
      refs.btnLoadMore.style.display = 'none';
    }
    renderPicture(pictures);
  });
}
// loadMore
async function onLoadMore() {
  try {
    await pixabayAPI.axiosPicture(pixabayAPI.query).then(pictures => {
      renderPicture(pictures);
      if (pictures.hits.length < 40) {
        setTimeout(() => {
          Notify.info("We're sorry, but you've reached the end of search results");
        }, 1000);
        refs.btnLoadMore.style.display = 'none';
      }
      smoothScroll();
    });
  } catch (error) {
    console.log(error);
  }
}
