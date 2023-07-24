import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';
import './login.css';
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onColorChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('#563d7c');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [loggedInUsers, setLoggedInUsers] = useState([]); // New state for logged-in users
  const [showToast, setShowToast] = useState(false); // New state for controlling toast display
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await axios.get('https://easy-tan-betta-garb.cyclic.app/api/loggedinusers');
      setLoggedInUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://easy-tan-betta-garb.cyclic.app/api/login', { username, password });
      const { token } = response.data;

      // Store the token in localStorage or session storage
      localStorage.setItem('token', token);

      // Call the onColorChange function with the selected color
      onColorChange(color);

      // Set the modal title and body for success
      setModalTitle('Login Successful');
      setModalBody('You have successfully logged in.');

      // Show the modal
      setShowModal(true);

      //Move to Pasien Page
      navigate('/pasienmongo');
    } catch (error) {
      // Set the modal title and body for error
      setModalTitle('Login Error');
      setModalBody('Invalid username or password.');

      // Show the modal
      setShowModal(true);

      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial', padding: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="colorPicker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Form.Label>What's your color today?</Form.Label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form.Group>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginForm;
