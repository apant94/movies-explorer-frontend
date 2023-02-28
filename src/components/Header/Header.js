import './Header.css';
import { useLocation, Link } from 'react-router-dom';
import LogoPath from '../../images/header-logo.svg';

function Header() {
  const {pathname} = useLocation();

  const mainHeaderStyle = {
    backgroundColor: '#F3C1F8',
  }

  const headerStyle = {
    backgroundColor: '#FFFFFF',
  }
  
  return (
    <>
    {
      pathname === '/' ? (
    <header className='header' style={mainHeaderStyle}>
      <Link to='/'>
        <img className='header__logo' src={LogoPath} alt='Логотип' />
      </Link>
    </header>
    ) : 
    (<header className='header' style={headerStyle}>
      <Link to='/'>
        <img className='header__logo' src={LogoPath} alt='Логотип' />
      </Link>
    </header>)
    }
    </>
  );
}

export default Header;