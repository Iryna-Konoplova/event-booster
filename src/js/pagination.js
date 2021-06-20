import NewsApiService from './apiService';
import Pagination from 'tui-pagination'; /* ES6 */

const apiService = new NewsApiService();

const container = document.getElementById('tui-pagination-container');
// const instance = new Pagination(container, {
//   totalItems: 1000,
//   itemsPerPage: 24,
//   visiblePages: 5,
// });
const options = {
  totalItems: 1000,
  itemsPerPage: 24,
  visiblePages: 5,
};
const instance = new Pagination(container, options);

// function onLoadMore() {
const totalElements = function f() {
  apiService.fetchEmbedded().totalElements;
};

// instance.getCurrentPage(); //получет текущую стр
// console.log(instance.getCurrentPage());
// instance.movePageTo(40); // переносит на др стр
// instance.getCurrentPage();
// console.log(instance.getCurrentPage());
// instance.reset(); //сбрасівает на 1 стр
console.log(instance.getCurrentPage());
instance.setTotalItems(totalElements); // надо как-то к ней присобачить кол-во карточек
console.log(options.totalItems);
