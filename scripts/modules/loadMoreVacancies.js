import { cardsMessage } from '../script.js';
import { appData, pagination } from '../constants.js';
import { getData } from './getData.js';
import { renderMoreVacancies } from './renderMoreVacancies.js';
import { renderError } from './renderError.js';

export const loadMoreVacancies = () => {
  if (pagination.totalPages > pagination.currentPage) {
    const urlWithParams = new URL(appData.lastUrl);
    urlWithParams.searchParams.set('page', pagination.currentPage + 1);
    urlWithParams.searchParams.set('limit', window.innerWidth < 768 ? 6 : 12);

    cardsMessage.textContent = 'Идет загрузка данных...';

    getData(urlWithParams, renderMoreVacancies, renderError).then(() => {
      appData.lastUrl = urlWithParams;
    });
  }
};
