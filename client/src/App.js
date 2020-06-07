import React from 'react';
import Login from './components/login';
import Home_Page from './components/home_page';
import Add from './components/add';
import Edit from './components/edit'
import Archive from './components/archive';
import Filter from './components/filter';
import SignUp from './components/sign_up';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import withAuth from './components/withAuth';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/sign_up' exact component={SignUp} />
            <Route path='/home' exact component={withAuth(Home_Page)} />
            <Route path='/add' exact component={withAuth(Add)} />
            <Route path='/edit/:id' exact component={withAuth(Edit)} />
            <Route path='/archive' exact component={withAuth(Archive)} />
            <Route path='/filter/:label' exact component={withAuth(Filter)} />
          </Switch>
        </Router>
        {/* <Preview /> */}

      </div>
    )
  }
}
