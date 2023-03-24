import './Movies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function Movies({ isLoading, setIsLoading, loggedIn, currentUser }) {
  const { pathname } = useLocation();
  const [filteredMovies, setFilteredMovies] = useState([]); // стэйт результатов поиска по фильмам
  const [shortMovies, setShortMovies] = useState(false); // стейт чекбокса короткометражек
  const [filteredOrShortMovies, setFilteredOrShortMovies] = useState([]); // отфильтрованные фильмы по короткометражке и поиску 
  const [noResult, setNoResult] = useState(false); // стейт отсутствия результатов по поиску
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохраненных фильмов (favoriteCards)

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
    localStorage.setItem('all_short_search', shortMovies);

    setIsLoading(true);
    moviesApi
      .getMoviesCards()
      .then((movies) => handleSetFilteredMovies(movies, inputValue, shortMovies))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // поиск по короткометражкам
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

// Функциональность сохранения фильмов 
  // сохранение фильма (addFavoriteMovie)
  function saveMovie(movie) {
    mainApi
    .saveMovie(movie)
    .then((newMovie) => setSavedMovies([newMovie, ...savedMovies]))
    .catch((err) => console.log(err))
  }

  // удаление фильма из сохраненных (deleteFavoriteMovie )
  function deleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);

    mainApi
    .deleteMovie(savedMovie.data._id)
    .then(() => {
      const newMoviesList = savedMovies.filter(m => {
        if (movie.id === m.movieId || movie.movieId === m.movieId) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(newMoviesList);
    })
    .catch((err) => console.log(err))
  }

  // получение списка сохраненных фильмов (fetchFavoriteMovies )
  const fetchSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        const UserMoviesList = data.filter(movie => movie.owner === currentUser._id);
        setSavedMovies(UserMoviesList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) {
      fetchSavedMovies();
    }
  }, [loggedIn]);
  
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
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        noResult={noResult}
        onLikeClick={saveMovie}
        onDeleteClick={deleteMovie}
      />
     )}
    {pathname === '/saved-movies' && (
      <MoviesCardList 
        movies={savedMovies}
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        noResult={noResult}
        onLikeClick={saveMovie}
        onDeleteClick={deleteMovie}
      />
     )}
  </main>
  );
}

export default Movies;