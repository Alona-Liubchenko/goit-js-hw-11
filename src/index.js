import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onChangeForm);

let items = [];
let query = '';
const markup = render(items);

function onChangeForm(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  //   console.log(query);
  fetchDate();
}

function fetchDate() {
  axios
    .get(
      `/?key=29510449-399a931f33aaf543423460729&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(({ data }) => {
      items = data.hits;
      render(items);
      //   console.log(date);
    })
    .catch(error => console.log(error.message));
}

function render(items) {
  return items
    .map(item => {
      return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${item.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');

  //   console.log(items);
}

refs.gallery.insertAdjacentHTML('beforeend', markup);
