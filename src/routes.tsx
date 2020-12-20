import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppRoute from './Components/CustomRoutes/AppLayoutRoute'

import LoginView from './Views/Login';
//import Logout from 'Components/Authentication/Logout';

import Unauthorized from './Views/Unauthorized';
import NotFound404 from './Views/NotFound404';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/403" exact component={Unauthorized} />

    <Route path="/login" exact component={LoginView} />
    {/*<Route path="/logout" exact component={Logout} />*/}

    <AppRoute path="/" exact />

    <Route path="*" exact component={NotFound404} />
  </Switch>
);

export default Routes;
