import React from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, Button } from "react-bootstrap";

function NavigationBar() {
  return (
    <div>
      <Navbar className="nav-bar">
        <Container>
          <Navbar.Brand href="#home">
            <p className="nav-logo">
              <span className="nav-logo-top">HOTEL</span>
              <br />
              <span className="nav-logo-bottom">COLOMBO</span>
            </p>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">Dining</Nav.Link>
            <Nav.Link href="/rooms">Rooms</Nav.Link>
            <Nav.Link href="#pricing">Login</Nav.Link>
            <div className="d-flex align-items-center">
              <Button variant="primary">Signup</Button>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
