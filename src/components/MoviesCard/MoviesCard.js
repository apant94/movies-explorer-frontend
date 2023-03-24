import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, onLikeClick, onDeleteClick }) {
  const [ isLiked, setIsLiked ] = useState(false);
  const {pathname} = useLocation();
  const image = pathname === `${"/movies"}` ? `https://api.nomoreparties.co${movie.image.url}`: `${movie.data.image}`;
  const nameRU = pathname === `${"/saved-movies"}` ? `${movie.data.nameRU}`: `${movie.nameRU}`;
  const trailerLink = pathname === `${"/saved-movies"}` ? `${movie.data.trailerLink}`: `${movie.trailerLink}`;
  const duration = pathname === `${"/saved-movies"}` ? `${movie.data.duration}`: `${movie.duration}`;

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
        <h2 className='moviescard__name'>{nameRU}</h2>
        <p className='moviescard__duration'>{convertTimeDuration(duration)}</p>
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} type='button'></button>
      </div>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className='moviescard__image' src={image} alt='Постер к фильму' />
      </a>
    </article>
  );
}

export default MoviesCard;