import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies}) {
  // стейт лоадера
  const [isLoading, setisLoading] = useState(false);
  console.log(movies);

  return (
  <main className='movies'>
    <SearchForm />
    {isLoading && <Preloader/>}
    <MoviesCardList movies={movies} />
  </main>
  );
}

export default Movies;