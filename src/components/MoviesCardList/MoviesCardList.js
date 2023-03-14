import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState } from 'react';

function MoviesCardList({movies}) {
  const getMoviesCount = (width) => {
    if (width >= 1280) {
        return 12;
    } else if (width >= 768) {
        return 8;
    } else {
        return 5;
    }
}

  const [width, setWidth] = useState(window.innerWidth); // стэйт ширины экрана юзера
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getMoviesCount(width)); //количество отображаемых фильмов


  

  return(
    <section className='movieslist'>
      {movies.slice(0, visibleMoviesCount).map((movie) => (
        <MoviesCard movie={movie} key={movie.id || movie.movieId} />
      ))}
      {visibleMoviesCount < movies.length && (
      <button className='movieslist__button' type='button'>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;