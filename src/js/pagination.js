import NewsApiService from './apiService';
import Pagination from 'tui-pagination'; /* ES6 */

const apiService = new NewsApiService();

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 1000,
  itemsPerPage: 24,
  visiblePages: 5,
});

// instance.setItemsPerPage(10);

// const currentPage = apiService.page + 1;
// export default function getPage(array) {
//   //   try {
//   // const result = await apiService.fetchEvents();
//   const totalElements = array.page.totalElements;
//   console.log(totalElements);

//   pagination.setTotalItems(totalElements);

//   pagination.movePageTo(currentPage);
//   // getEvents(array);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
// }

// const options = {
//   totalItems: 1000,
//   itemsPerPage: 24,
//   visiblePages: 5,
//   page: currentPage,
// };

// const pagination = new Pagination(container, options);
