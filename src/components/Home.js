import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import MyNavbar from './Navbar';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


function Home(props) {
    const [newslist, setNewsList] = useState([]);
    const [msg, setMsg] = useState("");
    const history = useHistory();

    useEffect(() => {
        // 192.168.31.192
        axios.get('https://news-app-back.herokuapp.com/viewer/')
            .then(response => {
                if (response.data.length < 1) {
                    setMsg("No News is uploaded to the portal yet")
                }
                else {
                    // console.log(response)
                    setNewsList(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function viewNews() {
        return newslist.map((currentrow, index) => {
            return (
                <Col key={index} style={{ marginBottom: "1rem" }}>
                    <Card style={{ width: '100%', minWidth: "20rem" }}>
                        <Card.Img variant="top" style={{ width: '100%', height: "15rem", maxHeight: "13rem" }} src={currentrow.img_path} />
                        <small className="text-muted"> {currentrow.catagory.map((cr, ind) => { return (<Link to={`/catsrc/${cr}`} key={ind}> {cr}</Link>) })}</small>
                        <Card.Body>
                            <Card.Title style={{ maxHeight: "26px", marginTop: "-20px", overflow: "hidden" }}>
                                {currentrow.title}
                            </Card.Title>
                            <Card.Body style={{ maxHeight: "7rem", marginTop: "-25px", overflow: "hidden", textAlign: "justify" }}>
                                {currentrow.descrip}
                            </Card.Body>
                            <Card.Footer style={{ marginBottom: "2px" }}>
                                <Button variant="primary" onClick={() => readmore(index)}>Read More</Button>
                                <br />
                                <cite title="Source Title">{currentrow.authorname} </cite>
                                <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime>
                                <Like val={currentrow._id} />
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    }

    function readmore(index) {
        var temp = [...newslist];
        history.push('/readmore/' + temp[index]._id);
    }

    return (
        <div style={{ backgroundColor: "#E8DDE3" }}>
            <MyNavbar />
            <br />

            <h3 style={{ color: "red" }}>{msg}</h3>
            <Container>
                <Row  >
                    {viewNews()}
                </Row>

            </Container>
        </div>
    )
}

function Like(params) {
    const [likec, setLike] = useState();
    const [dislikec, setDisLike] = useState();

    useEffect(() => {
        axios.post("https://news-app-back.herokuapp.com/react/", { nid: params.val })
            .then(response => {
                // console.log(response)
                setLike(response.data.like)
                setDisLike(response.data.dislike)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    // const 
    // console.log(params.val)
    let uid = sessionStorage.getItem('uid')

    function like(nid) {
        if (!uid) {
            alert("Please Login to react")
            return
        }
        else {
            const rid = {
                nid: nid,
                uid: uid
            }
            // console.log("Like " + nid)
            axios.post('https://news-app-back.herokuapp.com/react/like', rid)
                .then(response => {
                    // console.log(response)
                    // console.log(response.data.message)

                    if (response.data.message === "0") {
                        alert("Already liked")
                    }
                    else if (response.data.message === "1") {
                        setLike(likec + 1)
                        // console.log(likec)
                    }
                    else if (response.data.message === "2") {
                        setLike(likec + 1)
                        setDisLike(dislikec - 1)
                        // console.log(likec)
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    function dislike(nid) {
        if (!uid) {
            alert("Please Login to react")
            return
        }
        else {
            const rid = {
                nid: nid,
                uid: uid
            }
            // console.log("Dislike " + nid)
            axios.post('https://news-app-back.herokuapp.com/react/dislike', rid)
                .then(response => {
                    // console.log(response)
                    // console.log(response.data.message)

                    if (response.data.message === "0") {
                        alert("Already Disliked")
                    }
                    else if (response.data.message === "1") {
                        setDisLike(dislikec + 1)
                        // console.log(likec)
                    }
                    else if (response.data.message === "2") {
                        setDisLike(dislikec + 1)
                        setLike(likec - 1)
                        // console.log(likec)
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <Button variant="success" onClick={() => like(params.val)}><img src="https://img.icons8.com/material-outlined/24/000000/thumb-up.png" alt="like" /> {likec}</Button>
            <Button variant="danger" onClick={() => dislike(params.val)}><img src="https://img.icons8.com/material-outlined/24/000000/thumbs-down.png" alt="dislike" />{dislikec} </Button>
        </>
    )
}

export default Home;