import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserInterface } from './shared/interfaces/userInterfaces';
import AuthContext from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './shared/components/Header';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import ResponsiveNav from './components/ResponsiveNav/ResponsiveNav';
import useMediaWidth from './shared/utils/useMediaWidth';
import Modal from './components/OnLoadModal/OnLoadModal';
import CabinPage from './pages/Cabin';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Reservation from './pages/Reservation';
import About from './pages/About';
import Account from './pages/Account';

function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [toggleResponsiveNav, setToggleResponsiveNav] = useState<boolean>(false)
  const isLargeScreen = useMediaWidth(900);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    if (!localStorage.getItem('myData')) {
      fetch('/db/db.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
          console.log("Fetched data: ", json);
          localStorage.setItem('myData', JSON.stringify(json));
          console.log("Data stored in localStorage: ", localStorage.getItem('myData'));
        })
        .catch(err => console.error("Erreur lors du chargement des données: ", err));
    }
  }, []);

  useEffect(() => {
    const userInStorage = localStorage.getItem('currentUser');
    if (userInStorage && !user) {
      setUser(JSON.parse(userInStorage))
    }
  }, [user])

  const handleCloseModal = () => {
    setShowModal(false);
  };

  window.onload = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  }


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Modal show={showModal} handleClose={handleCloseModal} />
        <Header toggleResponsiveNav={toggleResponsiveNav} setToggleResponsiveNav={setToggleResponsiveNav} />
        {toggleResponsiveNav && !isLargeScreen && <ResponsiveNav visible={toggleResponsiveNav} onClose={setToggleResponsiveNav} />}
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/register" element={<Registration />} />}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/cabin/:id" element={<CabinPage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/compte" element={<Account />} />
          <Route path="/reservation" element={<Reservation />} />
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </AuthContext.Provider>
  );
}

export default App;
