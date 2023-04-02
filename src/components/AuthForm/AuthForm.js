import './AuthForm.css';
import { Link } from 'react-router-dom';
import LogoPath from '../../images/header-logo.svg';

function AuthForm({ greetings, children, submitText, onSubmit, isValid }) {
  return(
    <div className='authform'>
      <Link to='/'>
        <img src={LogoPath} alt='Логотип' className='authform__logo' />
      </Link>
      <h2 className='authform__greetings'>{greetings}</h2>
      <form className='authform__element' onSubmit={onSubmit} noValidate>
        <div className='aithform__inputs'>
          {children}
        </div>
        <button className={`authform__submit ${!isValid && 'authform__submit_disabled'}`} type='submit' disabled={!isValid} >{submitText}</button>
      </form>
    </div>
  )
}

export default AuthForm;