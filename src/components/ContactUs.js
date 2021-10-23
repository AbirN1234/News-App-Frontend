import React, { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import MyNavbar from './Navbar';
import './Contact.css';

function ContactUs() {

    const [vname, setVName] = useState("");
    const [vmobile, setVMobile] = useState("");
    const [vemail, setVEmail] = useState("");
    const [vcomment, setVComment] = useState("");
    const [msg, setMessage] = useState("");

    const onChangeVName = (e) => setVName(e.target.value);
    const onChangeVEmail = (e) => setVMobile(e.target.value);
    const onChangeVMobile = (e) => setVEmail(e.target.value);
    const onChangeVComment = (e) => setVComment(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(`Form submitted:`);
        // console.log(`NAME: ${uname}`);
        // console.log(`EMAIL: ${uemail}`);

        const userinfo = {
            vname: vname,
            vemail: vemail,
            vmobile: vmobile,
            vcomment: vcomment,
        }

        axios.post('http://localhost:4500/viewer/contact', userinfo)
            .then(res => {
                // console.log(res.data)
                setMessage('MESSAGE SENT SUCCESSFULLY')
            })
            .catch(err => {
                console.log(err);
            })

            setVName('')
            setVMobile('')
            setVEmail('')
            setVComment('')
    }


    return (
        <div style={{backgroundColor:"#cde9b6"}}>
            <MyNavbar />
            <br />
            <h4 style={{color:"green"}}>{msg}</h4>
            
            <Container>
                <Row>
                    <Col md={3}>
                        <div className="contact-info">
                            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="..." />
                            <h2>Contact Us</h2>
                            <h4>We would love to hear from you !</h4>
                        </div>
                    </Col>
                    <Col md={9}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Name:</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" placeholder="Enter Name" name="name" value={vname} onChange={onChangeVName} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Contact No.:</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" placeholder="Enter Contact Number" name="mob" value={vmobile} onChange={onChangeVEmail} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Email:</label>
                                <div className="col-sm-12">
                                    <input type="email" className="form-control" placeholder="Enter email id" name="email" value={vemail} onChange={onChangeVMobile} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Comment:</label>
                                <div className="col-sm-12">
                                    <textarea className="form-control" rows="5" value={vcomment} onChange={onChangeVComment} required></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-12">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
            <br />
        </div >
    )


}
export default ContactUs;