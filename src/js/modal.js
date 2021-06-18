import debounce from 'lodash.debounce';
import NewsApiService from './apiService';
import eventCardTpl from '../templates/event-card.hbs';
import eventCardModalTpl from '../templates/event-card-modal.hbs';



const refs = {
    searchInput: document.querySelector('.hero-form-field'),
    eventsContainer: document.querySelector('.event-card-set'),
    eventCard: document.querySelector('.event-card-list'),
    modalOpen: document.querySelector('.backdrop'),
    eventModalContainer: document.querySelector('.modal-event-card'),
  buttonCloseModal: document.querySelector('.modal__btn-close'),
    lightboxOverlay: document.querySelector('.backdrop')
}

const newsApiService = new NewsApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));
refs.eventsContainer.addEventListener('click', onEventClick);


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

  refs.modalOpen.classList.add('is-hidden');
  newsApiService.idEvent = e.target.id;
  newsApiService.fetchEventById().then(appendEventModalMarkup);
  
  refs.buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
  refs.lightboxOverlay.addEventListener('click', onButtonCloseModalClick);
  window.addEventListener('keydown', onCloseModalEscapeKeydown);
}

function appendEventModalMarkup(events) {
  refs.eventModalContainer.insertAdjacentHTML('beforeend', eventCardModalTpl(events));
}

function onButtonCloseModalClick(evt) {
   refs.modalOpen.classList.remove('is-hidden')
}

function onCloseModalEscapeKeydown(evt) {
  if (evt.code === 'Escape') {
    onButtonCloseModalClick();
  }
}



