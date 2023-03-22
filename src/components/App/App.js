import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import Footer from '../Footer/Footer';
import * as auth from "../../utils/Auth.js";
import mainApi from '../../utils/MainApi';


function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false); // стейт статуса авторизации юзера
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера
  const [isAuthOk, setIsAuthOk] = useState(true); // стейт успешности регистрации


  // Функциональность регистрации и авторизации
  function registration(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        // setIsTooltipOpen(true);
        setIsAuthOk(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        // setIsTooltipOpen(true);
        setIsAuthOk(false);
      });
  }

  function authorization(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logout() {
    setLoggedIn(false);
    navigate('/');
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUser(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // function registration() {
  //   navigate('/signin');
  // }

  // function authorization() {
  //   navigate('/movies');
  //   setLoggedIn(true);
  // }

  // function logout() {
  //   setLoggedIn(false);
  //   navigate('/');
  // }

  return (
    <div className="page">
    <Header>
      <NavTab loggedIn={loggedIn} />
    </Header>
    <Routes>
      <Route path='/signup' element={<Register registration={registration} />} />
      <Route path='/signin' element={!loggedIn ? (<Login authorization={authorization} />) : (<Navigate to='/' replace />) } />
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={
        <Movies 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />} 
      />
      <Route path='/saved-movies' element={<Movies />} />
      <Route path='/profile' element={<Profile logout={logout} />} />
      <Route path='/*' element={<NotFoundError />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
