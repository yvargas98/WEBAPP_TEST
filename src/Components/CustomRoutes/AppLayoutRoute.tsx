import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { isAuthenticated, isAdmin } from '../../Util/validations';

const PrivateRoute = (props: RouteProps) => {
  const {
    component, exact, location,
    path, render, sensitive, strict,
  } = props;

  if(!isAuthenticated()){
    if(location?.pathname === '/'){
      return (
        <Redirect to={{pathname: '/login'}}/>
      );
    }
    return (
      <Redirect to={{pathname: '/403'}}/>
    );
  }
  if (location?.pathname === '/') {
    return (
      <Redirect
        to={{
          pathname: '/Posts',
        }}
      />
    );
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/Posts">Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Posts">Posts</Nav.Link>
            <Nav.Link href="/Categories">Categories</Nav.Link>
            {
              isAdmin() && 
                <Nav.Link href="/Users">Users</Nav.Link>
            }
          </Nav>
          <Nav>
            <Nav.Link href="/logout">LogOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route
        component={component}
        exact={exact}
        location={location}
        path={path}
        render={render}
        sensitive={sensitive}
        strict={strict}
      />
    </div>
  );
};

export default PrivateRoute;