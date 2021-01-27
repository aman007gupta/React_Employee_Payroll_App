import React from 'react';
import logo from "../../assets/logo.png";
import { Link, withRouter } from "react-router-dom"
import addIcon from '../../assets/add-24px.svg';
import './home.css';
import EmployeeService from '../../services/EmployeeService';
import Display from "./display";
const service = new EmployeeService();

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      employeeArray: []
    }
  }
  componentDidMount() {
    this.getEmployeeData();
  }

  update = () => {
    this.getEmployeeData();
  }

  getEmployeeData = () => {
    service.getAllEmployeeData().then(data => {
      this.setState({ employeeArray: data.data.data });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <header className="header-content header">
          <div className="logo-content">
            <img src={logo} alt="" />
            <div>
              <span className="emp-text">EMPLOYEE</span><br />
              <span className="emp-text emp-payroll"> PAYROLL</span>
            </div>
          </div>
        </header>
        <div className="main-content">
          <div className="header-content">
            <div className="emp-detail-text">
              Employee Details <div className="emp-count">{this.state.employeeArray.length}</div>
            </div>
            <Link to="PayrollForm" className="add-button flex-row-center">
              <img src={addIcon} alt="" /> Add User
            </Link>
          </div>
          <div className="table-main">
            <table id="diplay" className="table">
              <tbody>
                <Display employeeArray={this.state.employeeArray} callUpdate={this.update}/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}