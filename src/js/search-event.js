import NewsApiService from './apiService';
import debounce from 'lodash.debounce';
import eventCardTpl from '../templates/event-card.hbs';
import countries from '../json/countries.json';
import selectOptionsTpl from '../templates/selectOptions';
import { refs } from '../js/refs';

const newsApiService = new NewsApiService();

const optionsMarkup = createSelectorOptionsMarkup(countries);
var inputValue = '';
var selectValue;

refs.select.insertAdjacentHTML('beforeend', optionsMarkup);
refs.select.addEventListener('change', debounce(onSelectCountry, 500));
refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  resetPage();
  inputValue = e.target.value;
  newsApiService.query = inputValue.trim();
  newsApiService.countryQuery = selectValue;
  newsApiService.fetchEmbedded().then(responseEvents => {
  appendEventsMarkup(responseEvents);
  });
}

function onSelectCountry(e) {
  e.preventDefault();
  resetPage();
  selectValue = e.target.value;
  newsApiService.query = inputValue.trim();
  newsApiService.countryQuery = selectValue;
  newsApiService.fetchEmbedded().then(responseEvents => {
  appendEventsMarkup(responseEvents);
  });
}

function resetPage() {
  refs.eventsContainer.innerHTML = '';
}

function appendEventsMarkup(events) {
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventCardTpl(events));
}

function createSelectorOptionsMarkup(options) {
  return selectOptionsTpl(options);
}