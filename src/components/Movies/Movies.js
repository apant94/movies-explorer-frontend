import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  // стейт лоадера
  const [isLoading, setisLoading] = useState(false);

  return (
  <main className='movies'>
    <SearchForm />
    {isLoading && <Preloader/>}
    <MoviesCardList />
  </main>
  );
}

export default Movies;