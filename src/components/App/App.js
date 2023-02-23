import './App.css';
import { Route, Routes } from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
