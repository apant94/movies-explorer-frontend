import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
    <Header>
      <NavTab />
    </Header>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
      <Route path='/saved-movies' element={<Movies />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
