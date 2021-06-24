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


import ApiService from './apiService';
const Pagination = require('tui-pagination');
const apiService = new ApiService;

export default function getPage(totalItems, country) {

  if (totalItems > 1000) {
    totalItems = 1000;
  }

  const pagination = new Pagination('pagination', {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    usageStatistics: false,
    // ЭТО ШАБЛОН РАЗМЕТКИ  
    template: {
      page: '<a href="#" class="tui-page-btn btn-page btn">{{page}}</a>',
      currentPage:
        '<a href="#" class="tui-page-btn btn-page active btn">{{page}}</a>',
      moveButton:  '<a href="#" class="tui-page-btn tui-{{type}}"></a>',
      disabledMoveButton:
        '<a href ="#" class="{{type}} custom-class-{{type}}"></a>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('afterMove', function (eventData) {
    window.scrollTo({
      top: 150,
      behavior: 'smooth',
    });
   
   apiService.fetchEventByPage(eventData.page - 1, country);
  });
} 