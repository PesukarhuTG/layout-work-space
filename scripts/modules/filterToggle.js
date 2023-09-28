import { vacanciesFilterBlock, vacanciesFilterBtn } from '../script.js';

export const filterToggle = () => {
  vacanciesFilterBtn?.addEventListener('click', e => {
    const target = e.target;

    target.classList.toggle('vacancies__filter-btn_active');
    vacanciesFilterBlock.classList.toggle('vacancies__filter_active');
  });
};
