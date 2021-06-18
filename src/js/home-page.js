'use strict';
// import '../sass/main';
import eventCardTpl from '../templates/event-card.hbs';
const axios = require('axios');

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
  let page = 0;
  try{
    if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    sizePage = 21;
    } else{
    sizePage = 20;
    };

    const data = await axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}
    &sort=date,name,asc&size=${sizePage}&page=${page}&&apikey=${DISCOVERY_KEY}`)
      .then(response => {
        page += 1;
        return response.data._embedded.events
      }) 
      return data;
  }catch (err) {
    console.log(err)  ;
  }
}  

// Функция получения "countryCode" с помощью "IPSTACK API"
async function fetchUserCountryCodeByIp() {
  try{
    const userCountryCode = await axios.get(`${BASE_IPSTACK_URL}check?access_key=${IPSTACK_KEY}`)
      .then(response => response.data.country_code);
    return userCountryCode;
  }catch (error){
    console.log(error);
  }
}

//Функция отрисовки event`s по "countryCode" or "All countries"
async function markupHomePage() {
  try{
    await fetchUserCountryCodeByIp()
    .then(countryCode => {
       refs.select.value = countryCode;
       fetchEvents(countryCode).then( r => appendEventsMarkup(r))
       return fetchEvents(countryCode)
                
    })
    .then(response => {
      if(!response){
        refs.select.value = '';
        return fetchEvents()
                .then(response => {
                  return appendEventsMarkup(response)
                })
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
