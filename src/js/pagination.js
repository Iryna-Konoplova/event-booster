//  import Pagination from 'tui-pagination';
//  import NewsApiService from './apiService';
// // import 'tui-pagination/dist/tui-pagination.css';

//  const newsApiService = new NewsApiService();

//  export default function renderPagination(totalItems) {
//    //console.log(totalItems);
//    const pagination = new Pagination('pagination', {
//      totalItems,
//      itemsPerPage: 20,
//      visiblePages: 5,
    
//      // ЭТО ШАБЛОН РАЗМЕТКИ 
//     template: {
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
//    });
   
//    pagination.on('afterMove', function (eventData) {
//      window.scrollTo({
//        top: 150,
//        behavior: 'smooth',
//      });
//      newsApiService.fetchEventsByCountryCode() 
//    });
//  }
