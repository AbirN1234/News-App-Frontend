import React, { useState } from "react";
import 'react-bootstrap';
import './login.css';
import axios from 'axios';
import MyNavbar from "./Navbar";
import { Button, Col, Container, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";

import { Redirect } from "react-router";



// https://gitbrent.github.io/bootstrap-switch-button-react/

function UserLogin(props) {
    const [userid, setUserId] = useState("");
    const [password, setpassword] = useState("");;
    const [msg, setMessage] = useState("");;
    const [show, setShow] = useState(false);
    const [femail, setFEmail] = useState("");;
    const [fmsg, setFMsg] = useState("");;
    const [users, upUser] = useState();
    const [passcode, setPasscode] = useState("");
    const [npass, setNPass] = useState("");
    const [cpass, setCPass] = useState("");

    const handleClose = () => {
        setShow(false);
        setFMsg("")
        setFEmail("")
    }
    const handleShow = () => setShow(true);

    const onChangeUserId = (e) => setUserId(e.target.value);
    const onChangePassword = (e) => setpassword(e.target.value);
    const onChangeFEmail = (e) => setFEmail(e.target.value);
    const onChangePCode = (e) => setPasscode(e.target.value);
    const onChangeNPass = (e) => setNPass(e.target.value);
    const onChangeCPass = (e) => setCPass(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const cred = {
            userid: userid,
            password: password,
        }
        axios.post('https://news-app-back.herokuapp.com/user/login', cred)
            .then(res => {
                if (res.status === 200 && res.data.message) {
                    setMessage(res.data.message)
                }
                else if (res.status === 200 && res.data.msg) {
                    // if(res.data.msg)
                    setMessage(res.data.msg)
                }
                else {
                    // console.log(res);
                    // setMessage('LOGIN SUCCESSFUL')
                    window.alert("LOGIN SUCCESSFUL");
                    // console.log(res)
                    // console.log(res.data.email)
                    // console.log(res.data[0].email)
                    sessionStorage.setItem("user", res.data.email);
                    sessionStorage.setItem("name", res.data.name);
                    sessionStorage.setItem("uid", res.data._id);
                    sessionStorage.setItem("status", res.data.status);
                    // props.history.push('/userpanel')
                    props.history.push('/')

                }
            })
            .catch(err => {
                console.log(err);
                setMessage(err)
            })
        setUserId('')
        setpassword('')
    }
    const handleForget = (evt) => {
        evt.preventDefault();
        axios.post('https://news-app-back.herokuapp.com/mailer/forget', { femail })
            .then(res => {
                // console.log(res.data.message)
                // console.log(res.data.msg)
                if (res.data.message) {
                    setFMsg(res.data.message)
                    // setFEmail("");
                    document.getElementById("forget").style.color = "green";
                }
                else {
                    setFMsg(res.data.msg)
                    document.getElementById("forget").style.color = "red";
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleChange = (evt) => {
        evt.preventDefault();
        if (npass === cpass) {
            const change = {
                email: femail,
                code: passcode,
                pass: npass
            }
            axios.post('https://news-app-back.herokuapp.com/user/change', change)
                .then(res => {
                    setFMsg(res.data.msg)
                })
                .catch(err => {
                    // setFMsg(err.data.message)
                    console.log(err)
                })
        }
        else {
            alert("Both password not matched.");
        }
        setPasscode("");
        setNPass("");
        setCPass("");
        setFEmail("");
    }

    if (sessionStorage.getItem('user')) return <Redirect to="/userpanel" />

    function myFunction(index) {
        var x = document.getElementById(index);
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    return (
        <div >
            <MyNavbar />
            <br />
            <br />
            <h4 style={{ color: "brown" }}> {msg}</h4>
            <br />
            <Container >
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col md={8}>
                        <Form onSubmit={handleSubmit} className="login-form">
                            <h3>User Log in</h3>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" maxLength={50} placeholder="Enter email" name="email" value={userid}
                                    onChange={onChangeUserId} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="myInput" className="form-control" placeholder="Enter password" name="password" value={password}
                                    onChange={onChangePassword} required />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Show/Hide Password"
                                    onClick={() => myFunction("myInput")}
                                />
                                {/* <input type="checkbox" onClick={() => myFunction("myInput")} />Show Password */}
                            </div>
                            <input type="submit" value="LOGIN" className="btn btn-success" />

                            <br /><br />
                            <Button variant="primary" onClick={handleShow}>
                                Forget Password ??
                            </Button>
                            {/* <Link to="/"> </Link> */}
                        </Form>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
                <Modal
                    show={show}
                    onHide={handleClose}
                    // backdrop="static"
                    // keyboard={true}
                    scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Forget Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs className="mb-3" defaultActiveKey="get" transition={false} activeKey={users} onSelect={(k) => upUser(k)} id="controlled-tab-example">
                            <Tab eventKey="get" title="Get Passcode">
                                <Form onSubmit={handleForget}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" maxLength={50} className="form-control" value={femail} onChange={onChangeFEmail} placeholder="Enter email" required />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Get Passcode" />
                                </Form>
                            </Tab>
                            <Tab eventKey="change" title="Change Password">
                                <Form onSubmit={handleChange}>
                                    <div className="form-group">
                                        <label>Email-Id</label>
                                        <input type="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" maxLength={50} value={femail} onChange={onChangeFEmail} placeholder="Enter Email-Id" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Passcode</label>
                                        <input type="text" className="form-control" value={passcode} onChange={onChangePCode} placeholder="Paste Passcode" required />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" maxLength={30} className="form-control" value={npass} onChange={onChangeNPass} placeholder="New Password" id="npass" required />
                                        <input type="checkbox" onClick={() => myFunction("npass")} />Show Password
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" maxLength={30} className="form-control" value={cpass} onChange={onChangeCPass} placeholder="Confirm Password" id="cpass" required />
                                        <input type="checkbox" onClick={() => myFunction("cpass")} />Show Password
                                    </div>
                                    <input type="submit" className="btn btn-success" value="Change Password" />
                                </Form>
                            </Tab>
                        </Tabs>
                        <h5 id="forget">{fmsg}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
                <br /><br />
            </Container>
        </div>
    );
}
export default UserLogin;