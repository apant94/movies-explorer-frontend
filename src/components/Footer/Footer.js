import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2023</p>
        <nav className='footer__links'>
          <ul className='footer__list'>
            <li><a className='footer__link-item' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a></li>
            <li><a className='footer__link-item' href='https://github.com/apant94'>Github</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;