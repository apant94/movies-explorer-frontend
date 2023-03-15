import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
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
import moviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false); // стейт статуса авторизации юзера
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера
  const [movies, setMovies] = useState([]); // все фильмы
  const [search, setSearch] = useState(''); // стэйт поисковой строки
  const [filteredMovies, setFilteredMovies] = useState([]); // стэйт результатов поиска по фильмам

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

  useEffect(() => {
    if (loggedIn) {
      getAllMovies();
    }
  }, [loggedIn]);

  const getAllMovies = () => {
    moviesApi.getMoviesCards()
    .then((res) => {
      updateMovies(res);
    })
  }

  const updateMovies = (movies) => {
    setMovies(movies);
    localStorage.setItem('all_movies', JSON.stringify(movies));
  }

  // поиск по фильмам

  const loadFilteredMovies = (movies) => {
    // const formatted = movies.map((movie) => ({
    //     ...movie,
    //     _id: (favoriteCards.find(likedCard => likedCard.movieId === card.id) || {})._id,
    //     isLiked: isLikedCard(card)
    //   })
    // )
    
    setFilteredMovies(movies);
    localStorage.setItem('all_filtered_movies', JSON.stringify(movies));
  }

  function handleSearchSubmit() {
    setTimeout(() => {
      if (search.length) {
        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().indexOf(search) >= 0);
        
        // if (filteredMovies.length === 0) {
        //   setTimeout(setShowToolTip, 1000, true);
        //   ChooseInfoTooltip({
        //     image: error,
        //     text: "Ничего не найдено",
        //   });
        // } else {
          loadFilteredMovies(filteredMovies)
        // }
    } else {
      loadFilteredMovies(movies)
      setIsLoading(false)
    }
    }, 600);
  }

  const updateSearch = (search) => {
    search = search.toLowerCase();
    setSearch(search);
    localStorage.setItem('all_query', search);
  }

  return (
    <div className="page">
    <Header>
      <NavTab loggedIn={loggedIn} />
    </Header>
    <Routes>
      <Route path='/signup' element={<Register registration={registration} />} />
      <Route path='/signin' element={<Login authorization={authorization} />} />
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={
        <Movies 
          movies={movies} 
          onSearchSubmit={handleSearchSubmit} 
          onUpdateSearch={updateSearch}
          isLoading={isLoading} 
          setIsLoading={setIsLoading} />} 
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
