import fetchDate from './js/fetch';
import render from './js/createmarkup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onChangeForm);
refs.loadMoreBtn.addEventListener('click', onChangeLoadMore);

const DEFAULT_CURENT_PEGE = 1;
const perPage = 40;

let items = [];
let query = '';
let page = DEFAULT_CURENT_PEGE;
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

function onChangeForm(e) {
  e.preventDefault();
  if (query === e.currentTarget.elements.searchQuery.value.trim()) return;
  query = e.currentTarget.elements.searchQuery.value.trim();
  page = DEFAULT_CURENT_PEGE;
  refs.gallery.innerHTML = '';
  items = [];
  if (!query) return;

  fetchDate(query, page, perPage)
    .then(data => {
      items = [...items, data.hits];
      totalPages = data.totalHits / perPage;

      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      render(data.hits);

      Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`);
      lightbox.refresh();
      btnOn();
    })
    .catch(error => console.log(error.message));
}

function onChangeLoadMore() {
  page += 1;
  fetchDate(query, page, perPage).then(data => {
    items = [...items, data.hits];
    totalPages = data.totalHits / perPage;
    render(data.hits);
    lightbox.refresh();
  });

  if (page < totalPages) {
    btnOn();
  } else {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnOff();
  }
}

function btnOn() {
  refs.loadMoreBtn.classList.add('visible');
}

function btnOff() {
  refs.loadMoreBtn.classList.remove('visible');
}
