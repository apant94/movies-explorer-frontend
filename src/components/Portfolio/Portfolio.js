import './Portfolio.css';

function Portfolio() {
  return (
  <section className='portfolio'>
    <h3 className='portfolio__title'>Портфолио</h3>
    <ul className='portfolio__wrappers'>
      <li className='portfolio__wrapper'>
        <a className='portfolio__site' href='https://apant94.github.io/how-to-learn/' target="_blank" rel="noreferrer">Статичный сайт</a>
        <a className='portfolio__arrow' href='https://apant94.github.io/how-to-learn/' target="_blank" rel="noreferrer">↗</a>
      </li>
      <li className='portfolio__wrapper'>
        <a className='portfolio__site' href='https://apant94.github.io/russian-travel/' target="_blank" rel="noreferrer">Адаптивный сайт</a>
        <a className='portfolio__arrow' href='https://apant94.github.io/russian-travel/' target="_blank" rel="noreferrer">↗</a>
      </li>
      <li className='portfolio__wrapper'>
        <a className='portfolio__site' href='https://apant94.github.io/react-mesto-auth/' target="_blank" rel="noreferrer">Одностраничное приложение</a>
        <a className='portfolio__arrow' href='https://apant94.github.io/react-mesto-auth/' target="_blank" rel="noreferrer">↗</a>
      </li>
    </ul>
  </section>
  );
}

export default Portfolio;