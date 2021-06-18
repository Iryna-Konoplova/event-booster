import debounce from 'lodash.debounce';
import NewsApiService from './apiService';
import eventCardTpl from '../templates/event-card.hbs';



const refs = {
    searchInput: document.querySelector('.hero-form-field'),
    eventsContainer: document.querySelector('.event-card-set'),
    eventCard: document.querySelector('.event-card-list'),
    modalOpen: document.querySelector('.backdrop')
}

const newsApiService = new NewsApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));
refs.eventsContainer.addEventListener('click', onEventClick)

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.target.value.trim();
    newsApiService.fetchEmbedded().then(appendEventsMarkup)   
}

function appendEventsMarkup(events) {
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventCardTpl(events));
}



function onEventClick(e) {
//   evt.preventDefault();
//   if (!evt.target.classList.contains('gallery__image')) {
//     return;
//   }
    const id = e.target.id;
console.log(e.target.id)
  refs.modalOpen.classList.add('is-hidden');

//   imageModal.src = evt.target.dataset.source;
//   imageModal.alt = evt.target.alt;

//   buttonCloseModal.addEventListener('click', onButtonCloseModalClick)
//   lightboxOverlay.addEventListener('click', onButtonCloseModalClick)
//   window.addEventListener('keydown', onCloseModalEscapeKeydown)
//   document.addEventListener('keydown', onArrowKeyPressAddSrc);
//   document.addEventListener('keydown', onArrowKeyPressAddDescription);
}

// function onButtonCloseModalClick(evt) {
//   modalOpen.classList.remove('is-open');

//   imageModal.src = '';
//   imageModal.alt = '';
// }

// function onCloseModalEscapeKeydown(evt) {
//   if (evt.code === 'Escape') {
//     onButtonCloseModalClick();
//   }
// }

// function onArrowKeyPressAddSrc(evt) {
//   let newIndex = arrayOriginalImages.indexOf(imageModal.src);
//   if (newIndex < 0) {
//     return;
//   }
//   if (evt.code === 'ArrowLeft') {
//     newIndex -= 1;
//     if (newIndex === -1) {
//       newIndex = arrayOriginalImages.length - 1;
//     }
//   } else if (evt.code === 'ArrowRight') {
//     newIndex += 1;
//     if (newIndex === arrayOriginalImages.length) {
//       newIndex = 0;
//     }
//   }
//   imageModal.src = arrayOriginalImages[newIndex];
// };

// function onArrowKeyPressAddDescription(evt) {
//     let newIndex = arrayDescriptionImages.indexOf(imageModal.alt);
//   if (newIndex < 0) {
//     return;
//   }
//   if (evt.code === 'ArrowLeft') {
//     newIndex -= 1;
//     if (newIndex === -1) {
//       newIndex = arrayDescriptionImages.length - 1;
//     }
//   } else if (evt.code === 'ArrowRight') {
//     newIndex += 1;
//     if (newIndex === arrayDescriptionImages.length) {
//       newIndex = 0;
//     }
//   }
//   imageModal.alt = arrayDescriptionImages[newIndex]
// };