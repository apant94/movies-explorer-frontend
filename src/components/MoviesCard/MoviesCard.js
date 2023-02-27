import './MoviesCard.css';
import MoviePath from '../../images/moviescard-image.jpg';
import { useState } from 'react';

function MoviesCard() {
  const {isLiked, setIsLiked} = useState(false);

  const cardLikeButtonClassName = (
    `moviescard__like ${isLiked ? 'moviescard__like_active' : 'moviescard__like'}`
  );

  function handleLikeClick(e) {
    e.preventDefault();
    setIsLiked(true);
  }

  return(
    <article className='moviescard'>
      <div className='moviescard__container'>
        <h2 className='moviescard__name'>33 слова о дизайне</h2>
        <p className='moviescard__duration'>1ч 42м</p>
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type='button'></button>
      </div>
      <img className='moviescard__image' src={MoviePath} alt='Постер к фильму' />
    </article>
  );
}

export default MoviesCard;