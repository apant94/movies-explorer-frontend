import './Login.css';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login({authorization}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    authorization(values.email, values.password);
    }

  return(
    <>
      <AuthForm greetings={'Рады видеть!'} onSubmit={handleSubmit} submitText={'Войти'} isValid={isValid}>
        <AuthInput name='email' title={'E-mail'} type={'email'} value={values.email || ''} required onChange={handleChange} errors={errors.email} />
        <AuthInput name='password' title={'Пароль'} type={'password'} value={values.password || ''} required onChange={handleChange} errors={errors.password} />
      </AuthForm>
      <p className='login__text'>Ещё не зарегистрированы? <Link to={'/signup'} className='login__link'>Регистрация</Link></p>
    </>
  )
}


export default Login;