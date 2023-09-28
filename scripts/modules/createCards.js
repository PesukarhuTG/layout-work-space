import { API_URL } from '../constants.js';

const createCard = ({
  id,
  company,
  experience,
  format,
  type,
  salary,
  title,
  logo,
}) =>
  `
  <article class="vacancy" tabindex="0" data-id="${id}">
    <img class="vacancy__img" src="${API_URL}${logo}" alt="Компания ${company}"/>
      <p class="vacancy__company">${company}</p>
      <h3 class="vacancy__title">${title}</h3>
      <ul class="vacancy__fields">
        <li class="vacancy__field">от ${parseInt(salary).toLocaleString()}₽</li>
        <li class="vacancy__field">${type}</li>
        <li class="vacancy__field">${format}</li>
        <li class="vacancy__field">${experience}</li>
      </ul>
  </article>
`;

export const createCards = data =>
  data.vacancies.map(vacancy => {
    const li = document.createElement('li');
    li.classList.add('cards__item');
    li.insertAdjacentHTML('beforeend', createCard(vacancy));
    return li;
  });
