import { useState } from 'react'
import profile1 from '../../assets/Ellipse -3.png';
import profile2 from '../../assets/Ellipse 1.png';
import profile3 from '../../assets/Ellipse -8.png';
import profile4 from '../../assets/Ellipse -7.png';
import '../payroll-form/payroll-form.css';
import logo from '../../assets/logo.png'
import EmployeeService from '../../services/EmployeeService'
import React from 'react'
import { Link } from 'react-router-dom';

const employeeService = new EmployeeService();
export default class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            profileArray: [
                { url: profile1 },
                { url: profile2 },
                { url: profile3 },
                { url: profile4 }
            ],
            allDepartment: [
                'HR', 'Sales', 'Finance', 'Engineer', 'Others'
            ],
            departmentValue: [],
            gender: '',
            salary: '',
            day: '1',
            month: 'Jan',
            year: '2021',
            startDate: '',
            notes: '',
            id: '',
            profileUrl: '',
            isUpdate: true,
            error: {
                department: '',
                name: '',
                gender: '',
                salary: '',
                profileUrl: '',
                startDate: ''
            }
        }
    }

    componentDidMount() {
        let empId = localStorage.getItem('id');
        console.log(" employee id: ", empId);
        employeeService.getEmployeeById(empId).then((data) => {
            this.setState({ name: data.data.data.name })
            this.setState({ profileUrl: data.data.data.profilePic })
            this.setState({ gender: data.data.data.gender })
            this.setState({ salary: data.data.data.salary })
            this.setState({ notes: data.data.data.notes })
            this.setState({ startDate: data.data.data.startDate })
        }).catch(err => {
            console.log(err)
        })
    }

    changeValue = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }
    onCheckChange = (name) => {
        let index = this.state.departmentValue.indexOf(name);
        let checkArray = [...this.state.departmentValue];
        if (index > -1)
            checkArray.splice(index, 1);

        else
            checkArray.push(name);
        this.setState({departmentValue: checkArray });
    }

    getChecked = (name) => {
        return this.state.departmentValue && this.state.departmentValue.includes(name);
    }

    validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
        if (this.state.name.length < 1) {
            error.name = 'name is required field';
            isError = true;
        }
        if (this.state.gender.length < 1) {
            error.name = 'gender is required field';
            isError = true;
        }
        if (this.state.salary.length < 1) {
            error.name = 'salary is required field';
            isError = true;
        }
        if (this.state.profileUrl.length < 1) {
            error.name = 'profile is required field';
            isError = true;
        }
        if (this.state.departmentValue.length < 1) {
            error.name = 'department is required field';
            isError = true;
        }
        await this.setState({ ...this.state, error: error });
        return isError;
    }

    update = async (event) => {
        event.preventDefault();
        console.log("update");

        if (await this.validData()) {
            console.log('error', this.state.error);
            return;
        }
        let object = {
            "name": this.state.name,
            "profilePic": this.state.profileUrl,
            "gender": this.state.gender,
            "salary": this.state.salary,
            "department": this.state.departmentValue,
            "notes": this.state.notes,
            "id": this.state.id,
            "startDate": this.state.day + " " + this.state.month + " " + this.state.year
        }

        employeeService.updateEmployeeData(localStorage.getItem('id'), object).then(data => {
            console.log(data);
            this.props.history.push('');
        }).catch(err => {
            console.log("err while update");
        })
    }

    reset = () => {
        this.setState({ ...this.intialValue, id: this.state.id, inUpdate: this.state.isUpdate });
    }
    
    render() {
        return (
            <div className="payroll-main" >
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br />
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="form-content">
                    <form className="form" action="#" onSubmit={this.update}>
                        <div className="form-head">Employee Payroll form</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="name">Name</label>
                            <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={this.changeValue} placeholder="Your name..." />
                        </div>
                        <div className="error">{this.state.error.name}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="profileUrl">Profile image</label>
                            <div className="profile-radio-button">
                                <label>
                                    <input type="radio" checked={this.state.profileUrl == '../../assets/Ellipse -3.png'} name="profileUrl"
                                        value='../../assets/Ellipse -3.png' onChange={this.changeValue} />
                                    <img className="profile" src={profile1} />
                                </label>
                                <label>
                                    <input type="radio" checked={this.state.profileUrl == '../../assets/Ellipse -1.png'} name="profileUrl"
                                        value='../../assets/Ellipse -1.png' onChange={this.changeValue} />
                                    <img className="profile" src={profile2} />
                                </label>
                                <label>
                                    <input type="radio" checked={this.state.profileUrl == '../../assets/Ellipse -8.png'} name="profileUrl"
                                        value='../../assets/Ellipse -8.png' onChange={this.changeValue} />
                                    <img className="profile" src={profile3} />
                                </label>
                                <label>
                                    <input type="radio" checked={this.state.profileUrl == '../../assets/Ellipse -7.png'} name="profileUrl"
                                        value='../../assets/Ellipse -7.png' onChange={this.changeValue} />
                                    <img className="profile" src={profile4} />
                                </label>
                            </div>
                        </div>
                        <div className="error">{this.state.error.profileUrl}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" checked={this.state.gender == 'male'} onChange={this.changeValue} name="gender" value="male" />
                                <label className="text" htmlFor="male">Male</label>
                                <input type="radio" id="female" checked={this.state.gender == 'female'} onChange={this.changeValue} name="gender" value="female" />
                                <label className="text" htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className="error">{this.state.error.gender}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="department">Department</label>
                            <div>
                                {this.state.allDepartment.map(item => (
                                    <span key={item}>
                                        <input className="checkbox" type="checkbox" onChange={() => this.onCheckChange(item)} name={item}

                                            defaultChecked={() => this.getChecked(item)} value={item} />
                                        <label className="text" htmlFor={item}>{item}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="error">{this.state.error.department}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Salary</label>
                            <input className="input" type="number" onChange={this.changeValue} id="salary" value={this.state.salary} name="salary" placeholder="salary" />
                        </div>
                        <div className="error">{this.state.error.salary}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="startDate">Start Date</label>
                            <div>
                                <select onChange={this.changeValue} id="day" name="day">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select onChange={this.changeValue} id="month" name="month">
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sep">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">Novmerber</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select onChange={this.changeValue} id="year" name="year">
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                        </div>
                        <div className="error">{this.state.error.startDate}</div>
                        <div className="row-content">
                            <label className="label text" htmlFor="notes">Notes</label>
                            <textarea onChange={this.changeValue} id="notes" value={this.state.notes} className="input" name="notes" placeholder=""
                                style={{ height: '100%' }}></textarea>
                        </div>
                        <div className="button-content">
                            <Link to="" className="resetButton button cancleButton">Cancle</Link>
                            <div className="submit-reset">
                                <button type="submit" onClick={this.update} className="button submitButton" id="submitButton">{this.state.isUpdate ? 'Update' : 'Submit'}</button>
                                <button type="button" onClick={this.reset} className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
