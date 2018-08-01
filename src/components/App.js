import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <div className="container">
                  <Switch>
                      <Route exact path="/" component={Login}></Route>
                      <Route path="/dashboard" component={Dashboard}></Route>
                      <Route path="/register" component={Register}></Route>
                  </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
