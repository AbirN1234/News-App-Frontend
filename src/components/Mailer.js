import ReactTagInput from "@pathofdev/react-tag-input";
import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyNavbar from "./Navbar";

function Mailer(params) {

    let mailid = localStorage.getItem('mail')

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [msg, setMessage] = useState("");
    const [tags, setTags] = useState([mailid])
    const [cc, setCc] = useState([])
    const [bcc, setBcc] = useState([])

    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeBody = (e) => setBody(e.target.value);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const mailer = {
            to: mailid,
            cc: cc,
            bcc: bcc,
            subject: title,
            text: body,
        }
        axios.post('https://news-app-back.herokuapp.com/mailer/', mailer)
            .then(response => {
                console.log(response.data)
                setMessage("Reply Sent Successfully")
            })
            .catch(err => {
                console.log(err)
            })
        setCc([])
        setBcc([])
        setTitle("")
        setBody("")

    }

    return (
        <div style={{backgroundColor:"#F0EEBA"}}>
            <MyNavbar />
            <br /><br />
            <h3 style={{ color: "green" }}>{msg}</h3>

            <Container >
                <Row>
                    <Link to="/adminviewmsg" onClick={() => localStorage.removeItem('mail')} >Go Back</Link>
                    <Col md={2}></Col>
                    <Col md={8}>
                        {/*  */}
                        <Form className="contact-form" onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label className="control-label col-sm-2 text-white" >To</label>
                                <div className="col-sm-12">
                                    <ReactTagInput
                                        tags={tags}
                                        placeholder="Type and press enter"

                                        removeOnBackspace={true}
                                        onChange={(newTags) => setTags(newTags)}
                                        readOnly={false}
                                        validator={(value) => {
                                            const isEmail = value.indexOf("@") !== -1;
                                            if (!isEmail) {
                                                alert("Please enter an e-mail address");
                                            }
                                            return isEmail;
                                        }}
                                    />
                                    {/* <input type="email" className="form-control" value={mailid} disabled name="to" /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Cc</label>
                                <div className="col-sm-12">
                                    {/* <input type="email" className="form-control" placeholder="Enter Email Id" name="cc" value={cc} onChange={onChangeCc} /> */}
                                    <ReactTagInput
                                        tags={cc}
                                        placeholder="Type and press enter"

                                        removeOnBackspace={true}
                                        onChange={(newTags) => setCc(newTags)}
                                        readOnly={false}
                                        validator={(value) => {
                                            const isEmail = value.indexOf("@") !== -1;
                                            if (!isEmail) {
                                                alert("Please enter an e-mail address");
                                            }
                                            return isEmail;
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Bcc</label>
                                <div className="col-sm-12">
                                    <ReactTagInput
                                        tags={bcc}
                                        placeholder="Type and press enter"

                                        removeOnBackspace={true}
                                        onChange={(newTags) => setBcc(newTags)}
                                        readOnly={false}
                                        validator={(value) => {
                                            const isEmail = value.indexOf("@") !== -1;
                                            if (!isEmail) {
                                                alert("Please enter an e-mail address");
                                            }
                                            return isEmail;
                                        }}
                                    />
                                    {/* <input type="email" className="form-control" placeholder="Enter email id" name="bcc" value={bcc} onChange={onChangeBcc} /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Subject</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" placeholder="Enter Subject" name="title" required value={title} onChange={onChangeTitle} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" >Message</label>
                                <div className="col-sm-12">
                                    <textarea className="form-control" rows="5" placeholder="Write your message here..." required value={body} onChange={onChangeBody}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-12">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </Container>
            <br /><br />
        </div>
    )
}
export default Mailer