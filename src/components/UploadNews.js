import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import 'react-bootstrap';
import './login.css';
import axios from 'axios';
import MyNavbar from "./Navbar";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { Container, Row, Col } from "react-bootstrap";

function UploadNews() {
    let authuser = sessionStorage.getItem('user');
    let name = sessionStorage.getItem('name');
    let uid = sessionStorage.getItem('uid');
    let status = sessionStorage.getItem('status');

    const [title, setTitle] = useState("");
    const [descrip, setDescrip] = useState("");
    const [img_path, setImg_path] = useState("");
    const [msg, setMessage] = useState("");
    const [tags, setTags] = useState([])

    if (authuser == null) {
        return (<Redirect to="/userlogin" />)
    }
    else {
        if (status === "0") {
            return (
                <>
                    <MyNavbar />
                    <br /><br />
                    <h3>
                        You are a new user <br /> <br />You can not upload a News until your account has been active
                    </h3>

                </>
            )
        }
        else if (status === "-1") {
            return (
                <>
                    <MyNavbar />
                    <br /><br />
                    <h3>
                        Your acount has been moved to Blacklist.
                    </h3>

                </>
            )
        }
        else if (status === "1") {
            const onChangeTitle = (e) => {
                setTitle(e.target.value);
                setMessage("");
            }
            const onChangeDescrip = (e) => {
                setDescrip(e.target.value);
                setMessage("");
            }

            const handleImage = async e => {
                e.preventDefault()
                let img = e.target.files[0]
                if (!img) return alert("File not exist.")
                //5242880 == 5 mb
                if (img.size > 1024 * 1024 * 10) return alert("Size too large!")
                if (img.type !== 'image/jpeg' && img.type !== 'image/png') return alert("File format is incorrect.")

                setImg_path(img)
            }

            const handleSubmit = (evt) => {
                evt.preventDefault();
                let data = new FormData()

                data.append('file', img_path)
                data.append('upload_preset', "abir_image")
                data.append('cloud_name', "abir9932")

                fetch(' https://api.cloudinary.com/v1_1/abir9932/image/upload', {
                    method: "post",
                    body: data
                })
                    .then(res => res.json())
                    .then(data => {
                        setImg_path(data.url)
                        console.log(data.url)
                        // console.log(img_path)
                        const news = {
                            title: title,
                            catagory: tags,
                            descrip: descrip,
                            img_path: data.url,
                            authorid: uid,
                            authorname: name,
                            authoremail: authuser,
                        }
                        axios.post('http://localhost:4500/user/upload', news)
                            .then(res => {
                                // console.log(res.data);
                                setMessage("News Added Successfully!!");
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })


                setTitle("");
                setDescrip("");
                setImg_path("");
                setTags([]);
                // setAuthor("");

            }
            return (
                <>
                    <MyNavbar />
                    <br /><br />
                    <h4 style={{ color: "green" }}> {msg}</h4>
                    <Container>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <h3>News Upload Panel</h3>

                                    <div className="form-group">
                                        <label>News Title</label>
                                        <input type="text" className="form-control" placeholder="Title" value={title} onChange={onChangeTitle} required />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea value={descrip} onChange={onChangeDescrip} className="form-control" placeholder="Details News..." rows="5" required>
                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Image Upload</label>
                                        <input type="file" className="form-control" placeholder="Image link" onChange={handleImage} required />
                                    </div>

                                    <div className="form-group">
                                        <label>News Catagory</label>
                                        <ReactTagInput
                                            tags={tags}
                                            placeholder="Type and press enter"
                                            maxTags={15}
                                            removeOnBackspace={true}
                                            onChange={(newTags) => setTags(newTags)}
                                        />
                                        {/* editable={true}
                                readOnly={false}
                                validator={(value) => {
                                    // Don't actually validate e-mails this way
                                    const isEmail = value.indexOf("@") !== -1;
                                    if (!isEmail) {
                                        alert("Please enter an e-mail address");
                                    }
                                    // Return boolean to indicate validity
                                    return isEmail;
                                }} */}

                                        {/* <input type="text" className="form-control" placeholder="Like Politics, Sports, etc. " value={catagory} onChange={onChangeCatagory} required /> */}
                                    </div>

                                    <div className="form-group">
                                        <label>Author Name</label>
                                        <input type="text" className="form-control" value={name} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label>Author Email</label>
                                        <input type="text" className="form-control" value={authuser} disabled />
                                    </div>

                                    <input type="submit" value="Upload" className="btn btn-success" />

                                </form>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Container>
                    <br /><br />
                </>
            )
        }

    }
}
export default UploadNews;