import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

function Login({authorization}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    
    const userValues = {};
    userValues.email = email;
    userValues.password = password;
    authorization(userValues);
    }

    function handleSetEmail(e) {
      setEmail(e.target.value);
    }

    function handleSetPassword(e) {
      setPassword(e.target.value);
    }

  return(
    <>
      <AuthForm greetings={'Рады видеть!'} onSubmit={handleSubmit} submitText={'Войти'}>
        <AuthInput title={'E-mail'} type={'email'} value={email} required onChange={handleSetEmail} />
        <AuthInput title={'Пароль'} type={'password'} value={password} required onChange={handleSetPassword} />
      </AuthForm>
      <p className='register__text'>Ещё не зарегистрированы? <Link to={'/signup'} className='register__link'>Регистрация</Link></p>
    </>
  )
}


export default Login;