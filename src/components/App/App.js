import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
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
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
