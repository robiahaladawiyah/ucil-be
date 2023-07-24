import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button,Row,Col } from 'react-bootstrap';

const Tpasien = () => {
const [pasienData, setPasienData] = useState([]);
const [formData, setFormData] = useState({});
  useEffect(() => {
    fetchPasienData();
    },[]);

const fetchPasienData = async () => {
        try {
          const response = await fetch('http://localhost:3001/pasien');
          const data = await response.json();
          setPasienData(data);
        } catch (error) {
          console.error(error);
        }
      };    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddPasien = async () => {
        try {
            if (formData.id) {
                const response = await axios.put(`http://localhost:3001/pasien/${formData.id}`, formData);
                if (response.status === 200) {
                    fetchPasienData();
                    setFormData({});
            } } else {
                const response = await axios.post('http://localhost:3001/pasien', formData);
                if (response.status === 201) {
                    fetchPasienData();
                    setFormData({}); // Reset formData after successful addition
                }
            }
        }
            catch (error) {
                console.error(error);} 
        };
    
    

    const handleEditPasien = (pasien_id) => {
        const selectedPasien = pasienData.find((pasien) => pasien.pasien_id === pasien_id);
        setFormData({ ...selectedPasien, id: pasien_id });
    };

    const handleDeletePasien = async (pasien_id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/pasien/${pasien_id}`);
            if (response.status === 200) {
                fetchPasienData();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
    <div className="container"style={{ fontFamily: 'Arial', padding: '50px' }}>
    <h1 style={{ textAlign: 'center' }}>Pasien Database</h1>
      <h2>Add Pasien</h2>
      <Form>
        <Form.Group as={Col} md={4} controlId="nama">
          <Form.Label>Nama</Form.Label>
          <Row sm="4"><Form.Control
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleInputChange}
            style={{ width: '50%' }}
          /></Row>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="umur">
          <Form.Label>Umur</Form.Label>
          <Row sm="4"><Form.Control
            type="text"
            name="umur"
            placeholder="Umur"
            value={formData.umur}
            onChange={handleInputChange}
            style={{ width: '50%' }}
          /></Row>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="jenisKelamin">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Row sm="4"><Form.Control
            type="text"
            name="jenis_kelamin"
            placeholder="Jenis Kelamin"
            value={formData.jenis_kelamin}
            onChange={handleInputChange}
            style={{ width: '50%' }}
          /></Row>
        </Form.Group>
        <Row sm="4"><Button variant="primary" type="button" onClick={handleAddPasien}>
          Add
        </Button></Row>
        

        
      </Form>
      <h2 style={{ color: 'blue', textAlign: 'center' }}>Data Pasien</h2>
      <table style={{ width: '90%', border: '1px solid black', padding: '4px', borderRadius: '10px'}}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#4942e4', color:'#C4B0FF' }}>Pasien ID</th>
            <th style={{ backgroundColor: '#4942e4', color:'#C4B0FF' }}>Nama</th>
            <th style={{ backgroundColor: '#4942e4', color:'#C4B0FF' }}>Umur</th>
            <th style={{ backgroundColor: '#4942e4', color:'#C4B0FF' }}>Jenis Kelamin</th>
            <th style={{ backgroundColor: '#4942e4', color:'#C4B0FF' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pasienData.map((pasien) => (
            <tr key={pasien.pasien_id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.pasien_id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.nama}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.umur}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pasien.jenis_kelamin}</td>
              <td style={{ textAlign: 'center', border: '1px solid black', padding: '5px' }}>
                <Button variant="danger" type="button" onClick={() => handleDeletePasien(pasien.pasien_id)}>Delete</Button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )

          }
export default Tpasien;

