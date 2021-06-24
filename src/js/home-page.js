'use strict';
import eventCardTpl from '../templates/event-card.hbs';
import NewsApiService from './apiService';
import countries from '../json/countries.json';
import { refs } from '../js/refs';

const newsApiService = new NewsApiService();

markupHomePage();

//Функция отрисовки event`s по "random countryCode"
async function markupHomePage() {
  try{
    newsApiService.countryQuery = getRandomCountryCode();
    const markup = await newsApiService.fetchEventsByCountryCode().then(r => {
      refs.select.value = newsApiService.countryQuery;
      appendEventsMarkup(r.events);
    }) 
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