import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';


function Register({ registration }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    registration(values.name, values.email, values.password);
    }

  return(
    <>
      <AuthForm greetings={'Добро пожаловать!'} onSubmit={handleSubmit} submitText={'Зарегистрироваться'} isValid={isValid}>
        <AuthInput name='name' title={'Имя'} type={'text'} value={values.name || ''} minLength = {'2'} maxLength = {'20'} required onChange={handleChange} errors={errors.name} />
        <AuthInput name='email' title={'E-mail'} type={'email'} value={values.email || ''} required onChange={handleChange} errors={errors.email} />
        <AuthInput name='password' title={'Пароль'} type={'password'} value={values.password || ''} required onChange={handleChange} errors={errors.password} />
      </AuthForm>
      <p className='register__text'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
    </>
  )
}

export default Register;