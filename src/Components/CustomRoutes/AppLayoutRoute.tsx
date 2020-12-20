import {
  Route, Redirect, RouteProps, NavLink, Link,
} from 'react-router-dom';

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
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink 
                  activeClassName="nav-link active"
                  to="/Posts"
                >Posts</NavLink>
                {/*<a className="nav-link active" aria-current="page" href="#">Home</a>*/}
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="nav-link"
                  to="/Categories"
                ></NavLink>
                {/*<a className="nav-link" href="#">Features</a>*/}
              </li>
              {
                isAdmin() && 
                <li className="nav-item">
                  <NavLink
                    activeClassName="nav-link"
                    to="/Users"
                  ></NavLink>
                  {/*<a className="nav-link" href="#">Pricing</a>*/}
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
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