import React, { useState, useEffect } from 'react';
import { Form, Button,Col,Row } from 'react-bootstrap';
// import { v4 as uuidv4 } from 'uuid';

const Tpemeriksaan = () => {
  const [pemeriksaanList, setPemeriksaanList] = useState([]);

  useEffect(() => {
    fetchPemeriksaanData();
  }, []);

  const fetchPemeriksaanData = async () => {
    try {
      const response = await fetch('http://localhost:3001/pemeriksaan');
      const data = await response.json();
      setPemeriksaanList(data);
    } catch (error) {
      console.log('Error fetching pemeriksaan data:', error);
    }
  };

  const handleAddPemeriksaan = (pemeriksaan) => {
    setPemeriksaanList([...pemeriksaanList, pemeriksaan]);
  };

  return (
    <div className="container"style={{ fontFamily: 'Arial', padding: '50px' }}>
      
      <h1>Pemeriksaan List</h1>
      <PemeriksaanForm handleAddPemeriksaan={handleAddPemeriksaan} />
      <PemeriksaanTable pemeriksaanList={pemeriksaanList} />
    </div>
  );
};

const PemeriksaanTable = ({ pemeriksaanList }) => {
  return (
    <div>
      <h2>Pemeriksaan History</h2>
      <table style={{ width: '100%', border: '1px solid black', padding: '2px', borderRadius: '10px'}}>
        <thead>
          <tr>
          <th style={{ backgroundColor: 'lightgray' }}>Medical Record No</th>
          <th style={{ backgroundColor: 'lightgray' }}>Dokter ID</th>
          <th style={{ backgroundColor: 'lightgray' }}>Date</th>
          <th style={{ backgroundColor: 'lightgray' }}>Time</th>
          <th style={{ backgroundColor: 'lightgray' }}>Obat ID</th>
          <th style={{ backgroundColor: 'lightgray' }}>Pasien ID</th>
          </tr>
        </thead>
        <tbody>
          {pemeriksaanList.map((pemeriksaan, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.medicalrecordNO}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.dokter_id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.date}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.time}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.obat_id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{pemeriksaan.pasien_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PemeriksaanForm = ({ handleAddPemeriksaan }) => {
  const [formData, setFormData] = useState({
    dokter_id: '',
    date: '',
    time: '',
    obat_id: '',
    pasien_id: ''
  });


  const generateRandomNumber = (digits) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const randomNumber = Math.floor(
      Math.random() * (max - min + 1) + min
    );
    return randomNumber.toString().padStart(digits, '0');
  };
  
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicalrecordNO = generateRandomNumber(10);
  
    const newPemeriksaan = { ...formData, medicalrecordNO };
  
    try {
      const response = await fetch('http://localhost:3001/pemeriksaan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPemeriksaan),
      });
  
      if (response.ok) {
        handleAddPemeriksaan(newPemeriksaan);
        setFormData({
          dokter_id: '',
          date: '',
          time: '',
          obat_id: '',
          pasien_id: '',
        });
        console.log('Pemeriksaan added successfully!');
      } else {
        console.log('Failed to add pemeriksaan');
      }
    } catch (error) {
      console.log('Error adding pemeriksaan:', error);
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add Pemeriksaan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="dokter_id">
          <Form.Label>Dokter ID</Form.Label>
          <Row sm="8">
          <Form.Control
            mt="4" 
            type="text"
            name="dokter_id"
            value={formData.dokter_id}
            onChange={handleInputChange}
            required
          />
          </Row>
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Row sm="8">
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          </Row>
        </Form.Group>

        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Row sm="10"><Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          /></Row>
          
        </Form.Group>

        <Form.Group controlId="obat_id">
          <Form.Label>Obat ID</Form.Label>
          <Row sm="8"><Form.Control
            type="text"
            name="obat_id"
            value={formData.obat_id}
            onChange={handleInputChange}
            required
          /></Row>
          
        </Form.Group>

        <Form.Group controlId="obat_id">
          <Form.Label>Pasien ID</Form.Label>
          <Row sm="8"><Form.Control
            type="text"
            name="pasien_id"
            value={formData.pasien_id}
            onChange={handleInputChange}
            required
          /></Row>
          
        </Form.Group>
        <Row sm="4">
        <Button variant="primary" type="submit">
          Add
        </Button>
        </Row>
        
      </Form>
    </div>
  );
};

export default Tpemeriksaan;
