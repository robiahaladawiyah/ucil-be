import React, { useState } from 'react';
import { Form, Button, Modal, Table, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const MyForm = () => {
  const [medicalRecordNo, setMedicalRecordNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/searchobat/${medicalRecordNo}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container"style={{ fontFamily: 'Arial', padding: '50px' }}>
      <>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label>Medical Record No:</Form.Label>
          <Form.Control
            type="password"
            value={medicalRecordNo}
            onChange={(e) => setMedicalRecordNo(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {data.length > 0 ? (
            <Table striped bordered hover style={{ border: '1px solid black', padding: '2px', borderRadius: '10px'}}>
              <thead style={{border: '1px solid black'}}>
                <tr style={{border: '1px solid black'}}>
                  <th>Nama Obat</th>
                </tr>
              </thead>
              <tbody style={{border: '1px solid black'}}>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama_obat}</td>
                </tr>
              ))}
              </tbody>
              </Table>
          ) : (
            <p>No results found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
};

export default MyForm;
