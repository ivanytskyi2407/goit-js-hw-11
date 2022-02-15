import axios from 'axios';

const API_KEY = '25715337-58cde3c0d1b1902de73779f35';
export function axiosPicture(name) {
  return axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.data)
}
