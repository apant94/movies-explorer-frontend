import './NavTab.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoPath from '../../images/header-logo.svg';
import IconPath from '../../images/header-profile-icon.svg';

function NavTab({loggedIn}) {

  const [isActive, setActive] = useState(false);

  const toggleHamburgerClass = () => {
    setActive(!isActive);
  };

  const closeHamburger = () => {
    setActive(false);
  }

  return(
    <nav className='navtab'>
      <Link to='/'>
        <img className='navtab__logo' src={LogoPath} alt='Логотип' />
      </Link>

      {(loggedIn ? 
        (
          <>
            <div className='navtab__movies-wrapper'>
              <Link to='/movies' className='navtab__movies'>Фильмы</Link>
              <Link to='/saved-movies' className='navtab__movies'>Сохранённые фильмы</Link>
            </div>
            <div className='navtab__profile-wrapper'>
              <Link to='/profile' className='navtab__profile'>Аккаунт</Link>
              <Link to='/profile' className='navtab__profile'><img className='navtab__profile-icon' src={IconPath} alt='Иконка профиля' /></Link>
            </div>

            <div className='navtab__hamburger'>
              <div className={`navtab__hamburger-btn ${isActive ? 'navtab__hamburger-btn_active' : ''}`} onClick={toggleHamburgerClass}>
                <span className="navtab__hamburger-bar"></span>
                <span className="navtab__hamburger-bar"></span>
                <span className="navtab__hamburger-bar"></span>
              </div>
              <div className={`navtab__hamburger-nav ${isActive ? 'navtab__hamburger-nav_active' : ''}`}></div>
              <ul className={`navtab__hamburger-list ${isActive ? 'navtab__hamburger-list_active' : ''}`}>
                  <Link to ="/" className="navtab__hamburger-item" onClick={closeHamburger}>Главная</Link>
                  <Link to ="/movies" className="navtab__hamburger-item" onClick={closeHamburger}>Фильмы</Link>
                  <Link to ="/saved-movies" className="navtab__hamburger-item" onClick={closeHamburger}>Сохранённые фильмы</Link>
                  <div className='navtab__hamburger-wrapper'>
                    <Link to='/profile' className='navtab__hamburger-item' onClick={closeHamburger}>Аккаунт</Link>
                    <Link to='/profile' className='navtab__hamburger-item' onClick={closeHamburger}><img className='navtab__profile-icon' src={IconPath} alt='Иконка профиля' /></Link>
                  </div>
              </ul>
            </div>
            </>
        ) : (
          <div className='navtab__auth-wrapper'>
              <Link to='/signup' className='navtab__auth-signup'>Регистрация</Link>
              <Link to='/signin' className='navtab__auth-signin'>Войти</Link>
            </div>
        )
      )}
    </nav>
  );
}

export default NavTab;