import { validationForm } from './validationForm.js';
import { API_URL, VACANCY_URL } from '../constants.js';

export const formController = () => {
  const form = document.querySelector('.employer__form');
  const employerError = document.querySelector('.employer__error');
  const validate = validationForm(form);

  form.addEventListener('submit', async e => {
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
