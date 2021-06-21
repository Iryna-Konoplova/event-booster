// const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
// const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+API_KEY;

const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this._countryQuery = '';
        this.id = '';
        this.page = 1;
        this.totalPages = 0;
       
    }

    fetchEmbedded() {
        console.log(this)
              let sizePage;
        if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
        sizePage = 21;
      } else{
        sizePage = 20;
        };
        
        var urlParams = '';
        if (this.searchQuery != '') {
            urlParams += `&keyword=${this.searchQuery}`;
        }
        if (this._countryQuery != undefined) {
            urlParams += `&countryCode=${this._countryQuery}`;
        }
        const url = `${BASE_URL}events.json?size=${sizePage}${urlParams}&page=${this.page}&apikey=${API_KEY}`;
        //  const url = `${BASE_URL}events.json?size=${sizePage}${urlParams}&page=${this.page}&apikey=${API_KEY}`;
        console.log(url);
        return  fetch(url)
                  .then(r => r.json())
                  .then(data => {
                //       try {
                //     //  this.page += 1;
                //     return data._embedded.events
                // }
                // catch(error) {
                //     return null;
                // }
                      this.page += 1;
                      console.log(data.page.totalPages)
                      console.log(data._embedded.events)
                     return data._embedded.events 

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
        const id = `https://app.ticketmaster.com/discovery/v2/events/${this.id}.json?apikey=${API_KEY}`;
        return fetch(id)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                // console.log(data._embedded.events)
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