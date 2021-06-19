import './sass/main.scss';
import { refs } from './js/refs';

import searchEvent from './js/serch-event';

import homePage from './js/home-page';
import pagination from './js/pagination';
import modal from './js/modal';


import countries from './json/countries.json';
import selectOptionsTpl from './templates/selectOptions';


const selectCountry = document.querySelector('.select');
const inputEvent = document.querySelector('input');

var inputValue;
var selectValue;

selectCountry.addEventListener('change', (event) => {
  selectValue = event.target.value;
  searchEvent(inputValue, selectValue);
});

inputEvent.addEventListener('input', (event) => {
  inputValue = event.target.value;
  searchEvent(inputValue, selectValue);
});

// const refs = {
//   select: document.querySelector('.select')
// }


// const optionsMarkup = createSelectorOptionsMarkup(countries);
// refs.select.insertAdjacentHTML('beforeend', optionsMarkup);

// function createSelectorOptionsMarkup(options) {
//   return selectOptionsTpl(options);
// }
