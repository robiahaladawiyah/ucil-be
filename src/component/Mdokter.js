import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    nama: '',
    spesialisasi: '',
    alamat: '',
  });
  const [newData, setNewData] = useState({
    nama: '',
    spesialisasi: '',
    alamat: '',
  });
  const token = localStorage.getItem('token');
  // const [tokenize, setTokenize] = useState(false);
  // const [token, setToken] = useState('');

  const fetchData = async () => {
    
    try {
      const response = await axios.get('https://easy-tan-betta-garb.cyclic.app/dokters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(token)
      console.log(response)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetchData()
  }, []);
  

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditData({
      id: item._id,
      nama: item.nama,
      spesialisasi: item.spesialisasi,
      alamat: item.alamat,
    });
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`https://easy-tan-betta-garb.cyclic.app/dokters/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (editMode) {
        await axios.put(
          `https://easy-tan-betta-garb.cyclic.app/dokters/${editData.id}`,
          editData,
          config
        );
      } else {
        await axios.post('https://easy-tan-betta-garb.cyclic.app/dokters', newData, config);
      }

      setShowModal(false);
      setEditMode(false);
      setEditData({ id: '', nama: '', spesialisasi: '', alamat: '' });
      setNewData({ nama: '', spesialisasi: '', alamat: '' });
      fetchData();
    } catch (error) {
      console.error('Error posting/updating data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditData({ id: '', nama: '', spesialisasi: '', alamat: '' });
    setNewData({ nama: '', spesialisasi: '', alamat: '' });
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial', padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Data Dokter</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Data
      </Button>
      <h2 style={{ color: 'white' }}>.</h2>
      {data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.nama}</td>
                <td>{item.spesialisasi}</td>
                <td>{item.alamat}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Data' : 'Add Data'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNama">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={editMode ? editData.nama : newData.nama}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSpesialisasi">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="spesialisasi"
                value={editMode ? editData.spesialisasi : newData.spesialisasi}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAlamat">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={editMode ? editData.alamat : newData.alamat}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyComponent;
