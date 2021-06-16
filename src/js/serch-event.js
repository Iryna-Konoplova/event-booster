const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=';
const apikey='LgD2oGhbb5VYMHYtmGPQVhOZglCXA59d';
//https://app.ticketmaster.com/discovery/v2/events.json?keyword=Dollar&apikey=LgD2oGhbb5VYMHYtmGPQVhOZglCXA59d

export default function searchEvent() {
    console.log(123);
    return 0;
    /*if (searchQuery === '') return;
    
    return fetch(`${BASE_URL}/name/${searchQuery}+apiKey`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .catch(error => {

        });*/
}

/*var debounce = require('lodash.debounce');

const cardContainer = document.querySelector('.js-card-container');

const input = document.querySelector('input');

input.addEventListener('input', debounce(searchCounntries, 500));

function searchCounntries(e) {
    const inputValue = e.target.value;
    const  countOfSpaces = checkSpaces(inputValue);
    if(inputValue != '') {
        if(countOfSpaces == 0) {
            countries(inputValue).then(countries => {
                const countriesLength = countries.length;
                if (countriesLength === 1) {
                    cardContainer.innerHTML = template(countries[0]);
                    return;
                } else if (countriesLength <= 10) {
                    cardContainer.innerHTML = countriesListTemplate(countries);
                    return;
                }
                else {
                    onFetchError();
                }
             }).catch(error => {
    
            });
        }
    } else {
        cardContainer.innerHTML = '';
    }
}

function checkSpaces(inputValue) {
    var countOfSpaces = 0;
    for (var i = 0, len = inputValue.length; i < len;i++) {
        countOfSpaces += inputValue.charAt(i) === " " ? 1 : 0;
    }
    return countOfSpaces;
}


function onFetchError() {
    error({
      text: 'Too many matches found. Please enter a more spesific query!',
      delay: '2000',
      maxTextHeight: null,
    });
  }*/
