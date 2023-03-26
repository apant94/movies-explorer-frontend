import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useState, useEffect } from 'react';

function MoviesCardList({ movies, savedMovies, isLoading, setIsLoading, noResult, onLikeClick, onDeleteClick }) {

  // функция для выделения сохраненных фильмов
  function getSavedMovie(list, movie) {
    return list.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  // устанавливаем количество изображаемых фильмов в зависимости от ширины экрана
  const getMoviesCount = (width) => {
    if (width >= 1280) {
        return 12;
    } else if (width >= 768) {
        return 8;
    } else {
        return 5;
    }
  }

  // устанавливаем количество изображаемых фильмов после нажатия на кнопку ещё
  const getMoreMoviesStep = (width) => {
    if (width >= 1280) {
        return 3;
    } else {
        return 2;
    }
  }

  const [width, setWidth] = useState(window.innerWidth); // стэйт ширины экрана юзера
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getMoviesCount(width)); //количество отображаемых фильмов

  // функция загрузки фильмов после кнопки ещё
  const addMoreMovies = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleMoviesCount((prevCount)=> prevCount + getMoreMoviesStep(width));
      setIsLoading(false);
    }, 600);
  }

  // вешаем слушатель на размер экрана для изменения количества отображаемых фильмов
  useEffect(() => {
    let timeoutId = null;

    const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };

    window.addEventListener('resize', resizeListener);

    return() => {
        window.removeEventListener('resize', resizeListener)
    }; 
  }, []);

  return(
    <section className='movieslist'>
      {movies.slice(0, visibleMoviesCount).map((movie) => (
        <MoviesCard 
          onLikeClick={onLikeClick} 
          onDeleteClick={onDeleteClick} 
          movie={movie} 
          savedMovie={getSavedMovie(savedMovies, movie)}
          key={movie.id || movie.movieId} 
        />
      ))}
      {isLoading && <Preloader />}
      {!isLoading && noResult && <p className='movieslist__noresult'>Ничего не найдено</p>}
      {visibleMoviesCount < movies.length && (
      <button className='movieslist__button' type='button' onClick={addMoreMovies}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;