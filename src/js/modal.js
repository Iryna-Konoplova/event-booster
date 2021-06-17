// import debounce from 'lodash.debounce';
// import NewsApiService from './apiService';
// import eventCardTpl from '../templates/event-card.hbs';



// const refs = {
//     searchInput: document.querySelector('.hero-form-field'),
//     eventsContainer: document.querySelector('.event-card-set')
// }

// const newsApiService = new NewsApiService();

// refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

// function onSearch(e) {
//     e.preventDefault();

//     newsApiService.query = e.target.value.trim();
//     newsApiService.fetchEmbedded().then(appendEventsMarkup)   
// }

// function appendEventsMarkup(events) {
//   refs.eventsContainer.insertAdjacentHTML('beforeend', eventCardTpl(events));
// }