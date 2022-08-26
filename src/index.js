import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onChangeForm);
refs.loadMoreBtn.addEventListener('click', onChangeLoadMore);

let items = [];
let query = '';
let currentPage = 1;
let totalPages = 1;
const HITS_PER_PAGE = 5;

function onChangeForm(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  refs.gallery.innerHTML = '';
  // if (!query) {
  //   return;
  // }
  fetchDate();
}

function fetchDate() {
  axios
    .get(
      `/?key=29510449-399a931f33aaf543423460729&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}`
    )
    .then(({ data }) => {
      items = data.hits;

      // if (items.length === 0) {
      //   Notiflix.Notify.failure(
      //     'Sorry, there are no images matching your search query. Please try again.'
      //   );
      // }
      currentPage = 1;
      totalPages = data.totalHits / HITS_PER_PAGE;
      render();
    })
    .catch(error => console.log(error.message));
}

function render() {
  const markup = items
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  // refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onChangeLoadMore() {
  currentPage += 1;
  fetchDate();
}
