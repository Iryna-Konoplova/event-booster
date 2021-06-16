import './sass/main.scss';

import searchEvent from './js/serch-event';
// import homePage from './js/home-page';
// import pagination from './js/pagination';
// import modal from './js/modal';
// import { refs } from './js/refs';

import countries from './json/countries.json';
import selectOptionsTpl from './templates/selectOptions';

const selectCountry = document.querySelector('.select');
const inputEvent = document.querySelector('input');

selectCountry.addEventListener('change', (event) => {
  searchEvent();
  console.log(event.target.value); 
});

inputEvent.addEventListener('input',  (event) => {
  searchEvent();
  console.log(event.target.value); 
});

const refs = {
  select: document.querySelector('.select')
}

const optionsMarkup = createSelectorOptionsMarkup(countries);
refs.select.insertAdjacentHTML('beforeend', optionsMarkup);

function createSelectorOptionsMarkup(options) {
  return selectOptionsTpl(options);
}