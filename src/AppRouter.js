import './App.css';
import React from 'react';

import PayrollForm from './components/payroll-form/payroll-form';
import Home from './components/home/home';

import { BrowserRouter as Router, Route} from "react-router-dom";

class AppRouter extends React.Component {
    render () {
      return (
        <div className="app-main">
          <Router>
            <div className="App">
              <Route path="/" component={Home} exact></Route>
              <Route path="/PayrollForm" component={PayrollForm}></Route>
            </div>
          </Router>
        </div>
      );
    }
  }
  export default AppRouter;