import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
  const [obats, setObats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    namaObat: '',
  });
  const [newData, setNewData] = useState({
    namaObat: '',
  });

  // Fetch obats from API
  const fetchObats = async () => {
    try {
      const response = await fetch('https://easy-tan-betta-garb.cyclic.app/api/obats');
      const jsonData = await response.json();
      setObats(jsonData);
    } catch (error) {
      console.error('Error fetching obats:', error);
    }
  };

  useEffect(() => {
    fetchObats();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  // Handle edit form input change
  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle edit button click
  const handleEdit = (obat) => {
    setEditMode(true);
    setEditData({ id: obat._id, namaObat: obat.namaObat });
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (obat) => {
    try {
      const response = await fetch(`https://easy-tan-betta-garb.cyclic.app/api/obats/${obat._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting obat: ' + response.statusText);
      }

      fetchObats();
    } catch (error) {
      console.error('Error deleting obat:', error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        const response = await fetch(`https://easy-tan-betta-garb.cyclic.app/api/obats/${editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData),
        });

        if (!response.ok) {
          throw new Error('Error updating obat: ' + response.statusText);
        }
      } else {
        const response = await fetch('https://easy-tan-betta-garb.cyclic.app/api/obats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          throw new Error('Error creating obat: ' + response.statusText);
        }
      }

      setShowModal(false);
      setEditMode(false);
      setEditData({ id: '', namaObat: '' });
      setNewData({ namaObat: '' });
      fetchObats();
    } catch (error) {
      console.error('Error posting/updating obat:', error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditData({ id: '', namaObat: '' });
    setNewData({ namaObat: '' });
  };

  const containerStyle = {
    fontFamily: 'Arial',
    padding: '50px',
    backgroundColor: '#808080',
    color: '#808080',
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Obat List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Obat
      </Button>
      <h2>.</h2>
      {obats.length > 0 ? (
        <Table striped bordered hover variant="dark"> {/* Add variant="dark" */}
          <thead>
            <tr>
              <th>Obat ID</th>
              <th>Nama Obat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {obats.map((obat) => (
              <tr key={obat._id}>
                <td>{obat._id}</td>
                <td>{obat.namaObat}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(obat)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(obat)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading obats...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Obat' : 'Add Obat'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNamaObat">
              <Form.Label>Nama Obat</Form.Label>
              <Form.Control
                type="text"
                name="namaObat"
                value={editMode ? editData.namaObat : newData.namaObat}
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
