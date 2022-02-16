import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from "./refs";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderPicture(pictures) {
            if (pictures.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    console.log(pictures);
    const markUp = pictures.hits.map(({largeImageURL,webformatURL,tags,likes,views,comments,downloads}) => { 
        return `<a href="${largeImageURL}">
        <div class="photo-card">
                    <img class="photo-card_img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
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
                    </div></a>`
       }).join("")
    refs.gallery.insertAdjacentHTML('afterbegin', markUp);

    let gallery = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
       });
}
       
