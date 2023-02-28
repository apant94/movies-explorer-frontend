import './NavTab.css';
import { useLocation, Link } from 'react-router-dom';
import LogoPath from '../../images/header-logo.svg';
import IconPath from '../../images/header-profile-icon.svg';

function NavTab() {
  const {pathname} = useLocation();
  return(
    <nav className='navtab'>
      <Link to='/'>
        <img className='navtab__logo' src={LogoPath} alt='Логотип' />
      </Link>
      <>
      {
        pathname === '/' 
        ? (
          <div className='navtab__auth-wrapper'>
            <Link to='/signup' className='navtab__auth-signup'>Регистрация</Link>
            <Link to='/signin' className='navtab__auth-signin'>Войти</Link>
          </div>
        ) 
        : (
          <>
          <div className='navtab__movies-wrapper'>
            <Link to='/movies' className='navtab__movies'>Фильмы</Link>
            <Link to='/saved-movies' className='navtab__movies'>Сохранённые фильмы</Link>
          </div>
          <div className='navtab__profile-wrapper'>
          <Link to='/profile' className='navtab__profile'>Аккаунт</Link>
          <Link to='/profile' className='navtab__profile'><img className='navtab__profile-icon' src={IconPath} alt='Иконка профиля' /></Link>
          </div>
          </>
        )
      }
      </>
    </nav>
  );
}

export default NavTab;