import './Profile.css';
import { useEffect, useContext } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ logout, handleProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  // подтягиваем из контекста данные юзера для формы
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const notValidForm = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return(
    <main className='profile'>
      <h2 className='profile__greetings'>{`Привет, ${currentUser.name}!`}</h2>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__input-wrapper'>
          <label htmlFor='name' className='profile__input-label'>Имя</label>
          <input className='profile__input' placeholder="Имя" name='name' type='text' value={values.name || ''} onChange={handleChange} minLength={'2'} maxLength={'20'} />
        </div>
        <span className='profile__error'>{errors.name}</span>
        <div className='profile__input-wrapper'>
          <label htmlFor='email' className='profile__input-label'>E-mail</label>
          <input className='profile__input' placeholder="Почта" name='email' type='email' value={values.email || ''} onChange={handleChange} />
        </div>
        <span className='profile__error'>{errors.email}</span>
        <button type='submit' className={`profile__edit-btn ${notValidForm && 'profile__edit-btn_disabled'}`} disabled={notValidForm} >Редактировать</button>
      </form>
      <button type='button' className='profile__exit-btn' onClick={logout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;