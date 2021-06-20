'use strict';
// import '../sass/main';
import eventCardTpl from '../templates/event-card.hbs';
const axios = require('axios');
// import countries from '../json/countries.json';
// import selectOptionsTpl from '../templates/selectOptions';

const BASE_DISCOVERY_URL = 'https://app.ticketmaster.com/discovery/v2/';
const DISCOVERY_KEY = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

const IPSTACK_KEY = '07cf455019ad129b53694afd3f2a3f3d';
const BASE_IPSTACK_URL = 'http://api.ipstack.com/';

const refs = {
  searchInput: document.querySelector('.hero-form-field'),
  eventsContainer: document.querySelector('.event-card-set'),
  select: document.querySelector('.select')
}

markupHomePage();

async function fetchEvents(countryCode = ''){ 
  let sizePage;
    if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    sizePage = 21;
    } else{
    sizePage = 20;
    };
    const data = await axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}
    &sort=date,name,asc&size=${sizePage}&apikey=${DISCOVERY_KEY}`)
      .then(response => {
        return response.data._embedded
      }) 
      return data;
}  

// Функция получения "countryCode" с помощью "IPSTACK API"
async function fetchUserCountryCodeByIp() {
    const userCountryCode = await axios.get(`${BASE_IPSTACK_URL}check?access_key=${IPSTACK_KEY}`)
      .then(response => response.data.country_code);
    return userCountryCode;
}

//Функция отрисовки event`s по "countryCode" or "All countries"
async function markupHomePage() {
  try{
    const countryCode = await fetchUserCountryCodeByIp();
    // console.log('markupHomePage ~ countryCode', countryCode)
    fetchEvents(countryCode).then(response => {
      if(!response) {  
        fetchEvents('').then(response => appendEventsMarkup(response.events))
      }else{
        refs.select.value = countryCode;
        appendEventsMarkup(response.events)
      }
    }) 
    }catch (error){
      console.log(error)
    }
}

function appendEventsMarkup(event) {
  const eventMarkup = eventCardTpl(event);
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventMarkup);
}

// const optionsMarkup = createSelectorOptionsMarkup(countries);
// refs.select.insertAdjacentHTML('beforeend', optionsMarkup);

// function createSelectorOptionsMarkup(options) {
//   return selectOptionsTpl(options);
// }