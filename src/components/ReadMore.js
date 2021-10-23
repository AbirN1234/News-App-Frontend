import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Card } from 'react-bootstrap';
import MyNavbar from './Navbar';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

function ReadMore() {
    const { nid } = useParams();
    // console.log(nid);
    const [newslist, setNewsList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4500/viewer/readmore/' + nid)
            .then(response => {
                setNewsList(response.data);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])    // eslint-disable-line react-hooks/exhaustive-deps

    function viewNews() {
        return newslist.map((currentrow, index) => {
            return (
                <Col key={index} style={{}}>
                    <Card style={{}}>
                        <center><Card.Img style={{ minWidth: "0px", maxWidth: "700px", maxHeight: "500px" }} src={currentrow.img_path} /></center>
                        <br />
                        <cite title="Source Title">
                            <h1 className=" " style={{ color: "green", fontSize: "14px" }}>{currentrow.catagory.map((cr, ind) => { return (<Link to={`/catsrc/${cr}`} key={ind}> {cr}</Link>) })}</h1> {" "}
                            || by <b>{currentrow.authorname}</b>
                            <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime>
                        </cite>
                        <Card.Body>
                            <Card.Header as="h2" style={{ fontSize: "30px" }}>
                                {currentrow.title}
                            </Card.Header>
                            <Card.Body style={{ fontSize: "24px", fontFamily: "Montserrat", textAlign: "justify" }} >
                                {currentrow.descrip}
                            </Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div style={{ backgroundColor: "#E8DDE3" }}>
            <MyNavbar />
            <br /><br />
            <Container >
                {viewNews()}
                <Link to="/" onClick={() => localStorage.removeItem('readmore')} >Go Back</Link>
            </Container>

            <br /><br />
        </div>
    )
}
export default ReadMore;