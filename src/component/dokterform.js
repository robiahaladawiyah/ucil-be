import React from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import './dokterformcss.css';

const MyForm = ({ formData, handleInputChange, handleAddDokter, showModal, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDokter();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Add Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md={6} controlId="nama">
              <Form.Label>Nama</Form.Label>
              <Row sm="8"><Form.Control
                type="text"
                name="nama"
                placeholder="Nama"
                value={formData.nama || ''}
                onChange={handleInputChange}
                style={{ width: '75%' }}
              /></Row>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="spesialisasi">
              <Form.Label>Spesialisasi</Form.Label>
              <Row sm="8"><Form.Control
                type="text"
                name="spesialisasi"
                placeholder="Spesialisasi"
                value={formData.spesialisasi || ''}
                onChange={handleInputChange}
                style={{ width: '75%' }}
              /></Row>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="alamat">
              <Form.Label>Alamat</Form.Label>
              <Row sm="8"><Form.Control
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={formData.alamat || ''}
                onChange={handleInputChange}
                style={{ width: '75%' }}
              /></Row>
            </Form.Group>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button type="submit" className="custom-button">
                Add
              </Button>
              <Button variant="" onClick={closeModal} className="custom-button">
                Close
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MyForm;