import { cardsList, observer, cardsMessage } from '../script.js';
import { pagination } from '../constants.js';
import { createCards } from './createCards.js';

export const renderMoreVacancies = data => {
  const cards = createCards(data);
  cardsList.append(...cards);
  cardsMessage.textContent = '';

  if (data.pagination) {
    Object.assign(pagination, data.pagination);
  }

  // add observe on the last card element
  observer.observe(cardsList.lastElementChild);
};
