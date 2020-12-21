import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppRoute from './Components/CustomRoutes/AppLayoutRoute'

import LoginView from './Views/Login';
import Logout from './Views/Logout';
import Posts from './Views/Posts';

import Unauthorized from './Views/Unauthorized';
import NotFound404 from './Views/NotFound404';
import Categories from './Views/Categories';
import Users from './Views/Users'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/403" exact component={Unauthorized}/>

    <Route path="/login" exact component={LoginView}/>
    <Route path="/logout" exact component={Logout}/>

    <AppRoute path="/" exact />
    <AppRoute path="/Posts" exact component={Posts}/>
    <AppRoute path="/Categories" exact component={Categories}/>
    <AppRoute path="/Users" exact component={Users}/>

    <Route path="*" exact component={NotFound404}/>
  </Switch>
);

export default Routes;
