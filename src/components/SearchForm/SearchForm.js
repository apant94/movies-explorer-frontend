import './SearchForm.css';

function SearchForm() {
  return(
    <section className='search'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм'/>
        <button className='search__submit' type='submit'>Найти</button>
      </form>
      <div className='search__wrapper'>
        <input className='search__shortfilms' type='checkbox' />
        <p className='search__shortfilms-title'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;