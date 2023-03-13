import './NotFoundError.css';
import { Link, useNavigate } from 'react-router-dom';

function NotFoundError() {
  const navigate = useNavigate();

  function handleLinkClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <main className='notfounderror'>
      <h2 className='notfounderror__status'>404</h2>
      <p className='notfounderror__message'>Страница не найдена</p>
      <Link className='notfounderror__link' to='' onClick={handleLinkClick} >Назад</Link>
    </main>
  )
}

export default NotFoundError;