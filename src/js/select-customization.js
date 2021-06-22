import Choices from 'choices.js';

const defaultSelect = () => {
  const element = document.querySelector('.select');
  const choices = new Choices(element, {
    searchEnabled: false,
    position: 'bottom',
    resetScrollPosition: false,
    itemSelectText: '',
    placeholder: false,
  });
};

defaultSelect();
