import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Routes/>
    </Switch>
  </BrowserRouter>
  );

export default App;
