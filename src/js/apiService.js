// const axios = require('axios');

// const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
// const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+API_KEY;

// export default class NewsApiService {
//     constructor() {
//         this.searchQuery = '';
//         this._countryQuery = '';
//         this.id = '';
//         if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//             this.sizePage = 21;
//             } else{
//             this.sizePage = 20;
//         };       
//     }

//     async fetchEventsByCountryCode() {               
//           const data = await await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this._countryQuery}
//             &sort=date,name,asc&size=${this.sizePage}&apikey=${API_KEY}`)
//             .then(response => response.data._embedded) 
//             return data;
//     }  

//     fetchEmbedded() {
//         var urlParams = '';
//         if (this.searchQuery != '') {
//             urlParams += `&keyword=${this.searchQuery}`;
//         }
//         if (this._countryQuery != undefined) {
//             urlParams += `&countryCode=${this._countryQuery}`;
//         }
//         const url = `${BASE_URL}${urlParams}&size=20`;
//         console.log(url);
//         return  fetch(url)
//                   .then(r => r.json())
//                   .then(data => {
//                 try {
//                     return data._embedded.events
//                 }
//                 catch(error) {
//                     return null;
//                 }

//         })   
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }

//     get countryQuery() {
//         return this._countryQuery;
//     }

//     set countryQuery(newQuery) {
//         this._countryQuery = newQuery;
//     }
    
//     fetchEventById() {
//         const id = `https://app.ticketmaster.com/discovery/v2/events/${this.id}.json?apikey=${API_KEY}`;
//         return fetch(id)
//             .then(r => r.json())
//             .then(data => {
//                 console.log(data)
//                 // console.log(data._embedded.events)
//                 return data
//             })
//             .catch(() => {
//                 errorFromServerById();
//             });
  
//     }

//     get idEvent() {
//         return this.id;
//     }

//     set idEvent(newIdEvent) {
//         this.id = newIdEvent;
//     }
// }

import cardTemplate from '../templates/event-card.hbs';

const gallery = document.querySelector('.event-card-set');

export default class ApiService{
  constructor() {
    this.searchKeyword = '';
    this.searchCountry = '';
    this.currentPage = 0;
    this.params = {};
  }

  async getCountryByLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const result = await response.json();
        this.country = result.country;
        // добавить условие проверки деф страны!!!!!!!
        return result.country;
      } catch (error) {
          const DEFAULT_COUNTRY = 'GB';
          this.country = DEFAULT_COUNTRY;
          return DEFAULT_COUNTRY;
        }
  }

  async fetchEvents() {
    const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json`;
    const options = this.changeSearchOptions();

    try {
      const response = await fetch(BASE_URL+options);
      const result = await response.json();
      return result;
    } catch (error) {
      //
    }
  }

  async fetchEventByPage(page, country) {
    const apiKey = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
    const sort = 'date,asc';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=${country}&sort=${sort}&size=20&page=${page}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      
      console.log(result);
      this.getEvents(result._embedded.events);
    } catch (error) {
      //
    }
  }

  async fetchEventById(id) {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json`;
    const options = this.changeSearchOptions();
  
    try {
        const response = await fetch(url+options);
        const result = await response.json();
        return result;
    } catch (error) {
        //
    }
  }

  async getEvents(eventsArray) {
    try {
      await eventsArray.forEach(event => {
          event.images = [event.images.find(image => !image.fallback)]
      });
      gallery.innerHTML = '';
      this.createCardsMarkup(eventsArray);
    } catch (error) {
      //
    }
  }
  
  changeSearchOptions() {
    this.params.apikey = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
    this.params.countryCode = this.searchCountry;
    this.params.sort = 'date,asc';
    this.params.size = '20';
    this.params.page = this.currentPage;
    this.params.keyword = this.keyword;

    if (this.keyword === '') {
      delete this.params.keyword;
    }
    const keys = Object.keys(this.params);
    return keys.length
      ?
        "?" + keys
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.params[key]))
        .join("&")
      : "";
  }

  createCardsMarkup(events) {
    gallery.innerHTML = cardTemplate(events);
  }
  
  get keyword() {
    return this.searchKeyword;
  }
  get country() {
    return this.searchCountry;
  }
  get page() {
    return this.currentPage;
  }
  set keyword(newKeyword) {
    this.searchKeyword = newKeyword;
  }
  set country(newCountry) {
    this.searchCountry = newCountry;
  }
  set page(newPage) {
    this.currentPage = newPage - 1;
  }
}