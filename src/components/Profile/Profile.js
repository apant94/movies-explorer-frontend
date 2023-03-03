import './Profile.css';
import { useState } from 'react';

function Profile({logout}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetName(e) {
    setName(e.target.value);
  }

  return(
    <main className='profile'>
      <h2 className='profile__greetings'>Привет, Виталий!</h2>
      <form className='profile__form' onClick={handleSubmit}>
        <div className='profile__input-wrapper'>
          <label for='name' className='profile__input-label'>Имя</label>
          <input className='profile__input' placeholder="Имя"name='name' type='text' value={name || ''} onChange={handleSetName} minLength={'2'} maxLength={'20'} />
        </div>
        <div className='profile__input-wrapper'>
          <label for='email' className='profile__input-label'>E-mail</label>
          <input className='profile__input' placeholder="Почта" name='email' type='email' value={email || ''} onChange={handleSetEmail} />
        </div>
        <button type='submit' className='profile__edit-btn'>Редактировать</button>
      </form>
      <button type='button' className='profile__exit-btn' onClick={logout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;