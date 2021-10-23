import React, { useState } from "react";
import 'react-bootstrap';
import './login.css';
import axios from 'axios';
import MyNavbar from "./Navbar";
import { Col, Container, Row } from "react-bootstrap";

function UserReg() {

    const [uname, setUserName] = useState("");
    const [uemail, setUserEmail] = useState("");
    const [umobile, setUserMobile] = useState("");
    const [udob, setUserDOB] = useState("");
    const [ugender, setUserGender] = useState("");
    const [upass, setUserPass] = useState("");
    const [msg, setMessage] = useState("");

    const onChangeUserName = (e) => setUserName(e.target.value);
    const onChangeUserEmail = (e) => setUserEmail(e.target.value);
    const onChangeUserMobile = (e) => setUserMobile(e.target.value);
    const onChangeUserDOB = (e) => setUserDOB(e.target.value);
    const onChangeUserGender = (e) => setUserGender(e.target.value);
    const onChangeUserPass = (e) => setUserPass(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(`Form submitted:`);
        // console.log(`NAME: ${uname}`);
        // console.log(`EMAIL: ${uemail}`);

        const userinfo = {
            uname: uname,
            uemail: uemail,
            umobile: umobile,
            udob: udob,
            ugender: ugender,
            upass: upass,
        }

        axios.post('https://news-app-back.herokuapp.com/user/register', userinfo)
            .then(res => {
                // console.log(res.data.message)
                // setMessage('REGISTRATION SUCCESSFUL')
                setMessage(res.data.message)
            })
            .catch(err => {
                setMessage(err.message)
                console.log(err);
            })

        setUserName('')
        setUserEmail('')
        setUserMobile('')
        setUserDOB('')
        setUserGender('')
        setUserPass('')
    }

    return (
        <div style={{ backgroundColor: "#F0EEBA" }}>
            <MyNavbar />
            <br />
            <br />
            <h4 style={{ color: "brown" }}> {msg}</h4>
            <br />
            <Container>
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col md={8}>
                        <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" className="form-control" placeholder="Name" name="name" value={uname} onChange={onChangeUserName} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={uemail} onChange={onChangeUserEmail} />
                    </div>

                    <div className="form-group">
                        <label>Contact No</label>
                        <input type="tel" className="form-control" placeholder="Contact no" name="mobile" value={umobile} onChange={onChangeUserMobile} />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" placeholder="Date of Birth" name="dob" value={udob} onChange={onChangeUserDOB} />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select value={ugender} onChange={onChangeUserGender} className="form-control" name="Gender">
                            <option selected disabled></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" value={upass} onChange={onChangeUserPass} />
                    </div>

                    <input type="submit" value="REGISTER" className="btn btn-danger" />

                    {/* <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={userData}>Register</button> */}
                    {/* <p className="forgot-password text-right">
                    Already registered <Link to="/login">log in?</Link>
                </p> */}
                </form>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
                
                <br />
                <br />
            </Container>

        </div >
    );
}
export default UserReg;