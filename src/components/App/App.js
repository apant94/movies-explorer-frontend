import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import * as auth from "../../utils/Auth.js";
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false); // стейт статуса авторизации юзера
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    isOk: true,
    text: '',
  }); // стейт попапа с информацией об успехе или ошибке
  const [currentUser, setCurrentUser] = useState({}); // стейт пользователя
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохраненных фильмов


// Функциональность регистрации и авторизации
  function registration(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        setIsInfoTooltip({
          isOpen: true,
          isOk: true,
          text: 'Вы успешно зарегистрированы!',
        });
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip({
          isOpen: true,
          isOk: false,
          text: '',
        });
      });
  }

  function authorization(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        setIsInfoTooltip({
          isOpen: true,
          isOk: true,
          text: 'Добро пожаловать',
        });
        setTimeout(function() {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate('/movies');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip({
          isOpen: true,
          isOk: false,
          text: '',
        });
      });
  }

  // выход из акканута
  function logout() {
    setLoggedIn(false);
    navigate('/');
    localStorage.removeItem("jwt");
    setCurrentUser({});
  }

  // проверка токена и авторизация
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      mainApi
        .getUser()
        .then((data) => {
          setLoggedIn(true);
          navigate('/');
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // получение информации о пользователе при авторизации
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUser()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

// Функциональность информационного попапа
  function handleClosePopup() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

// Функциональность страницы профиля
  function handleProfile({ name, email }) {
    mainApi
    .setUser(name, email)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      setIsInfoTooltip({
        isOpen: true,
        isOk: true,
        text: 'Вы успешно отредактировали профиль!',
      });
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltip({
        isOpen: true,
        isOk: false,
        text: '',
      });
    })
  }

// Функциональность сохранения фильмов 
  // сохранение фильма 
  function saveMovie(movie) {
    mainApi
    .saveMovie(movie)
    .then((newMovie) => {
      setSavedMovies([newMovie.data, ...savedMovies]);
    })
    .catch((err) => console.log(err))
  }

  // удаление фильма из сохраненных 
  function deleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);

    mainApi
    .deleteMovie(savedMovie._id)
    .then(() => {
      const newMoviesList = savedMovies.filter(m => {
        if (movie.id === m.movieId || movie.movieId === m.movieId) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(newMoviesList);
    })
    .catch((err) => console.log(err))
  }

  // получение списка сохраненных фильмов 
  useEffect(() => {
    if (loggedIn) {
      mainApi
      .getSavedMovies()
      .then((res) => {
        const UserMoviesList = res.data.filter(m => m.owner === currentUser._id);
        setSavedMovies(UserMoviesList);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <NavTab loggedIn={loggedIn} />
      </Header>
      <Routes>
        <Route path='/signup' element={!loggedIn ? (<Register registration={registration} />) : (<Navigate to='/movies' replace />) } />
        <Route path='/signin' element={!loggedIn ? (<Login authorization={authorization} />) : (<Navigate to='/movies' replace />) } />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              savedMovies={savedMovies}
              onLikeClick={saveMovie}
              onDeleteClick={deleteMovie}
              setIsInfoTooltip={setIsInfoTooltip}
              loggedIn={loggedIn}
            />
          </ProtectedRoute>} 
        />
        <Route path='/saved-movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={savedMovies}
              onDeleteClick={deleteMovie}
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
            />
          </ProtectedRoute>} 
         />
        <Route path='/profile' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Profile 
            logout={logout} 
            handleProfile={handleProfile} 
            />
          </ProtectedRoute>} 
        />
        <Route path='/*' element={<NotFoundError />} />
      </Routes>
      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltip.isOpen}
        onClose={handleClosePopup}
        isOk={isInfoTooltip.isOk}
        text={isInfoTooltip.text}
      />

    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
