import ApiService from './apiService';
import getEvents from './get-events';
import countries from './countriesList.json';
import getPage from './pagination';

const _ = require('lodash');
const apiService = new ApiService;

const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  gallery: document.querySelector('.event-card-set'),
  galleryText: document.querySelector('.default-info'),
  pafination: document.querySelector('.tui-pagination'),
  elements: document.querySelector('.elements'),
}

//initialization select2 list of country
$(document).ready(function () {
  $("#select").select2({
    placeholder: 'Select country',
    data: countries,
  });
})

async function getDefaultCountry() {
  const defaultCountry = await apiService.getCountryByLocation();
  const isIdOnList = countries.find(r => r.id === defaultCountry);
  //selected defaul country in list
  if (isIdOnList) {
    $("#select").select2().val(defaultCountry).trigger('change');
    const result = await apiService.fetchEvents();
    const totalItems = await result.page.totalElements;
    console.log(totalItems);
    await getEvents(result);
    
    if (totalItems > 0) {
      getPage(totalItems, defaultCountry);
    }

    if (totalItems < 20) {
      refs.elements.classList.add('elements-none');
    }
  
    
  } else {
    $("#select").select2().val('GB').trigger('change');
    apiService.country = 'GB';
    const result = await apiService.fetchEvents();
    const totalItems = await result.page.totalElements;
    await getEvents(result);
    getPage(totalItems, apiService.country);  
  }
}

// listener for select list
$('#select').on('select2:select', function (e) {
  onSelectCountry(e)
});

async function onSelectCountry(e) {
  clearMarkup();
  apiService.country = e.params.data.id;
  const result = await apiService.fetchEvents();
  const totalItems = await result.page.totalElements;
  await getEvents(result);

  if (totalItems > 0) {
    getPage(totalItems, apiService.country);
  }

  if (totalItems < 20) {
    refs.elements.classList.add('elements-none');
  } else {
    refs.elements.classList.remove('elements-none');
  }
}

async function onKeywordInput(e) {
  e.preventDefault();
  clearMarkup();
  const inputValue = e.target.value;
  apiService.keyword = inputValue;
  const result = await apiService.fetchEvents();
  const totalItems = await result.page.totalElements;
  await getEvents(result);

  if (totalItems > 0) {
    getPage(totalItems, apiService.country);
  }

  if (totalItems < 20) {
    refs.elements.classList.add('elements-none');
  } else {
    refs.elements.classList.remove('elements-none');
  }
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
  refs.galleryText.innerHTML = '';
  refs.pafination.innerHTML = '';
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));