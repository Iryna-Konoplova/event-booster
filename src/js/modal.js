import NewsApiService from './apiService';
import eventCardModalTpl from '../templates/event-card-modal.hbs';
import { refs } from '../js/refs';

const newsApiService = new NewsApiService();

refs.eventsContainer.addEventListener('click', onEventClick);

function onEventClick(e) {
  resetPage();

  if (e.target.classList.contains('event-card-set')) {
    return;
  }

  refs.lightboxOverlay.classList.add('is-hidden');
  newsApiService.idEvent = e.target.id;
  newsApiService.fetchEventById().then(appendEventModalMarkup);

  refs.buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
  refs.modalOpen.addEventListener('click', onButtonCloseModalClick);
  window.addEventListener('keydown', onCloseModalEscapeKeydown);
}

function appendEventModalMarkup(data) {
  refs.eventModalContainer.insertAdjacentHTML('beforeend', eventCardModalTpl(data));
}

function onButtonCloseModalClick(evt) {
  refs.lightboxOverlay.classList.remove('is-hidden')
}

function onCloseModalEscapeKeydown(evt) {
  if (evt.code === 'Escape') {
  onButtonCloseModalClick();
  }
}

function resetPage() {
  refs.eventModalContainer.innerHTML = '';
}