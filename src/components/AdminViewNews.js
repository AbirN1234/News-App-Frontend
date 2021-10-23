import React, { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "./Navbar";
import { Container, Tab, Table, Tabs } from "react-bootstrap";
import { Redirect } from "react-router";
import SimpleDateTime from "react-simple-timestamp-to-date";

function AdminViewNews() {
    const [msg, setMsg] = useState("");
    const [news, setNews] = useState([]);
    const [users, upUser] = useState();
    const [search, setsearch] = useState([]);


    const [email, setEmail] = useState("");

    let admin = sessionStorage.getItem("admin");

    useEffect(() => {
        axios.get('http://localhost:4500/admin/viewnews/')
            .then(response => {
                setNews(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function viewNews(hello) {
        return hello.map((currentrow, index) => {
            // Pending
            if (currentrow.status === 0) {
                return (

                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => approveNews(index)} className="btn btn-success" >Approve</button></td>
                        <td><button onClick={() => rejectNews(index)} className="btn btn-danger" >Reject</button></td>
                    </tr>
                )
            }
            // Approved User 
            else if (currentrow.status === 1) {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => rejectNews(index)} className="btn btn-danger" >Remove</button></td>
                    </tr>
                )
            }
            // Reject User
            else if (currentrow.status === -1) {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => approveNews(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delNews(index)} className="btn btn-danger" >Delete</button></td>
                    </tr>
                )
            }
            return null;
        })
    }

    function viewNewNews() {
        return news.map((currentrow, index) => {
            if (currentrow.status === 0) {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td ><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => approveNews(index)} className="btn btn-success" >Approve</button></td>
                        <td><button onClick={() => rejectNews(index)} className="btn btn-danger" >Reject</button></td>
                    </tr>
                )
            }
            return null;
        })
    }
    function viewApprovedNews() {
        return news.map((currentrow, index) => {
            if (currentrow.status === 1) {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        {/* <td><button onClick={() => approveNews(index)} className="btn btn-success" >Approve</button></td> */}
                        <td><button onClick={() => rejectNews(index)} className="btn btn-danger" >Remove</button></td>
                    </tr>
                )
            }
            return null;
        })
    }
    function viewRejectedNews() {
        return news.map((currentrow, index) => {
            if (currentrow.status === -1) {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => approveNews(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delNews(index)} className="btn btn-danger" >Delete</button></td>
                    </tr>
                )
            }
            return null;
        })
    }

    function approveNews(index) {
        var temp = [...news];
        axios.put('http://localhost:4500/admin/newsapprove/' + temp[index]._id)
            .then(response => {
                console.log(response)
                temp[index].status = 1
                setNews(temp);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function rejectNews(index) {
        var temp = [...news];
        axios.put('http://localhost:4500/admin/newsreject/' + temp[index]._id)
            .then(response => {
                // console.log(response)
                temp[index].status = -1
                setNews(temp);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function delNews(index) {
        var temp = [...news];
        let remove = temp.splice(index, 1);
        axios.delete('http://localhost:4500/admin/newsdel/' + remove[0]._id)
            .then(response => {
                setNews(temp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // onChangeNId
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setMsg('');
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.get('http://localhost:4500/admin/viewnews/' + email)
            .then(response => {
                setsearch(response.data)
                setMsg("Author Name : " + response.data[0].authorname)
            })
            .catch(err => {
                console.log(err)
            })

    }

    if (admin == null) {
        return (<Redirect to="/adminlogin" />)
    }
    else {
        return (
            <>
                <MyNavbar />
                <br />

                <h3>News Control</h3>
                {/* {msg} */}
                <Container >
                    <Tabs className="mb-3" defaultActiveKey="pending" transition={false} activeKey={users} onSelect={(k) => upUser(k)} id="controlled-tab-example">
                        <Tab eventKey="all" title="View All">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Title</th>
                                        <th>Catagory</th>
                                        <th>Description</th>
                                        <th>Img</th>
                                        <th>Time of Create</th>
                                        <th>Author</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewNews(news)}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="pending" title="Pending">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Title</th>
                                        <th>Catagory</th>
                                        <th>Description</th>
                                        <th>Img</th>
                                        <th>Time of Create</th>
                                        <th>Author</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewNewNews()}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="approved" title="Approved">
                            <Table responsive striped bordered hover >
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Title</th>
                                        <th>Catagory</th>
                                        <th>Description</th>
                                        <th>Img</th>
                                        <th>Time of Create</th>
                                        <th>Author</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewApprovedNews()}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="rejected" title="Rejected" >
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Title</th>
                                        <th>Catagory</th>
                                        <th>Description</th>
                                        <th>Img</th>
                                        <th>Time of Create</th>
                                        <th>Author</th>
                                        <th>Email</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {viewRejectedNews()}
                                </tbody>
                            </Table>
                        </Tab>

                        <Tab eventKey="search" title="Search" >
                            <h4>Search News by User Email Id</h4>
                            {/* <br /> */}
                            <form onSubmit={handleSubmit}>
                                <input type="text" value={email} onChange={onChangeEmail} placeholder="Email ID" required />
                                &nbsp;&nbsp;&nbsp;
                                <input type="submit" value="Search" className="btn btn-info" />
                            </form>
                            <br />
                            <h3>{msg}</h3>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Title</th>
                                        <th>Catagory</th>
                                        <th>Description</th>
                                        <th>Img</th>
                                        <th>Time of Create</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewNews(search)}
                                </tbody>
                            </Table>
                        </Tab>

                    </Tabs>
                </Container>

                <br /><br />
            </>
        )
    }

}

export default AdminViewNews;