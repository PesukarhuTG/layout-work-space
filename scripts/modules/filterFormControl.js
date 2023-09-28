import { filterForm } from '../script.js';
import { appData, API_URL, VACANCY_URL } from '../constants.js';
import { getData } from './getData.js';
import { renderError } from './renderError.js';
import { renderVacancies } from './renderVacancies.js';

export const filterFormControl = () => {
  filterForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(filterForm);
    const urlWithParam = new URL(`${API_URL}${VACANCY_URL}`);

    formData.forEach((value, key) => {
      urlWithParam.searchParams.append(key, value);
    });

    getData(urlWithParam, renderVacancies, renderError).then(() => {
      appData.lastUrl = urlWithParam;
    });
  });
};
