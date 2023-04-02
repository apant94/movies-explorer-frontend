import './SearchForm.css';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SearchForm({ handleSearchSubmit, handleShortMovies, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormAndValidation();
  const [errorQuery, setErrorQuery] = useState('');

  // хук для очищения поля ошибки при состоянии isValid
  useEffect(() => {
    setErrorQuery('');
  }, [isValid]);

  // сабмит формы поиска
  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Введите запрос');
  };

  //состояние инпута из локального хранилища
  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('all_movies_search')) {
      const searchValue = localStorage.getItem('all_movies_search');
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return(
    <section className='search'>
      <form className='search__form' 
        onSubmit={handleSubmit}
        noValidate
      >
        <input className='search__input' 
          placeholder='Фильм'
          name="search" 
          type="text"
          value={values.search || ''}
          onChange={handleChange}
          required 
        />
        <span className="search__error">{errorQuery}</span>
        <button className='search__submit' type='submit'>Найти</button>
      </form>
      <div className='search__wrapper'>
        <input 
          className='search__shortfilms' 
          type='checkbox' 
          onChange={handleShortMovies}
          checked={shortMovies ? true : false}
        />
        <p className='search__shortfilms-title'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;