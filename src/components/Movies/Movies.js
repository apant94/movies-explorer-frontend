import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies({isLoading, setIsLoading}) {
  const [filteredMovies, setFilteredMovies] = useState([]); // стэйт результатов поиска по фильмам (initialMovies)
  const [shortMovies, setShortMovies] = useState(false); // стейт чекбокса короткометражек
  const [filteredOrShortMovies, setFilteredOrShortMovies] = useState([]); // отфильтрованные по краткометражке и поиску фильмы (filteredMovies)

  // фильтрация фильмов по запросу
function filterMovies(movies, userQuery, onShortMoviesCheckbox) {
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase();
    const movieEn = String(movie.nameEN).toLowerCase();
    const chosenMovie = userQuery.toLowerCase();
    return movieRu.indexOf(chosenMovie) !== -1 || movieEn.indexOf(chosenMovie) !== -1;
  });
  if (onShortMoviesCheckbox) {
    return filterShortMovies(moviesByQuery);
  } else {
    return moviesByQuery;
  }
}

  // поиск по массиву и установка состояния
  function handleSetFilteredMovies(movies, userQuery, onShortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, onShortMoviesCheckbox);
    if (moviesList.length === 0) {
      console.log('ничего не найдено')
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
  
  return (
  <main className='movies'>
    <SearchForm  
      handleSearchSubmit={handleSearchSubmit}
      handleShortMovies={handleShortMovies}
      shortMovies={shortMovies}
     />
    <MoviesCardList 
      movies={filteredOrShortMovies}
      isLoading={isLoading} 
      setIsLoading={setIsLoading} 
    />
  </main>
  );
}

export default Movies;