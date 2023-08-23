const API_URL = 'https://workspace-methed.vercel.app/';
const LOCATION_URL = 'api/locations';
const VACANCY_URL = 'api/vacancy';

const cardsList = document.querySelector('.cards__list');

/* API requests */
const getData = async (url, cbSuccess, cbError) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    cbSuccess(data);
  } catch (err) {
    cbError(err);
  }
};

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

const createCards = (data) =>
  data.vacancies.map((vacancy) => {
    const li = document.createElement('li');
    li.classList.add('cards__item');
    li.insertAdjacentHTML('beforeend', createCard(vacancy));
    return li;
  });

const renderVacancy = (data) => {
  cardsList.textContent = '';
  const cards = createCards(data);
  cardsList.append(...cards);
};

const renderError = (err) => console.warn(err);

const init = () => {
  // launch library for select
  const citySelect = document.querySelector('#city');
  const cityChoices = new Choices(citySelect, {
    searchEnabled: true,
    itemSelectText: '',
  });

  // get city list
  getData(
    `${API_URL}${LOCATION_URL}`,
    (locationData) => {
      const locations = locationData.map((location) => ({
        value: location,
      }));
      cityChoices.setChoices(locations, 'value', 'label', true);
    },
    (err) => {
      console.log(err);
    }
  );

  // get cards
  const url = new URL(`${API_URL}${VACANCY_URL}`);
  getData(url, renderVacancy, renderError);
};

init();
