const API_URL = 'https://basalt-buttoned-speedwell.glitch.me/';
const LOCATION_URL = 'api/locations';
const VACANCY_URL = 'api/vacancy';
const BOT_TOKEN = '6458107575:AAHFxz3A9VYlLFGF8a2ezf_85QAqd9kTxxQ';

const vacanciesFilterBtn = document.querySelector('.vacancies__filter-btn');
const vacanciesFilterBlock = document.querySelector('.vacancies__filter');

const cardsList = document.querySelector('.cards__list');
let lastUrl = '';
const pagination = {};

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

const inputNumberController = () => {
  const inputNumberElements = document.querySelectorAll('input[type="number"]');
  inputNumberElements.forEach((input) => {
    let value = '';

    input.addEventListener('input', (e) => {
      const symbol = e.data;
      // если введем букву = true
      if (isNaN(parseInt(symbol)) && symbol !== null) {
        e.target.value = value;
      }

      value = e.target.value;
    });
  });
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

const renderVacancies = (data) => {
  cardsList.textContent = 'Идет загрузка данных...';
  const cards = createCards(data);
  cardsList.textContent = '';
  cardsList.append(...cards);

  if (data.pagination) {
    Object.assign(pagination, data.pagination);
  }

  // add observe on the last card element
  observer.observe(cardsList.lastElementChild);
};

const renderMoreVacancies = (data) => {
  const cards = createCards(data);
  cardsList.append(...cards);

  if (data.pagination) {
    Object.assign(pagination, data.pagination);
  }

  // add observe on the last card element
  observer.observe(cardsList.lastElementChild);
};

const loadMoreVacancies = () => {
  if (pagination.totalPages > pagination.currentPage) {
    const urlWithParams = new URL(lastUrl);
    urlWithParams.searchParams.set('page', pagination.currentPage + 1);
    urlWithParams.searchParams.set('limit', window.innerWidth < 768 ? 6 : 12);

    getData(urlWithParams, renderMoreVacancies, renderError).then(() => {
      lastUrl = urlWithParams;
    });
  }
};

const renderError = (err) => console.warn(err);

const createDetailVacancy = ({
  company,
  description,
  email,
  experience,
  format,
  id,
  location,
  logo,
  salary,
  title,
  type,
}) => `
    <article class="detail" data-id="${id}">
      <div class="detail__header">
        <img class="detail__logo" src="${API_URL}${logo}" alt="Логотип компании ${company}" />
          <p class="detail__company">${company}</p>
          <h2 class="detail__title">${title}</h2>
      </div>
      <div class="detail__main">
        <p class="detail__description">
            ${description.replaceAll('\n', '<br>')}
        </p>

        <ul class="detail__fields">
          <li class="detail__field">от 
            ${parseInt(salary).toLocaleString()}₽
          </li>
          <li class="detail__field">${type}</li>
          <li class="detail__field">${format}</li>
          <li class="detail__field">${experience}</li>
          <li class="detail__field">${location}</li>
        </ul>
      </div>

      ${
        isNaN(parseInt(id.slice(-1)))
          ? `<p class="detail__contact">Отправляйте резюме на 
            <a class="accent-text" href="mailto:${email}">${email}</a>
          </p>
        `
          : `<form class="detail__tg">
            <input class="detail__input" type="text" name="message" placeholder="Напишите свой email для отклика" />
            <input name="vacancyId" type="hidden" value="${id}" />
            <button class="detail__btn">Отправить</button>
          </form>
        `
      }
    </article>
    
`;

const sendTelegram = (modal) => {
  modal.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target.closest('.detail__tg');

    const userId = '326943721';

    const text = `Отклик на вакансию ${form.vacancyId.value}, email: ${form.message.value}`;
    const urlBot = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${userId}&text=${text}`;

    fetch(urlBot)
      .then((res) => alert('Успешно отправлено'))
      .catch((err) => {
        alert('Ошибка');
        console.log(err);
      });
  });
};

const renderModal = (data) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalMain = document.createElement('div');
  modalMain.classList.add('modal__main');
  modalMain.innerHTML = createDetailVacancy(data);

  const modalClose = document.createElement('button');
  modalClose.classList.add('modal__close');
  modalClose.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <g>
        <path
          d="M10.7831 10L15.3887 5.39444C15.4797 5.28816 15.5272 5.15145 15.5218 5.01163C15.5164 4.87181 15.4585 4.73918 15.3595 
          4.64024C15.2606 4.5413 15.128 4.48334 14.9881 4.47794C14.8483 4.47254 14.7116 4.52009 14.6053 4.61111L9.99977 9.21666L5.39421 
          4.60555C5.2896 4.50094 5.14771 4.44217 4.99977 4.44217C4.85182 4.44217 4.70994 4.50094 4.60532 4.60555C4.50071 4.71017 4.44194 
          4.85205 4.44194 5C4.44194 5.14794 4.50071 5.28983 4.60532 5.39444L9.21643 10L4.60532 14.6056C4.54717 14.6554 4.49993 14.7166 
          4.46659 14.7856C4.43324 14.8545 4.4145 14.9296 4.41155 15.0061C4.40859 15.0826 4.42148 15.1589 4.44941 15.2302C4.47734 15.3015 
          4.51971 15.3662 4.57385 15.4204C4.62799 15.4745 4.69274 15.5169 4.76403 15.5448C4.83532 15.5727 4.91162 15.5856 4.98813 
          15.5827C5.06464 15.5797 5.13972 15.561 5.20864 15.5276C5.27757 15.4943 5.33885 15.447 5.38866 15.3889L9.99977 10.7833L14.6053 
          15.3889C14.7116 15.4799 14.8483 15.5275 14.9881 15.5221C15.128 15.5167 15.2606 15.4587 15.3595 15.3598C15.4585 15.2608 15.5164 
          15.1282 15.5218 14.9884C15.5272 14.8485 15.4797 14.7118 15.3887 14.6056L10.7831 10Z"
          fill="#ccc"
        />
      </g>
    </svg>
  `;

  modalMain.append(modalClose);

  modal.append(modalMain);
  document.body.append(modal);

  modal.addEventListener('click', (e) => {
    const target = e.target;

    if (target === modal || target.closest('.modal__close')) {
      modal.remove();
    }
  });

  sendTelegram(modal);
};

const openModal = (id) => {
  getData(`${API_URL}${VACANCY_URL}/${id}`, renderModal, renderError);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreVacancies();
      }
    });
  },
  {
    rootMargin: '100px',
  }
);

const scrollTopBtn = () => {
  const btnTop = document.querySelector('.btn-up');

  btnTop.addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  window.addEventListener('scroll', () => {
    const clientHeight = document.documentElement.clientHeight;

    if (window.scrollY > clientHeight / 4) {
      btnTop.classList.add('active-btn');
    } else {
      btnTop.classList.remove('active-btn');
    }
  });
};

const init = () => {
  // THIS CODE FOR INDEX.HTML
  try {
    const filterForm = document.querySelector('.filter__form');

    // launch library for select
    const citySelect = document.querySelector('#city');
    const cityChoices = new Choices(citySelect, {
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
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
    const urlWithParams = new URL(`${API_URL}${VACANCY_URL}`);

    urlWithParams.searchParams.set('limit', window.innerWidth < 768 ? 6 : 12);
    urlWithParams.searchParams.set('page', 1);

    getData(urlWithParams, renderVacancies, renderError).then(() => {
      lastUrl = urlWithParams;
    });

    // modal
    cardsList.addEventListener('click', (e) => {
      const target = e.target;
      const vacancyCard = target.closest('.vacancy');

      if (vacancyCard) {
        const vacancyId = vacancyCard.dataset.id;
        openModal(vacancyId);
      }
    });

    // filter
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      //get data form
      const formData = new FormData(filterForm);

      const urlWithParam = new URL(`${API_URL}${VACANCY_URL}`);

      formData.forEach((value, key) => {
        urlWithParam.searchParams.append(key, value);
      });

      getData(urlWithParam, renderVacancies, renderError).then(() => {
        lastUrl = urlWithParam;
      });
    });

    // filter btn on mobile devices
    vacanciesFilterBtn.addEventListener('click', (e) => {
      const target = e.target;

      target.classList.toggle('vacancies__filter-btn_active');
      vacanciesFilterBlock.classList.toggle('vacancies__filter_active');
    });

    scrollTopBtn();
  } catch (error) {
    console.warn(error.message);
  }

  // THIS CODE FOR EMPLOYER.HTML
  try {
    const validationForm = (form) => {
      const validate = new JustValidate(form, {
        errorsContainer: document.querySelector('.employer__error'),
        errorFieldStyle: {
          borderColor: '#f00',
        },
        errorLabelStyle: {
          color: '#f00',
        },
        errorFieldCssClass: 'invalid',
      });

      validate
        .addField('#logo', [
          {
            rule: 'minFilesCount',
            value: 1,
            errorMessage: 'Добавьте логотип',
          },
          {
            rule: 'files',
            value: {
              files: {
                extensions: ['jpeg', 'png', 'jpg'],
                maxSize: 102400,
                types: ['image/jpeg', 'image/png'],
              },
            },
            errorMessage: 'Размер файла должен быть не больше 100Кб',
          },
        ])
        .addField('#company', [
          {
            rule: 'required',
            errorMessage: 'Поле компании не заполнено',
          },
        ])
        .addField('#title', [
          {
            rule: 'required',
            errorMessage: 'Поле вакансии не заполнено',
          },
        ])
        .addField('#salary', [
          {
            rule: 'required',
            errorMessage: 'Поле зарплаты не заполнено',
          },
        ])
        .addField('#location', [
          {
            rule: 'required',
            errorMessage: 'Поле города не заполнено',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'Поле email не заполнено',
          },
          {
            rule: 'email',
            errorMessage: 'Email некорректен',
          },
        ])
        .addField('#description', [
          {
            rule: 'required',
            errorMessage: 'Описание вакансии не заполнено',
          },
        ])
        .addRequiredGroup('#format', 'Выберите формат')
        .addRequiredGroup('#experience', 'Выберите опыт')
        .addRequiredGroup('#type', 'Выберите занятость');

      return validate;
    };

    const fileController = () => {
      const file = document.querySelector('.file');
      const preview = file.querySelector('.file__preview');
      const input = file.querySelector('.file__input');

      input.addEventListener('change', (e) => {
        if (e.target.files !== null) {
          const src = URL.createObjectURL(e.target.files[0]);

          file.classList.add('file_active');
          preview.src = src;
          preview.alt = `логотип ${e.target.files[0].name.split('.')[0]}`;
          preview.style.display = 'block';
        } else {
          file.classList.remove('file_active');
          preview.src = '';
          preview.alt = '';
          preview.style.display = 'none';
        }
      });
    };

    const formController = () => {
      const form = document.querySelector('.employer__form');
      const employerError = document.querySelector('.employer__error');
      const validate = validationForm(form);

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validate.isValid) {
          return;
        }

        try {
          //create obj for body
          const formData = new FormData(form);

          employerError.textContent = 'Отправка данных, подождите...';

          const response = await fetch(`${API_URL}${VACANCY_URL}`, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            employerError.textContent = '';
            window.location.href = 'index.html';
          }
        } catch (error) {
          employerError.textContent = 'Произошла ошибка, попробуйте позже';
          console.error(error.message);
        }
      });
    };

    formController();
    fileController();
  } catch (error) {
    console.warn(error.message);
  }

  inputNumberController();
};

init();
