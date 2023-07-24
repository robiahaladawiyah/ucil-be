import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from "react-router-dom";


const PasienTable = () => {
  const [pasiens, setPasiens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    nama: '',
    umur: '',
    jenisKelamin: '',
  });
  const [newData, setNewData] = useState({
    nama: '',
    umur: '',
    jenisKelamin: '',
  });

  const token = localStorage.getItem('token');

  const fetchPasiens = async () => {
    try {
      const response = await fetch('https://easy-tan-betta-garb.cyclic.app/api/pasiens', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching data: ' + response.statusText);
      }

      const jsonData = await response.json();
      setPasiens(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPasiens();
  }, []);

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (pasien) => {
    setEditMode(true);
    setEditData({
      id: pasien._id,
      nama: pasien.nama,
      umur: pasien.umur,
      jenisKelamin: pasien.jenisKelamin,
    });
    setShowModal(true);
  };

  const handleDelete = async (pasien) => {
    try {
      const response = await fetch(`https://easy-tan-betta-garb.cyclic.app/api/pasiens/${pasien._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting data: ' + response.statusText);
      }

      fetchPasiens();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await fetch(`https://easy-tan-betta-garb.cyclic.app/api/pasiens/${editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        });

        if (!response.ok) {
          throw new Error('Error updating data: ' + response.statusText);
        }
      } else {
        const response = await fetch('https://easy-tan-betta-garb.cyclic.app/api/pasiens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          throw new Error('Error posting data: ' + response.statusText);
        }
      }

      setShowModal(false);
      setEditMode(false);
      setEditData({ id: '', nama: '', umur: '', jenisKelamin: '' });
      setNewData({ nama: '', umur: '', jenisKelamin: '' });
      fetchPasiens();
    } catch (error) {
      console.error('Error posting/updating data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditData({ id: '', nama: '', umur: '', jenisKelamin: '' });
    setNewData({ nama: '', umur: '', jenisKelamin: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Add any additional logic or redirect to the login page
    // after removing the token from localStorage.
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial', padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Data Pasien</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Pasien
      </Button>
      <h2 style={{ color: 'white' }}>.</h2>
      {pasiens.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Umur</th>
              <th>Jenis Kelamin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pasiens.map((pasien) => (
              <tr key={pasien._id}>
                <td>{pasien.nama}</td>
                <td>{pasien.umur}</td>
                <td>{pasien.jenisKelamin}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(pasien)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(pasien)}>
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
          <Modal.Title>{editMode ? 'Edit Pasien' : 'Add Pasien'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={editMode ? editData.nama : newData.nama}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formUmur">
              <Form.Label>Umur</Form.Label>
              <Form.Control
                type="number"
                name="umur"
                value={editMode ? editData.umur : newData.umur}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formJenisKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="jenisKelamin"
                value={editMode ? editData.jenisKelamin : newData.jenisKelamin}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
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

export default PasienTable;
