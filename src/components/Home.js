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
                else{
                    console.log(response)
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
                <Col key={index} style={{ marginBottom: "1rem", width: "18rem" }}>
                    <Card style={{ width: '18rem', height: "30rem" }}>
                        <Card.Img variant="top" style={{ width: '18rem', height: "15rem", maxHeight: "13rem" }} src={currentrow.img_path} />
                        <small className="text-muted"> {currentrow.catagory.map((cr, ind) => { return (<Link to={`/catsrc/${cr}`} key={ind}> {cr}</Link>) })}</small>
                        <Card.Body>
                            <Card.Title style={{ maxHeight: "26px", marginTop: "-20px", overflow: "hidden" }}>
                                {currentrow.title}
                            </Card.Title>
                            <Card.Body style={{ maxHeight: "7rem", marginTop: "-25px", overflow: "hidden", textAlign: "justify" }}>
                                {currentrow.descrip}
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" onClick={() => readmore(index)}>Read More</Button>
                                <br />
                                <cite title="Source Title">{currentrow.authorname} </cite>
                                <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime>
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
            <h3 style={{color:"red"}}>{msg}</h3>
            <Container>
                <Row  >
                    {viewNews()}
                </Row>

            </Container>
        </div>
    )
}

export default Home;