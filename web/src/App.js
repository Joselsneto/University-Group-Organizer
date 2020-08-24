import React from 'react';
import './App.css';

import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Universities from './views/universities_view/universities';
import Subjects from './views/subjects_view/subjects';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={Universities} />
        <Route exact path='/university/:id' children={<Subjects />} />
        <Route exact path='/*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
