import { BOT_TOKEN } from '../constants.js';

export const sendTelegram = modal => {
  modal.addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target.closest('.detail__tg');
    const userId = '326943721';
    const text = `Отклик на вакансию ${form.vacancyId.value}, email: ${form.message.value}`;
    const urlBot = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${userId}&text=${text}`;

    fetch(urlBot)
      .then(res => alert('Успешно отправлено'))
      .catch(err => {
        alert('Ошибка');
        console.log(err);
      });
  });
};
