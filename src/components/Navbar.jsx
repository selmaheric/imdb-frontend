import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';
import { logout } from '../reduxStore/auth/actions';

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    dispatch(logout());
  };

  return (
    <Navbar color="light border-bottom" expand="md" light>
      <NavbarBrand tag={Link} to="/">IMDB</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {user && (
          <>
            <NavItem>
              <NavLink tag={Link} to="/rate-movies">
                Rate Movies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/rate-shows">
                Rate Shows
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {user.first_name}
                {' '}
                {user.last_name}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="#" onClick={onLogout}>Logout</NavLink>
            </NavItem>
          </>

        ) }
        {!user && (
        <NavItem>
          <NavLink tag={Link} to="/login">Login</NavLink>
        </NavItem>
        )}
      </Nav>
    </Navbar>
  );
}
