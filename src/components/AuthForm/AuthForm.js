import './AuthForm.css';
import { Link } from 'react-router-dom';
import LogoPath from '../../images/header-logo.svg';

function AuthForm({greetings, children, submitText, onSubmit}) {
  return(
    <div className='authform'>
      <Link to='/'>
        <img src={LogoPath} alt='Логотип' className='authform__logo' />
      </Link>
      <h2 className='authform__greetings'>{greetings}</h2>
      <form className='authform__element' noValidate>
        {children}
        <button className='authform__submit' type='submit' onSubmit={onSubmit}>{submitText}</button>
      </form>
    </div>
  )
}

export default AuthForm;