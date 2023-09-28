export const scrollTopBtn = () => {
  const btnTop = document.querySelector('.btn-up');

  btnTop.addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  window.addEventListener('scroll', () => {
    const clientHeight = document.documentElement.clientHeight;
    console.log('scroll');

    if (window.scrollY > clientHeight / 4) {
      btnTop.classList.add('active-btn');
    } else {
      btnTop.classList.remove('active-btn');
    }
  });
};
