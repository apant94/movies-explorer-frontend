import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, savedMovie, onLikeClick, onDeleteClick }) {
  const [ isLiked, setIsLiked ] = useState(false);
  const { pathname } = useLocation();
  const image = pathname === `${"/movies"}` ? `https://api.nomoreparties.co${movie.image.url}` : `${movie.image}`;
  const nameRU = pathname === `${"/saved-movies"}` ? `${movie.nameRU}` : `${movie.nameRU}`;
  const trailerLink = pathname === `${"/saved-movies"}` ? `${movie.trailerLink}` : `${movie.trailerLink}`;
  const duration = pathname === `${"/saved-movies"}` ? `${movie.duration}` : `${movie.duration}`;

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

  function handleDeleteClick(e) {
    e.preventDefault();
    onDeleteClick(movie);
    setIsLiked(false);
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
        {pathname === '/movies' && (<button onClick={handleLikeClick} className={cardLikeButtonClassName} type='button'></button>)}
        {pathname === '/saved-movies' && (<button onClick={handleDeleteClick} className='moviescard__delete' type='button'></button>)}
      </div>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className='moviescard__image' src={image} alt='Постер к фильму' />
      </a>
    </article>
  );
}

export default MoviesCard;