import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientsRoute from '../../routes/ClientsRoute/ClientsRoute';

import TestRoute from '../TestRoute/TestRoute';

export default function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route path="/" exact component={HomepageRoute} />
        <Route path="/schedule" component={ClientsRoute} />
      </Switch> */}

      <Switch>
        <TestRoute path={'/'} exact component={HomepageRoute} />
        <TestRoute path={'/schedule'} component={ClientsRoute} />
      </Switch>
    </div>
  );
}
