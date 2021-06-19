const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this._countryQuery = '';
    this.id = '';
    this.currentPage = 0; // main
  }

  fetchEmbedded() {
    // console.log(this)
    const url = `${BASE_URL}?keyword=${this.searchQuery}&&countryCode=${this._countryQuery}&size=20&apikey=${API_KEY}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        //   console.log(data)
        //   console.log(data._embedded.events)
        return data._embedded.events;
      });
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

  set countryQueryy(newQuery) {
    this._countryQuery = newСountryQuery;
  }

  fetchEventById() {
    const id = `https://app.ticketmaster.com/discovery/v2/events/${this.id}.json?apikey=${API_KEY}`;
    return fetch(id)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        // console.log(data._embedded.events)
        return data;
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
