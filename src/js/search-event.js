import countries from '../json/countries.json';
import NewsApiService from './apiService';
import selectOptionsTpl from '../templates/selectOptions';
import debounce from 'lodash.debounce';
import eventCardTpl from '../templates/event-card.hbs';

const refs = {
    eventModalContainer: document.querySelector('.modal-event-card'),
    searchInput: document.querySelector('.hero-form-field'),
    eventsContainer: document.querySelector('.event-card-set'),
    selectCountry: document.querySelector('.select')
}

const newsApiService = new NewsApiService();
const optionsMarkup = createSelectorOptionsMarkup(countries);
var inputValue = '';
var selectValue;
refs.selectCountry.insertAdjacentHTML('beforeend', optionsMarkup);

refs.selectCountry.addEventListener('change', debounce(onSelectCountry, 1000));
refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
    e.preventDefault();
    resetPage();
    inputValue = e.target.value;
    newsApiService.query = inputValue.trim();
    newsApiService.countryQuery = selectValue;
    newsApiService.fetchEmbedded().then(responseEvents => {
        appendEventsMarkup(responseEvents);    
    })   

}
  
function onSelectCountry(e) {
    e.preventDefault();
    resetPage();
    selectValue = e.target.value;
    newsApiService.query = inputValue.trim();
    newsApiService.countryQuery = selectValue;
    newsApiService.fetchEmbedded().then(responseEvents => {
        appendEventsMarkup(responseEvents);    
    })    
}

function resetPage() {
    refs.eventModalContainer.innerHTML = '';
}

function createSelectorOptionsMarkup(options) {
    return selectOptionsTpl(options);
}

function appendEventsMarkup(events) {
    console.log(events);
    refs.eventsContainer.innerHTML = eventCardTpl(events);
}