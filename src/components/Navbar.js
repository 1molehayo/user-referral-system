import React from 'react';
import { Nav, Navbar, NavItem, NavbarBrand, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from 'assets/img/logo.png';

export const Navigation = () => {
  return (
    <Navbar className="nav" sticky="top" expand="md">
      <Container>
        <NavbarBrand href="/">
          <img src={Logo} alt="logo" className="img-fluid" />
        </NavbarBrand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <NavLink className="nav-link" exact to="/refer-a-friend">
                Refer a friend
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/contact-us">
                Contact us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
