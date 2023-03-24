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
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false); // стейт статуса авторизации юзера
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера
  const [isAuthOk, setIsAuthOk] = useState(true); // стейт успешности регистрации
  const [currentUser, setCurrentUser] = useState({}); // стейт пользователя
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохраненных фильмов (savedMoviesList)


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
        setIsAuthOk(true);

      })
      .catch((err) => {
        console.log(err);
        setIsAuthOk(false);
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

// Функциональность страницы профиля
  function handleProfile({ name, email }) {
    mainApi
    .setUser(name, email)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      setIsAuthOk(true);
    })
    .catch((err) => {
      console.log(err);
      setIsAuthOk(false);
    })
  }

// Функциональность сохранения фильмов 
  // сохранение фильма (handleSaveMovie)
  function saveMovie(movie) {
    mainApi
    .saveMovie(movie)
    .then((newMovie) => {
      setSavedMovies([newMovie, ...savedMovies]);
    })
    .catch((err) => console.log(err))
  }

  // удаление фильма из сохраненных (handleDeleteMovie)
  function deleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);

    mainApi
    .deleteMovie(savedMovie.data._id)
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

  // получение списка сохраненных фильмов (useEffect)
  const fetchSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        const UserMoviesList = data.filter(m => m.owner === currentUser._id);
        setSavedMovies(UserMoviesList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn && currentUser) {
      fetchSavedMovies();
    }
  }, [loggedIn, currentUser]);

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
          <Movies 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
            savedMovies={savedMovies}
            onLikeClick={saveMovie}
            onDeleteClick={deleteMovie}
          />} 
        />
        <Route path='/saved-movies' element={
          <Movies
            savedMovies={savedMovies}
            onLikeClick={saveMovie}
            onDeleteClick={deleteMovie}
          />} 
         />
        <Route path='/profile' element={<Profile logout={logout} handleProfile={handleProfile} />} />
        <Route path='/*' element={<NotFoundError />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
