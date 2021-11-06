import React, { useState } from "react";
import 'react-bootstrap';
import './login.css';
import axios from 'axios';
import MyNavbar from "./Navbar";
import { Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap";

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
    function myFunction() {
        var x = document.getElementById("psw");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
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
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <h3>Register</h3>

                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" className="form-control" pattern="[A-Z][a-z].{,30}" maxLength={50} placeholder="Name" name="name" value={uname} onChange={onChangeUserName} required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" maxLength={50} placeholder="Enter email" name="email" value={uemail} onChange={onChangeUserEmail} required />
                            </div>
                            <FormGroup>
                                <label>Contact No</label>
                                <InputGroup>
                                    <InputGroup.Text>+91</InputGroup.Text>
                                    <input type="tel" pattern="[0-9]{10}" maxLength={10} aria-describedby="contact"
                                        className="form-control" placeholder="Contact no" name="mobile" value={umobile} onChange={onChangeUserMobile} required />
                                </InputGroup>
                            </FormGroup>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" placeholder="Date of Birth" value={udob} onChange={onChangeUserDOB} required />
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select value={ugender} onChange={onChangeUserGender} className="form-control" name="Gender" required>
                                    <option selected disabled></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$" maxLength={20} className="form-control" id="psw" placeholder="Enter password" name="password" value={upass} onChange={onChangeUserPass} required />
                                {/* <input type="checkbox" onClick={() => myFunction()} />Show Password */}
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Show/Hide Password"
                                    onClick={() => myFunction("myInput")}
                                />
                            </div>

                            <input type="submit" value="REGISTER" className="btn btn-success" />

                        </Form>
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
