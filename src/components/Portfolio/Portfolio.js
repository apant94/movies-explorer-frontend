import './Portfolio.css';

function Portfolio() {
  return (
  <section className='portfolio'>
    <h3 className='portfolio__title'>Портфолио</h3>
    <div className='portfolio__wrapper'>
      <p className='portfolio__site'>Статичный сайт</p>
      <a className='portfolio__arrow' href='https://apant94.github.io/how-to-learn/'>↗</a>
    </div>
    <div className='portfolio__wrapper'>
      <p className='portfolio__site'>Адаптивный сайт</p>
      <a className='portfolio__arrow' href='https://apant94.github.io/russian-travel/'>↗</a>
    </div>
    <div className='portfolio__wrapper'>
      <p className='portfolio__site'>Одностраничное приложение</p>
      <a className='portfolio__arrow' href='https://apant94.github.io/react-mesto-auth/'>↗</a>
    </div>
  </section>
  );
}

export default Portfolio;