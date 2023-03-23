import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard({ movie, onLikeClick, onDeleteClick }) {
  const [ isLiked, setIsLiked ] = useState(false);

  const cardLikeButtonClassName = (
    `moviescard__like ${isLiked ? 'moviescard__like_active' : 'moviescard__like'}`
  );

  function handleLikeClick(e) {
    e.preventDefault();
    e.target.classList.toggle('moviescard__like_active');
    if (!isLiked) {
      onLikeClick(movie);
      setIsLiked(true);
    } else {
      onDeleteClick(movie);
      setIsLiked(false);
    };
  }

  function convertTimeDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return(
    <article className='moviescard'>
      <div className='moviescard__container'>
        <h2 className='moviescard__name'>{movie.nameRU}</h2>
        <p className='moviescard__duration'>{convertTimeDuration(movie.duration)}</p>
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type='button'></button>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='moviescard__image' src={`https://api.nomoreparties.co${movie.image.url}`} alt='Постер к фильму' />
      </a>
    </article>
  );
}

export default MoviesCard;