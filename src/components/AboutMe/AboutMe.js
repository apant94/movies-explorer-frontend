import './AboutMe.css';

function AboutMe() {
  return (
  <section className='aboutme'>
    <h2 className='main__title'>Студент</h2>
    <div className='aboutme__profile-container'>
      <h3 className='aboutme__name'>Анна</h3>
      <p className='aboutme__definition'>Фронтенд&#8209;разработчик, 29&nbsp;лет</p>
      <p className='aboutme__text'>Я родилась и живу в Москве, закончила НИУ-ВШЭ и ФА при Правительстве РФ по направлению экономика. У меня есть собачка корги. Я люблю лепить посуду, а ещё у меня в течение 5 лет был свой бренд одежды. Уже больше года занимаюсь кодингом. В процессе прохождения курса по веб-разработке начала заниматься фриланс-заказами и снова обрела горящие глаза и новую себя. Я&nbsp;себе&nbsp;такой&nbsp;нравлюсь&nbsp;:)</p>
      <div className='aboutme__link-wrapper'><a className='aboutme__link' href='https://github.com/apant94'>Github</a></div>
      <img className='aboutme__avatar' src='https://i.ibb.co/58cfZDY/photo-2022-09-17-18-25-57.jpg' alt='Фото меня' />
    </div>
    <h3 className='aboutme__portfolio'>Портфолио</h3>
    <div className='aboutme__portfolio-wrapper'>
      <p className='aboutme__portfolio-site'>Статичный сайт</p>
      <a className='aboutme__portfolio-arrow' href='https://apant94.github.io/how-to-learn/'>↗</a>
    </div>
    <div className='aboutme__portfolio-wrapper'>
      <p className='aboutme__portfolio-site'>Адаптивный сайт</p>
      <a className='aboutme__portfolio-arrow' href='https://apant94.github.io/russian-travel/'>↗</a>
    </div>
    <div className='aboutme__portfolio-wrapper'>
      <p className='aboutme__portfolio-site'>Одностраничное приложение</p>
      <a className='aboutme__portfolio-arrow' href='https://apant94.github.io/react-mesto-auth/'>↗</a>
    </div>
  </section>
  );
}

export default AboutMe;