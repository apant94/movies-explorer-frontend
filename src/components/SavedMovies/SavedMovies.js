import './SavedMovies.css';
import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedMovies({ savedMovies, onDeleteClick, isLoading, setIsLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false); // стейт чекбокса короткометражек
  const [noResult, setNoResult] = useState(false); // стейт отсутствия результатов по поиску
  const [showedMovies, setShowedMovies] = useState(savedMovies); // показываемывые сохраненные фильмы
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные по запросу сохраненные фильмы

// Поиск по сохраненным фильмам 
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

  // поиск в сохраненных по запросу
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMovies, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

// Поиск по короткометражкам
  // фильтрация короткометражек по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  // поиск по короткометражкам
  function handleShortMovies() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('all_short_saved_movies', true);
      setShowedMovies(filterShortMovies(filteredMovies));

      if (filterShortMovies(filteredMovies).length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      };
    } else {
      setShortMovies(false);
      localStorage.setItem('all_short_saved_movies', false);
      setShowedMovies(filteredMovies);

      if (filteredMovies.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      };
    }
  }

  // короткометражки в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`all_short_saved_movies`) === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMovies);
    }
  }, [savedMovies, currentUser]);

  // Отображение сохраненных фильмов
  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNoResult(false) : setNoResult(true);
  }, [savedMovies]);

  return (
    <main className='savedmovies'>
      <SearchForm  
        handleSearchSubmit={handleSearchSubmit}
        handleShortMovies={handleShortMovies}
        shortMovies={shortMovies}
      />
      <MoviesCardList 
        movies={showedMovies}
        savedMovies={savedMovies}
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        onDeleteClick={onDeleteClick}
        noResult={noResult}
      />
    </main>
    );
  };

export default SavedMovies;