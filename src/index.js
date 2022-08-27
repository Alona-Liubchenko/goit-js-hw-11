import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

axios.defaults.baseURL = 'https://pixabay.com/api';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onChangeForm);
refs.loadMoreBtn.addEventListener('click', onChangeLoadMore);

const DEFAULT_CURENT_PEGE = 1;
const HITS_PER_PAGE = 40;
let items = [];
let query = '';
let currentPage = DEFAULT_CURENT_PEGE;
let totalPages = 0;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onChangeForm(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  currentPage = DEFAULT_CURENT_PEGE;
  refs.gallery.innerHTML = '';
  // if (!query) {
  //   return;
  // }
  fetchDate();
}

function fetchDate() {
  axios
    .get(
      `/?key=29510449-399a931f33aaf543423460729&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&&per_page=${HITS_PER_PAGE}&page=${currentPage}`
    )
    .then(({ data }) => {
      items = data.hits;

      if (data.totalHits === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      totalPages = data.totalHits / HITS_PER_PAGE;
      render();
      lightbox.refresh();
    })
    .catch(error => console.log(error.message));
}

function render() {
  const markup = items
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `  <div class="photo-card">
        <a href="${largeImageURL}" class="gallery-link">
         
             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
             <div class="info">
               <p class="info-item"><b>Likes: </b>${likes}</p>
               <p class="info-item"><b>Views: </b>${views}</p>
               <p class="info-item"><b>Comments: </b>${comments}</p>
               <p class="info-item"><b>Downloads: </b>${downloads}</p>
             </div>
             </a>
           </div>
           `
    )
    .join('');
  // refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onChangeLoadMore() {
  currentPage += 1;
  fetchDate();
}
