'use strict';
// import '../sass/main';
import eventCardTpl from '../templates/event-card.hbs';
// const axios = require('axios');
import NewsApiService from './apiService';
import countries from '../json/countries.json';
// import selectOptionsTpl from '../templates/selectOptions';

const refs = {
  searchInput: document.querySelector('.hero-form-field'),
  eventsContainer: document.querySelector('.event-card-set'),
  select: document.querySelector('.select')
}

const newsApiService = new NewsApiService();

markupHomePage();

//Функция отрисовки event`s по "random countryCode"
async function markupHomePage() {
  // const randomCountryCode = getRandomCountryCode();
  try{
    newsApiService.countryQuery = getRandomCountryCode();
    console.log(newsApiService.countryQuery)
    const markup = await newsApiService.fetchEventsByCountryCode().then(r => {
      console.log(r)
      // refs.select.value = randomCountryCode;
      refs.select.value = newsApiService.countryQuery;
      appendEventsMarkup(r.events);
    })

  //   const countryCode = await fetchUserCountryCodeByIp();
  //   // console.log('markupHomePage ~ countryCode', countryCode)
  //   fetchEvents(countryCode).then(response => {
  //     if(!response) {  
  //       fetchEvents('').then(response => appendEventsMarkup(response.events))
  //     }else{
  //       refs.select.value = countryCode;
  //       appendEventsMarkup(response.events)
  //     }
  //   }) 
    }catch (error){
      console.log(error)
    }
}

function appendEventsMarkup(event) {
  const eventMarkup = eventCardTpl(event);
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventMarkup);
}

function getRandomCountryCode() {
  const allCountryCodes = countries.map(country => country.countryCode)
  const countriesLengt = allCountryCodes.length
  const randomNumber = Math.floor(Math.random() * (countriesLengt - 0) + 0);
  return allCountryCodes[randomNumber];
}

// async function fetchEvents(countryCode = ''){ 
//   let sizePage;
//     if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//     sizePage = 21;
//     } else{
//     sizePage = 20;
//     };
//     const data = await axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}
//     &sort=date,name,asc&size=${sizePage}&apikey=${DISCOVERY_KEY}`)
//       .then(response => {
//         return response.data._embedded
//       }) 
//       return data;
// }  