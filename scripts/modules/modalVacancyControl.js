import { cardsList } from '../script.js';
import { openModal } from './modalControl.js';

export const modalVacancyControl = () => {
  cardsList.addEventListener('click', e => {
    const target = e.target;
    const vacancyCard = target.closest('.vacancy');

    if (vacancyCard) {
      const vacancyId = vacancyCard.dataset.id;
      openModal(vacancyId);
    }
  });
};
