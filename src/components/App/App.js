import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function App() {
  const navigate = useNavigate();

  const[loggedIn, setLoggedIn] = useState(false);

  function registration() {
    navigate('/signin');
  }

  function authorization() {
    navigate('/movies');
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="page">
    <Header>
      <NavTab />
    </Header>
    <Routes>
      <Route path='/signup' element={<Register registration={registration} />} />
      <Route path='/signin' element={<Login authorization={authorization} />} />
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/saved-movies' element={<Movies />} />
      <Route path='/profile' element={<Profile logout={logout} />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
