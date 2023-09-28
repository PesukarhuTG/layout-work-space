export const fileController = () => {
  const file = document.querySelector('.file');
  const preview = file.querySelector('.file__preview');
  const input = file.querySelector('.file__input');

  input.addEventListener('change', e => {
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
