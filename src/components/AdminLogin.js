import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import { Redirect } from "react-router";
import MyNavbar from "./Navbar";

function AdminLogin(props) {
    const [admin, setAdmin] = useState("");
    const [pass, setPass] = useState("");
    const [msg, setMsg] = useState("");

    const onChangeAdmin = (e) => {
        setAdmin(e.target.value);
    }
    const onChangePass = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const cred = {
            adminid: admin,
            adminpass: pass
        }
        axios.post('https://news-app-back.herokuapp.com/admin/login', cred)
            .then(res => {
                if (res.data === 0) {
                    setMsg("Id or Password not Matched");
                }
                else if (res.data === 1) {
                    sessionStorage.setItem("admin", admin);
                    props.history.push('/adminpanel')

                }
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
                // setMsg("Login Unsuccessful");
            })

    }

    return (
        <>
            <MyNavbar />
            <br /><br />
            <h4 style={{ color: "brown" }}> {msg}</h4>
            <br />
            <Container>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Form onSubmit={handleSubmit} className="login-form">
                            <h3>Admin Log in</h3>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Enter email" name="email" value={admin}
                                    onChange={onChangeAdmin} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name="password" value={pass}
                                    onChange={onChangePass} required />
                            </div>
                            <input type="submit" value="ADMIN LOGIN" className="btn btn-danger" />
                        </Form>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>

        </>
    )
}
export default AdminLogin;