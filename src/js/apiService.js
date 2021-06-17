const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
    }

    fetchEmbedded() {
        // console.log(this)
        const url = `${BASE_URL}?keyword=${this.searchQuery}&apikey=${API_KEY}`;
        return  fetch(url)
                  .then(r => r.json())
                  .then(data => {
                  // console.log(data)
                  // console.log(data._embedded.events)
                return data._embedded.events
        })   
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    } 
}