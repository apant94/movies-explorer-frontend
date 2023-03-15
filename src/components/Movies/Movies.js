import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies}) {
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера
  
  return (
  <main className='movies'>
    <SearchForm isLoading={isLoading} setIsLoading={setIsLoading} />
    <MoviesCardList movies={movies} isLoading={isLoading} setIsLoading={setIsLoading} />
  </main>
  );
}

export default Movies;