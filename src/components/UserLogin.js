import React, { useState } from "react";
import 'react-bootstrap';
import './login.css';
import axios from 'axios';
import MyNavbar from "./Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";


function UserLogin(props) {
    const [userid, setUserId] = useState("");
    const [password, setpassword] = useState("");;
    const [msg, setMessage] = useState("");;

    const onChangeUserId = (e) => setUserId(e.target.value);
    const onChangePassword = (e) => setpassword(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // console.log(`EMAIL: ${userid}`);
        // console.log(`PASS: ${password}`);

        const cred = {
            userid: userid,
            password: password,
        }

        axios.post('https://news-app-back.herokuapp.com/user/login', cred)
            .then(res => {
                // console.log(res);
                // setMessage('LOGIN SUCCESSFUL')
                window.alert("LOGIN SUCCESSFUL");
                sessionStorage.setItem("user", userid);
                sessionStorage.setItem("name", res.data[0].name);
                sessionStorage.setItem("uid", res.data[0]._id);
                sessionStorage.setItem("status", res.data[0].status);
                props.history.push('/userpanel')
            })
            .catch(err => {
                console.log(err);
                setMessage("Email Id Password not matched")
            })

        // if ((userid === "admin") && (password === "admin")) {
        //     setMessage('WELCOME ADMIN')

        // }
        // else
        //     setMessage('INVALID UID OR PASSWORD')

        setUserId('')
        setpassword('')

    }
    if (sessionStorage.getItem('user'))        return <Redirect to="/userpanel" />

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
                        <form onSubmit={handleSubmit} className="login-form">

                            <h3>Log in</h3>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={userid}
                                    onChange={onChangeUserId} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name="password" value={password}
                                    onChange={onChangePassword} required />
                            </div>

                            <input type="submit" value="User LOGIN" className="btn btn-danger" />


                        </form>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>

                <br /><br />
            </Container>
        </div>
    );
}
export default UserLogin;