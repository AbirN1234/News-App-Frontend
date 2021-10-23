import React, { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "./Navbar";
import { Redirect } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
// import { propTypes } from "react-bootstrap/esm/Image";

function AdminViewMessage(props) {
    // const [msg, setMsg] = useState("");
    const [contact, setContact] = useState([]);
    let admin = sessionStorage.getItem('admin')

    useEffect(() => {
        axios.get('http://localhost:4500/admin/viewmsg/')
            .then(response => {
                setContact(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    function viewContacts() {
        return contact.map((currentrow, index) => {
            return (
                <Row key={index} style={{ border: "1px solid black" }}>
                    <Col style={{ border: "1px solid black" }}>{index}</Col>
                    <Col style={{ border: "1px solid black" }}>{currentrow.vname}</Col>
                    <Col style={{ border: "1px solid black" }}>{currentrow.vemail}</Col>
                    <Col style={{ border: "1px solid black" }}>{currentrow.vmobile}</Col>
                    <Col style={{ border: "1px solid black" }}>{currentrow.vcomment}</Col>
                    <Col style={{ border: "1px solid black" }} > <Button variant="primary" onClick={() => reply(index)}>Reply</Button> </Col>
                </Row>
            )
        })
    }

    function reply(index) {
        var temp = [...contact];
        localStorage.setItem("mail",temp[index].vemail)
        props.history.push('/mailer')
        // console.log(temp[index].vemail)
        // console.log()
    }

    if (admin == null) {
        return (<Redirect to="/adminlogin" />)
    }
    else {
        return (
            <div style={{backgroundColor:"#F0EEBA"}}>
                <MyNavbar />
                <br /><br />
                <Container>
                    <Row style={{ fontWeight: "bold", border: "2px solid black" }}>
                        <Col style={{ border: "1px solid black" }}>Serial No.</Col>
                        <Col style={{ border: "1px solid black" }}>Name</Col>
                        <Col style={{ border: "1px solid black" }}>Email Id</Col>
                        <Col style={{ border: "1px solid black" }}>Contact No</Col>
                        <Col style={{ border: "1px solid black" }}>Message</Col>
                        <Col style={{ border: "1px solid black" }}>Action</Col>
                    </Row>
                    <br />
                    {viewContacts()}
                </Container>
            </div>
        )
    }
}
export default AdminViewMessage;