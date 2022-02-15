import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from "./refs";


export function renderPicture(pictures) {
            if (pictures.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    const markUp = pictures.hits.map(({webformatURL,tags,likes,views,comments,downloads}) => { 
            return `<div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes ${likes}</b>
                        </p>
                        <p class="info-item">
                        <b>Views ${views}</b>
                        </p>
                        <p class="info-item">
                        <b>Comments ${comments}</b>
                        </p>
                        <p class="info-item">
                        <b>Downloads ${downloads}</b>
                        </p>
                    </div>
                    </div>`
       })
        refs.gallery.insertAdjacentHTML('afterbegin', markUp);
       }