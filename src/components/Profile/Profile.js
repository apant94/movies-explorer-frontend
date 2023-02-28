import './Profile.css';

function Profile() {
  return(
    <main className='profile'>
      <h2 className='profile__greetings'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <div className='profile__input-wrapper'>
          <label for='name' className='profile__input-label'>Имя</label>
          <input className='profile__input' name='name' type='text' value='Виталий' />
        </div>
        <div className='profile__input-wrapper'>
          <label for='email' className='profile__input-label'>E-mail</label>
          <input className='profile__input' name='email' type='text' value='pochta@yandex.ru' />
        </div>
      </form>
    </main>
  )
}

export default Profile;