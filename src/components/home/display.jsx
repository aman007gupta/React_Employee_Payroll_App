import { withRouter } from "react-router-dom"
import './home.css';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import editIcon from '../../assets/create-black-18dp.svg';
import profile from '../../assets/Ellipse -3.png'
const Display = (props) => {

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
          props.employeeArray && props.employeeArray.map((element, ind) => (
            <tr key={ind}>
              <td><img className="profile" src={profile} alt="image" /></td>
              <td>{element.name}</td>
              <td>{element.gender}</td>
              <td>{element.department && element.department.map(dept => (
                <div className="dept-label">{dept}</div>
              ))}</td>
              <td>{element.salary}</td>
              <td>{element.startDate}</td>
              <td><img src={deleteIcon} alt="delete" />
                <img src={editIcon} alt="edit" />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
export default withRouter(Display);