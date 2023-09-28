export const validationForm = form => {
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
