const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+API_KEY;

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this._countryQuery = '';
        this.id = '';
    }

    fetchEmbedded() {
        var urlParams = '';
        if (this.searchQuery != '') {
            urlParams += `&keyword=${this.searchQuery}`;
        }
        if (this._countryQuery != undefined) {
            urlParams += `&countryCode=${this._countryQuery}`;
        }
        const url = `${BASE_URL}${urlParams}&size=20`;
        console.log(url);
        return  fetch(url)
                  .then(r => r.json())
                  .then(data => {
                try {
                    return data._embedded.events
                }
                catch(error) {
                    return null;
                }

        })   
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