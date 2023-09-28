import { cardsList, observer, cardsMessage } from '../script.js';
import { pagination } from '../constants.js';
import { createCards } from './createCards.js';

export const renderVacancies = async data => {
  try {
    cardsMessage.textContent = 'Идет загрузка данных...';
    const cards = await createCards(data);
    cardsList.textContent = '';
    cardsMessage.textContent = '';

    if (cards.length) {
      cardsList.append(...cards);
    } else {
      cardsMessage.textContent =
        'К сожалению, данных по запросу не найдено. Попробуйте выбрать другие параметры';
    }

    if (data.pagination) {
      Object.assign(pagination, data.pagination);
    }

    // add observe on the last card element
    observer.observe(cardsList.lastElementChild);
  } catch (error) {
    console.warn(error);
  }
};
