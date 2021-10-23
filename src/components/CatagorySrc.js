import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SimpleDateTime from "react-simple-timestamp-to-date";
import MyNavbar from "./Navbar";

function CatagorySrc(props) {

    const [cat, setCat] = useState("");
    const [msg, setMsg] = useState("");
    const [result, setResult] = useState([]);

    const { cata } = useParams();
    // setCat(cata);
    function demo() {
        if (cata) {
            axios.post('http://localhost:4500/viewer/catsrc/' + cata)
                .then(res => {
                    setResult(res.data)
                    setMsg("Search results for " + cata)
                    
                })
                .catch(err => {
                    // setMsg(err.message)
                    setMsg("No news found on this catagory")
                })
        }
    }

    const onChangeCat = (e) => {
        setCat(e.target.value);
        setMsg(''); //REMOVE ERROE MSG
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();


        axios.post('http://localhost:4500/viewer/catsrc/' + cat)
            .then(res => {
                setResult(res.data)
                setMsg("Search results for " + cat)
            })
            .catch(err => {
                // setMsg(err.message)
                setMsg("No news found on this catagory")
            })


        setCat('')
    }

    useEffect(() => {
        demo();
    }, [cata])// eslint-disable-line react-hooks/exhaustive-deps

    function viewNews() {
        return result.map((currentrow, index) => {
            return (
                <Col key={index} style={{ marginBottom: "1rem", width: "18rem" }}>
                    <Card style={{ width: '18rem', height: "30rem" }}>
                        <Card.Img variant="top" style={{ width: '18rem', height: "15rem", maxHeight: "13rem" }} src={currentrow.img_path} />
                        <small className="text-muted"> {currentrow.catagory.map((cr,ind)=>{ return (<Link to={`/catsrc/${cr}`} key={ind}> {cr}</Link>) })}</small>
                        <Card.Body>
                            <Card.Title style={{ maxHeight: "26px", marginTop: "-20px", overflow: "hidden" }}>
                                {currentrow.title}
                            </Card.Title>
                            <Card.Body style={{ maxHeight: "7rem", marginTop: "-25px", overflow: "hidden" }}>
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
        var temp = [...result];
        // localStorage.setItem('readmore', temp[index]._id)
        props.history.push('/readmore/'+temp[index]._id);
    }

    return (
        <div>
            <MyNavbar />
            <br />
            <h3 >Enter Catagory</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cat}
                    onChange={onChangeCat}
                    placeholder="Catagory"
                    required />
                <br />
                <br />
                <input type="submit" value="Search" className="btn btn-info" />
            </form>
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
export default CatagorySrc;