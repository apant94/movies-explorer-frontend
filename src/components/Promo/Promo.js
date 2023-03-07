import './Promo.css';
import ImagePath from '../../images/promo-img.svg'

function Promo() {
  return (
  <section className='promo'>
    <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
    <img className='promo__image' src={ImagePath} alt='Пружинка' />

  </section>
  );
}

export default Promo;