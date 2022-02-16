import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { axiosPicture } from './js/axiosPicture'
import { renderPicture } from "./js/renderPicture";
import { refs } from "./js/refs";


refs.formRef.addEventListener('submit', onInputSearch);

function onInputSearch(event) {
    event.preventDefault();
    const name = event.currentTarget.elements.searchQuery.value.trim();

    
    
    axiosPicture(name).then(pictures => {
        if (pictures) { 
            Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
        }
        console.log(pictures);
        renderPicture(pictures);
    }        
    );
}
