const refs = {
  gallery: document.querySelector('.gallery'),
};
export default function render(items) {
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
