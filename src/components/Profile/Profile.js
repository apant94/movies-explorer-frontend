import './Profile.css';
import { useState, useContext } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ logout, handleProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  return(
    <main className='profile'>
      <h2 className='profile__greetings'>{`Привет, ${currentUser.name}!`}</h2>
      <form className='profile__form' onClick={handleSubmit}>
        <div className='profile__input-wrapper'>
          <label htmlFor='name' className='profile__input-label'>Имя</label>
          <input className='profile__input' placeholder="Имя" name='name' type='text' value={currentUser.name || ''} onChange={handleChange} minLength={'2'} maxLength={'20'} />
        </div>
        <div className='profile__input-wrapper'>
          <label htmlFor='email' className='profile__input-label'>E-mail</label>
          <input className='profile__input' placeholder="Почта" name='email' type='email' value={currentUser.email || ''} onChange={handleChange} />
        </div>
        <button type='submit' className='profile__edit-btn'>Редактировать</button>
      </form>
      <button type='button' className='profile__exit-btn' onClick={logout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;