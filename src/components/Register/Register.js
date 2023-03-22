import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({ registration }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    
    const initialValues = {};
    initialValues.name = name;
    initialValues.email = email;
    initialValues.password = password;
    registration(initialValues);
    }

    function handleSetName(e) {
      setName(e.target.value);
    }

    function handleSetEmail(e) {
      setEmail(e.target.value);
    }

    function handleSetPassword(e) {
      setPassword(e.target.value);
    }

  return(
    <>
      <AuthForm greetings={'Добро пожаловать!'} onSubmit={handleSubmit} submitText={'Зарегистрироваться'}>
        <AuthInput title={'Имя'} type={'text'} value={name} minLength = {'2'} maxLength = {'20'} required onChange={handleSetName} />
        <AuthInput title={'E-mail'} type={'email'} value={email} required onChange={handleSetEmail} />
        <AuthInput title={'Пароль'} type={'password'} value={password} required onChange={handleSetPassword} />
      </AuthForm>
      <p className='register__text'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
    </>
  )
}

export default Register;