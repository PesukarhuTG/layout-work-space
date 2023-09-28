import { filterToggle } from './modules/filterToggle.js';
import { selectCityControl } from './modules/selectCityControl.js';
import { vacancyControl } from './modules/vacancyControl.js';
import { modalVacancyControl } from './modules/modalVacancyControl.js';
import { filterFormControl } from './modules/filterFormControl.js';
import { scrollTopBtn } from './modules/scrollTop.js';
import { formController } from './modules/formController.js';
import { fileController } from './modules/fileController.js';
import { inputNumberController } from './modules/inputNumberController.js';
import { loadMoreVacancies } from './modules/loadMoreVacancies.js';

export const cardsList = document.querySelector('.cards__list');
export const cardsMessage = document.querySelector('.cards__message');
export const filterForm = document.querySelector('.filter__form');
export const vacanciesFilterBtn = document.querySelector(
  '.vacancies__filter-btn',
);
export const vacanciesFilterBlock =
  document.querySelector('.vacancies__filter');

export const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMoreVacancies();
      }
    });
  },
  {
    rootMargin: '100px',
  },
);

const init = () => {
  try {
    filterToggle();
    selectCityControl();
    vacancyControl(); // get cards
    modalVacancyControl();
    filterFormControl();
    scrollTopBtn();
  } catch (error) {
    console.log('Мы не на странице index.html');
    console.warn('error: ', error);
  }

  try {
    formController();
    fileController();
  } catch (error) {
    console.log('Мы не на странице employer.html');
    console.warn('error: ', error);
  }

  inputNumberController();
};

init();
