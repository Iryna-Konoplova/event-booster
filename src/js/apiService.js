const axios = require('axios');
// import pagination from './pagination';

const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class NewsApiService {
    constructor() {
      this.searchQuery = '';
      this._countryQuery = '';
      this.id = '';
      this.page = 1;
      this.totalPages;
        if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
          this.sizePage = 21;
        } else{
          this.sizePage = 20;
        };
    }

    async fetchEventsByCountryCode() {               
          const data = await axios.get(`${BASE_URL}events.json?countryCode=${this._countryQuery}
            &sort=date,name,asc&size=${this.sizePage}&apikey=${API_KEY}`)
          .then(response => response.data._embedded)
            // pagination(data)
            return data;
    }  

    fetchEmbedded() {
        var urlParams = '';
        if (this.searchQuery != '') {
            urlParams += `&keyword=${this.searchQuery}`;
        }
        if (this._countryQuery != undefined) {
            urlParams += `&countryCode=${this._countryQuery}`;
        }

        const url = `${BASE_URL}events.json?${urlParams}&size=${this.sizePage}&page=${this.page}&apikey=${API_KEY}`;
       
        return  fetch(url)
            .then(response => {
              if (response.status === 200) {
              return response.json();
              }
              throw new Error('===Data not fetched from server!===');
            })
            .then(data => {
              try {
                this.page += 1;
                return data._embedded.events
                }
              catch(error) {
                return null;
                }
        })   
  }
  
    resetPage() {
    this.page = 1;
  }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get countryQuery() {
        return this._countryQuery;
    }

    set countryQuery(newQuery) {
        this._countryQuery = newQuery;
    }
    
    fetchEventById() {
        const id = `${BASE_URL}events/${this.id}.json?apikey=${API_KEY}`;
        return fetch(id)
            .then(response => {
              if (response.status === 200) {
              return response.json();
              }
              throw new Error('===Data not fetched from server!===');
            })
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(() => {
                errorFromServerById();
            });
    }

    get idEvent() {
        return this.id;
    }

    set idEvent(newIdEvent) {
        this.id = newIdEvent;
    }
}