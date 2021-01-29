import { Link } from "react-router-dom"
import './home.css';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import editIcon from '../../assets/create-black-18dp.svg';
import profile from '../../assets/Ellipse -3.png'
import EmployeeService from "../../services/EmployeeService";
import React from 'react'

const service = new EmployeeService();
export default class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeArray: [],
      update: ''
    }
  }

  updateEmployeeData = (empId) => {
    localStorage.setItem('id', empId)
  }

  deleteEmployeeData = (empId) => {
    service.deleteEmployeeData(empId).then(() => {
      console.log("deleted successfully");
      this.setState({ update: "updates" });
      this.props.callUpdate();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <table id="table-diplay" className="table">
        <tbody>
          <tr key={-1}>
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
          {
            this.props.employeeArray && this.props.employeeArray.map((element, ind) => (
              <tr key={element.employeeId}>
                <td><img className="profile" src={element.profilePic} alt="image" /></td>
                <td>{element.name}</td>
                <td>{element.gender}</td>
                <td>{element.department && element.department.map(dept => (
                  <div className="dept-label">{dept}</div>
                ))}</td>
                <td>{element.salary}</td>
                <td>{element.startDate}</td>
                <td><img onClick={() => this.deleteEmployeeData(element.employeeId)} src={deleteIcon} alt="delete" />
                  <Link to="update"> <img onClick={() => this.updateEmployeeData(element.employeeId)} src={editIcon} alt="edit" />
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}