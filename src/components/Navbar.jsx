import React from 'react';
import { useSelector } from 'react-redux';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';

export default function NavbarComponent() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Navbar color="light border-bottom" expand="md" light>
      <NavbarBrand href="/">IMDB</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {user && (
        <NavItem>
          <NavLink>
            {user.first_name}
            {' '}
            {user.last_name}
          </NavLink>
        </NavItem>
        ) }
        {user && (
        <NavItem>
          <NavLink>Logout</NavLink>
        </NavItem>
        ) }
        {!user && (
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        )}
      </Nav>
    </Navbar>
  );
}
