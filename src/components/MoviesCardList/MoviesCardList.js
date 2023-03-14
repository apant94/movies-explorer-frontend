import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useState } from 'react';

function MoviesCardList({movies}) {

  // устанавливаем количество изображаемых мувикардс в зависимости от ширины экрана
  const getMoviesCount = (width) => {
    if (width >= 1280) {
        return 12;
    } else if (width >= 768) {
        return 8;
    } else {
        return 5;
    }
  }

  const getMoreMoviesStep = (width) => {
    if (width >= 1280) {
        return 3;
    } else {
        return 2;
    }
  }

  const [width, setWidth] = useState(window.innerWidth); // стэйт ширины экрана юзера
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getMoviesCount(width)); //количество отображаемых фильмов
  const [isLoading, setisLoading] = useState(false); //стэйт прелоадера

  const addMoreMovies = () => {
    setisLoading(true)
    setTimeout(() => {
      setVisibleMoviesCount((prevCount)=> prevCount + getMoreMoviesStep(width));
        setisLoading(false)
    }, 600)
  }

  return(
    <section className='movieslist'>
      {movies.slice(0, visibleMoviesCount).map((movie) => (
        <MoviesCard movie={movie} key={movie.id || movie.movieId} />
      ))}
      {isLoading && <Preloader />}
      {visibleMoviesCount < movies.length && (
      <button className='movieslist__button' type='button' onClick={addMoreMovies}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;