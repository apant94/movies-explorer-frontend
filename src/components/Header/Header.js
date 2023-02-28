import './Header.css';
import { useLocation } from 'react-router-dom';

function Header({children}) {
  const {pathname} = useLocation();

  const mainHeaderStyle = {
    backgroundColor: '#F3C1F8',
  }

  const headerStyle = {
    backgroundColor: '#FFFFFF',
  }
  
  return (
    <>
      {(pathname === '/signin' || pathname === '/signup' || pathname === '/404') && null}
      {
        pathname === '/' && (
          <header className='header' style={mainHeaderStyle}>
            {children}
          </header>)
      }
      {
        (pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && (
        <header className='header' style={headerStyle}>
            {children}
        </header>)
      }

      {/* {
        pathname === '/' ? (
        <header className='header' style={mainHeaderStyle}>
          {children}
        </header>
        ) : 
        (<header className='header' style={headerStyle}>
          {children}
        </header>)
      }  */}
    </>
  );
}

export default Header;