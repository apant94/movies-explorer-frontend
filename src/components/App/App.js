import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function App() {
  const navigate = useNavigate();

  function registration() {
    navigate('/signin');
  }

  return (
    <div className="page">
    <Header>
      <NavTab />
    </Header>
    <Routes>
      <Route path='/signup' element={<Register registration={registration} />} />
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/saved-movies' element={<Movies />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
