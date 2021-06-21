// ссылка на библиотеку https://pagination.js.org/index.html
// выбранный тип Asynchronous & Dynamic total number

// import { BASE_URL, API_KEY } from '...........'; получаем доступ к основной ссылке и ключу
// import { onRenderingSearchEvents } from './serch-event';   получаем доступ к функции, которая рендерит события на странице

// function getPagination(options) {
//   $('#pagination-container').pagination({
//     dataSource: `${BASE_URL}?${options}&apikey=${API_KEY}`,
//     locator: '_embedded.events',
//     totalNumberLocator: function (response) {

//       // you can return totalNumber by analyzing response content. Не понимаю, как на практике будет работать функция ниже.
//       Или лучше прописать как - то через if несколько вариантов в зависимости от результатов поиска ??

//       return Math.floor(Math.random() * (1000 - 100)) + 100;
//     },

//     alias: {
//       pageNumber: 'page',
//       pageSize: 'size',
//     },
//     pageSize: 24,
//     callback: function (data) {
//       onRenderingSearchEvents(data, '#dataContainer');
//     },
//     showPrevious: false,
//     showNext: false,
//   });
// }


// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// import NewsApiService from './apiService';
// import Pagination from 'tui-pagination'; /* ES6 */
// const apiService = new NewsApiService();
// const container = document.getElementById('tui-pagination-container');
// const currentPage = apiService.page + 1;
// export default function getTotalEl() {
//   const totalElements = apiService.page.totalElements;
//   pagination.setTotalItems(totalElements);
// }
// const options = {
//   totalItems: 1000,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: currentPage, //+
// };
// const pagination = new Pagination(container, options);


// import Pagination from 'tui-pagination';

// import NewsApiService from './apiService';

// const newsApiService = new NewsApiService();

// const container = document.getElementById('tui-pagination-container');

// const options = {
//   totalItems: 10,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: newsApiService.page,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//       '</a>'
//   }
// };

// const pagination = new Pagination(container, options);

// pagination.on('beforeMove', evt => {
//   const { page } = evt;
//   const result = ajax.call({page});

//   if(result) {
//     pagination.movePageTo(page);
//   } else {
//     return false;
//   }
// });

// pagination.on('afterMove', ({ page }) => console.log(page));




 import Pagination from 'tui-pagination';
// import ВАШ_FETCH from '../js/fetch....;
 import NewsApiService from './apiService';
//  import 'tui-pagination/dist/tui-pagination.css';
import fetchUserCountryCodeByIp from './home-page';

 const newsApiService = new NewsApiService();

 export default function renderPagination(totalItems) {
   //console.log(totalItems);
   const pagination = new Pagination('pagination', {
     totalItems,
     itemsPerPage: 20,
     visiblePages: 5,
    
     // ЭТО ШАБЛОН РАЗМЕТКИ 
    template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
   });
   
   pagination.on('afterMove', function (eventData) {
     window.scrollTo({
       top: 150,
       behavior: 'smooth',
     });
     fetchUserCountryCodeByIp() 
      // newsApiService.fetchEmbedded()
    //  if (ВАШ_FETCH.ЗАПРОС№1 === false) {
    //    ВАШ_FETCH.ЗАПРОС№2(eventData.page);
    //  } else if (ВАШ_FETCH.ЗАПРОС№1 === true) {
    //    ВАШ_FETCH.ЗАПРОС№1(eventData.page);
    //  }
   });
 }