import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css';

const NavBar = () => {
  return (
    <Nav className="navbar" variant="pills">
      <LinkContainer to="/">
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/pasien">
        <Nav.Link>Pasien</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/dokter">
        <Nav.Link>Dokter</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/pemeriksaan">
        <Nav.Link>Pemeriksaan</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/obat">
        <Nav.Link>Obat</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/doktermongo">
        <Nav.Link>Dokter-M</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/pasienmongo">
        <Nav.Link>Pasien-M</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/pemeriksaanmongo">
        <Nav.Link>Pemeriksaan-M</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/obatmongo">
        <Nav.Link>Obat-M</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}

export default NavBar;
