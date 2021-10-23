import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import MyNavbar from "./Navbar";
import axios from 'axios';
import 'react-bootstrap';
import { Col, Container, Row } from "react-bootstrap";


function UpdateProf() {

    let uid = sessionStorage.getItem('uid');
    // let authuser = sessionStorage.getItem('user');
    let status = sessionStorage.getItem('status');

    const [uname, setUserName] = useState("");
    const [uemail, setUserEmail] = useState("");
    const [umobile, setUserMobile] = useState("");
    const [udob, setUserDOB] = useState("");
    const [ugender, setUserGender] = useState("");
    const [upass, setUserPass] = useState("");
    const [msg, setMessage] = useState("");

    useEffect(() => {
        axios.get('https://news-app-back.herokuapp.com/user/update/' + uid)
            .then(response => {
                setUserName(response.data[0].name);
                setUserEmail(response.data[0].email);
                setUserMobile(response.data[0].mobile);
                setUserDOB(response.data[0].dob);
                setUserGender(response.data[0].gender);
                setUserPass(response.data[0].password);

                // setNewsList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    if (uid == null) {
        return (<Redirect to="/userlogin" />)
    }
    else {
        if (status === "0" || status === "1") {
            const onChangeUserName = (e) => {
                setUserName(e.target.value);
                setMessage("");
            }
            const onChangeUserEmail = (e) => {
                setUserEmail(e.target.value);
                setMessage("");
            }
            const onChangeUserMobile = (e) => {
                setUserMobile(e.target.value);
                setMessage("");
            }
            const onChangeUserDOB = (e) => {
                setUserDOB(e.target.value);
                setMessage("");
            }
            const onChangeUserGender = (e) => {
                setUserGender(e.target.value);
                setMessage("");
            }
            const onChangeUserPass = (e) => {
                setUserPass(e.target.value);
                setMessage("");
            }

            const handleSubmit = (evt) => {
                evt.preventDefault();
                // console.log(`Form submitted:`);
                // console.log(`NAME: ${uname}`);
                // console.log(`EMAIL: ${uemail}`);

                const userinfo = {
                    uid: uid,
                    uname: uname,
                    uemail: uemail,
                    umobile: umobile,
                    udob: udob,
                    ugender: ugender,
                    upass: upass,
                }

                axios.post('https://news-app-back.herokuapp.com/user/update', userinfo)
                    .then(res => {
                        // console.log(res.data)
                        setMessage('UPDATE SUCCESSFUL')
                    })
                    .catch(err => {
                        console.log(err);
                    })

                // setUserName('')
                // setUserEmail('')
                // setUserMobile('')
                // setUserDOB('')
                // setUserGender('')
                // setUserPass('')
            }

            return (
                <div style={{ backgroundColor: "#F0EEBA" }}>
                    <MyNavbar />
                    <br /><br />
                    <h4 style={{ color: "brown" }}> {msg}</h4>
                    <br />
                    <Container>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <h3>Update Profile</h3>

                                    <div className="form-group">
                                        <label>Your Name</label>
                                        <input type="text" className="form-control" placeholder="Name" name="name" value={uname} onChange={onChangeUserName} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={uemail} onChange={onChangeUserEmail} disabled />
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

                                    <input type="submit" value="UPDATE" className="btn btn-danger" />

                                    {/* <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={userData}>Register</button> */}
                                    {/* <p className="forgot-password text-right">
                                    Already registered <Link to="/login">log in?</Link>
                                </p> */}
                                </form>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Container>

                    <br /><br />
                </div>
            )
        }
        else if (status === "-1") {
            return (
                <div style={{ backgroundColor: "#F0EEBA" }}>
                    <MyNavbar />
                    <br /><br />
                    <h3 style={{ color: "red" }}>
                        Your acount has been moved to Blacklist. <br /><br /> You can not Update your Profile
                    </h3>
                    <Container>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <form className="login-form" >
                                    <div className="form-group">
                                        <label>Your Name</label>
                                        <input type="text" className="form-control" placeholder="Name" name="name" value={uname} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={uemail} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label>Contact No</label>
                                        <input type="tel" className="form-control" placeholder="Contact no" name="mobile" value={umobile} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input type="date" className="form-control" placeholder="Date of Birth" name="dob" value={udob} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select value={ugender} className="form-control" name="Gender" disabled>
                                            <option selected disabled></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" name="password" value={upass} disabled />
                                    </div>
                                </form>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Container>

                    <br /><br />
                </div>
            )
        }
    }



}
export default UpdateProf;