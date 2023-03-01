import './AuthForm.css';
import { Link } from 'react-router-dom';
import LogoPath from '../../images/header-logo.svg';

function AuthForm({greetings, children}) {
  return(
    <div className='authform'>
      <Link to='/'>
        <img src={LogoPath} alt='Логотип' className='authform__logo' />
      </Link>
      <h2 className='authform__greetings'>{greetings}</h2>
      <form className='authform__element'>
        {children}
      </form>
    </div>
  )
}

export default AuthForm;