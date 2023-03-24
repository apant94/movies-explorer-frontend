import './Movies.css';
import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ isLoading, setIsLoading, savedMovies, onLikeClick, onDeleteClick }) {
  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const [filteredMovies, setFilteredMovies] = useState([]); // стэйт результатов поиска по фильмам (initialMovies)
  const [shortMovies, setShortMovies] = useState(false); // стейт чекбокса короткометражек
  const [filteredOrShortMovies, setFilteredOrShortMovies] = useState([]); // отфильтрованные фильмы по короткометражке и поиску (filteredMovies) 
  const [noResult, setNoResult] = useState(false); // стейт отсутствия результатов по поиску (NotFound)

// Поиск по всем фильмам 
  // фильтрация фильмов по запросу
  function filterMovies(movies, userQuery, onShortMoviesCheckbox) {
    const moviesByQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase();
      const movieEn = String(movie.nameEN).toLowerCase();
      const chosenMovie = userQuery.toLowerCase();
      return movieRu.indexOf(chosenMovie) !== -1 || movieEn.indexOf(chosenMovie) !== -1;
    });
    // условие для состояния чекбокса с короткометражками
    if (onShortMoviesCheckbox) {
      return filterShortMovies(moviesByQuery);
    } else {
      return moviesByQuery;
    }
  }

  // поиск по массиву и установка состояния
  function handleSetFilteredMovies(movies, userQuery, onShortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, onShortMoviesCheckbox);
    // условие при отсутствии результатов
    if (moviesList.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    };
    
    setFilteredMovies(moviesList);
    setFilteredOrShortMovies(onShortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem(`all_movies`, JSON.stringify(moviesList));
  }

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    localStorage.setItem('all_movies_search', inputValue);
    localStorage.setItem('all_short_movies', shortMovies);

    setIsLoading(true);
    moviesApi
      .getMoviesCards()
      .then((movies) => handleSetFilteredMovies(movies, inputValue, shortMovies))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

// Поиск по короткометражкам
  // фильтрация короткометражек по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  // состояние чекбокса
  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredOrShortMovies(filterShortMovies(filteredMovies));
    } else {
      setFilteredOrShortMovies(filteredMovies);
    }
    localStorage.setItem('all_short_movies', !shortMovies);
  }

// Отображение фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem('all_movies')) {
      const movies = JSON.parse(
        localStorage.getItem('all_movies')
      );
      setFilteredMovies(movies);
      if (
        localStorage.getItem('all_short_movies') === 'true'
      ) {
        setFilteredOrShortMovies(filterShortMovies(movies));
      } else {
        setFilteredOrShortMovies(movies);
      }
    }
  }, [currentUser]);
  
  return (
  <main className='movies'>
    <SearchForm  
      handleSearchSubmit={handleSearchSubmit}
      handleShortMovies={handleShortMovies}
      shortMovies={shortMovies}
     />
     {pathname === '/movies' && (
      <MoviesCardList 
        movies={filteredOrShortMovies}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
      />
     )}
    {pathname === '/saved-movies' && (
      <MoviesCardList 
        movies={savedMovies}
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
      />
     )}
  </main>
  );
}

export default Movies;