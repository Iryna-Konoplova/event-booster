import debounce from 'lodash.debounce';
import NewsApiService from './apiService';
import eventCardTpl from '../templates/event-card.hbs';
import eventCardModalTpl from '../templates/event-card-modal.hbs';
import countries from '../json/countries.json';
import selectOptionsTpl from '../templates/selectOptions';


const refs = {
  searchInput: document.querySelector('.hero-form-field'),
  eventsContainer: document.querySelector('.event-card-set'),
  eventCard: document.querySelector('.event-card-list'),
  modalOpen: document.querySelector('.backdrop'),
  eventModalContainer: document.querySelector('.modal-event-card'),
  buttonCloseModal: document.querySelector('.modal__btn-close'),
  // lightboxOverlay: document.querySelector('.backdrop'),
  selectCountry: document.querySelector('.select')
}

const newsApiService = new NewsApiService();
const optionsMarkup = createSelectorOptionsMarkup(countries);
var inputValue = '';
var selectValue;
refs.selectCountry.insertAdjacentHTML('beforeend', optionsMarkup);

refs.selectCountry.addEventListener('change', debounce(onSelectCountry, 1000));
refs.searchInput.addEventListener('input', debounce(onSearch, 1000));
refs.eventsContainer.addEventListener('click', onEventClick);


function onSearch(e) {
  e.preventDefault();
  resetPage();
  inputValue = e.target.value;
  newsApiService.query = inputValue.trim();
  newsApiService.countryQuery = selectValue;
  newsApiService.fetchEmbedded().then(appendEventsMarkup)
}

function onSelectCountry(e) {
  e.preventDefault();
  resetPage();
  selectValue = e.target.value;
  newsApiService.query = inputValue.trim();
  newsApiService.countryQuery = selectValue;
  newsApiService.fetchEmbedded().then(appendEventsMarkup)
}

function appendEventsMarkup(events) {
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventCardTpl(events));
}

function onEventClick(e) {
  //   evt.preventDefault();
  resetPage();

  if (e.target.classList.contains('event-card-set')) {
    return;
  }

  refs.modalOpen.classList.add('is-hidden');
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

  refs.modalOpen.classList.remove('is-hidden')
}

function onCloseModalEscapeKeydown(evt) {
  if (evt.code === 'Escape') {
    onButtonCloseModalClick();
  }
}

function resetPage() {
  refs.eventModalContainer.innerHTML = '';
}

function createSelectorOptionsMarkup(options) {
  return selectOptionsTpl(options);
}