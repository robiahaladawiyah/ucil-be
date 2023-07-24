import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Offcanvas, Toast } from 'react-bootstrap';
import './component/navbar.css'; // Import the CSS file
import HomeContent from './component/home';
import DokterMContent from './component/Mdokter';
import PasienMContent from './component/Mpasien';
import PemeriksaanMContent from './component/Mpemeriksaan';
import ObatMContent from './component/Mobat';
import LoginForm from './component/Mhome';
import RegisterForm from './component/Mregister';
import gambar from './brm2.jpg';
import axios from 'axios';

const DokterM = () => {
  return (
    <div>
      <h1></h1>
      <DokterMContent />
    </div>
  );
};

const PasienM = () => {
  return (
    <div>
      <h1></h1>
      <PasienMContent />
    </div>
  );
};

const PemeriksaanM = () => {
  return (
    <div>
      <h1></h1>
      <PemeriksaanMContent />
    </div>
  );
};

const ObatM = () => {
  return (
    <div>
      <h1></h1>
      <ObatMContent />
    </div>
  );
};

const LoginPage = ({ onColorChange }) => {
  return (
    <div>
      <h1></h1>
      <LoginForm onColorChange={onColorChange} />
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div>
      <h1></h1>
      <RegisterForm />
    </div>
  );
};

const handleLogout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
};

const NavBar = ({ color }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/loggedinusers');
      setLoggedInUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <nav className="navbar" style={{ backgroundColor: color }}>
      <Navbar.Brand href="/login">
        <img
          src={gambar}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />{' '}
        Mang Eak
      </Navbar.Brand>
      <Button variant="secondary" onClick={handleShow}>
        Menu
      </Button>
      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li>
              <Link to="/login" onClick={handleClose}>
                Login Page
              </Link>
            </li>
            <li>
              <Link to="/pasienmongo" onClick={handleClose}>
                Pasien
              </Link>
            </li>
            <li>
              <Link to="/doktermongo" onClick={handleClose}>
                Dokter
              </Link>
            </li>
            <li>
              <Link to="/pemeriksaanmongo" onClick={handleClose}>
                Pemeriksaan
              </Link>
            </li>
            <li>
              <Link to="/obatmongo" onClick={handleClose}>
                Obat
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={handleClose}>
                Register
              </Link>
            </li>
            <li>
              <Button variant="warning" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <Toast
        className="bg-dark"
        style={{ position: 'fixed', top: '80px', right: '20px', maxWidth: '300px' }}
        show={showToast || loggedInUsers.length > 0}
        onClose={() => setShowToast(false)}
        delay={1000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Who are you?</strong>
        </Toast.Header>
        <Toast.Body className="text-light">
          <ul>
            {loggedInUsers.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </Toast.Body>
</Toast>

    </nav>
  );
};

const App = () => {
  const [navbarColor, setNavbarColor] = useState('#563d7c');

  const handleColorChange = (color) => {
    setNavbarColor(color);
  };

  return (
    <Router>
      <NavBar color={navbarColor} />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/doktermongo" element={<DokterM />} />
        <Route path="/pasienmongo" element={<PasienM />} />
        <Route path="/pemeriksaanmongo" element={<PemeriksaanM />} />
        <Route path="/obatmongo" element={<ObatM />} />
        <Route
          path="/login"
          element={<LoginPage onColorChange={handleColorChange} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
