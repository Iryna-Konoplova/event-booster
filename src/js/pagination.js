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
