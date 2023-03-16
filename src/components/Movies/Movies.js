import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies({movies, isLoading, setIsLoading}) {
  const [filteredMovies, setFilteredMovies] = useState([]); // стэйт результатов поиска по фильмам (initialMovies)

  // фильтрация фильмов по запросу
function filterMovies(movies, userQuery) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase();
    const movieEn = String(movie.nameEN).toLowerCase();
    const userMovie = userQuery.toLowerCase();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });
  return moviesByUserQuery;
}

  // поиск по массиву и установка состояния
  function handleSetFilteredMovies(movies, userQuery) {
    const moviesList = filterMovies(movies, userQuery);
    if (moviesList.length === 0) {
      console.log('ничего не найдено')
    };
    
    setFilteredMovies(moviesList);
    localStorage.setItem(`all_movies`, JSON.stringify(moviesList));
  }

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    localStorage.setItem('all_movies_search', inputValue);

    setIsLoading(true);
    moviesApi
      .getMoviesCards()
      .then((movies) => handleSetFilteredMovies(movies, inputValue))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  
  return (
  <main className='movies'>
    <SearchForm  handleSearchSubmit={handleSearchSubmit} />
    <MoviesCardList 
      // movies={movies} 
      movies={filteredMovies}
      isLoading={isLoading} 
      setIsLoading={setIsLoading} 
    />
  </main>
  );
}

export default Movies;