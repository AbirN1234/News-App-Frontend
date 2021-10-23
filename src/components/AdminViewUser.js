import axios from "axios";
import React, { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { Redirect } from "react-router";
import { Container, Table } from "react-bootstrap";

function AdminViewUser() {
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState([]);
    const [users, upUser] = useState();
    const [search, setsearch] = useState([]);
    const [email, setEmail] = useState("");

    let admin = sessionStorage.getItem("admin");

    useEffect(() => {
        axios.get('http://localhost:4500/admin/viewuser/')
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function viewUser(hello) {
        return hello.map((currentrow, index) => {
            // New User
            if (currentrow.status === 0) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => activeUser(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delUser(index)} className="btn btn-danger" >Reject</button></td>
                    </tr>
                )
            }
            // Activated User 
            else if (currentrow.status === 1) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => deactivateUser(index)} className="btn btn-danger" >Deactivate</button></td>
                    </tr>
                )
            }
            // Deactivated User
            else if (currentrow.status === -1) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => activeUser(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delUser(index)} className="btn btn-danger" >Delete</button></td>
                    </tr>
                )
            }
            return null;

        })
    }
    function viewNewUser() {
        return user.map((currentrow, index) => {
            if (currentrow.status === 0) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => activeUser(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delUser(index)} className="btn btn-danger" >Reject</button></td>
                    </tr>
                )
            }
            return null;
        })
    }
    function viewActiveUser() {
        return user.map((currentrow, index) => {
            if (currentrow.status === 1) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => deactivateUser(index)} className="btn btn-danger" >Deactivate</button></td>
                    </tr>
                )
            }
            return null;
        })
    }
    function viewDeactiveUser() {
        return user.map((currentrow, index) => {
            if (currentrow.status === -1) {
                return (
                    <tr key={index}>
                        <td>{currentrow._id}</td>
                        <td>{currentrow.name}</td>
                        <td>{currentrow.email}</td>
                        <td>{currentrow.mobile}</td>
                        <td>{currentrow.dob}</td>
                        <td>{currentrow.gender}</td>
                        <td><button onClick={() => activeUser(index)} className="btn btn-success" >Active</button></td>
                        <td><button onClick={() => delUser(index)} className="btn btn-danger" >Delete</button></td>
                    </tr>
                )
            }
            return null;
        })
    }


    function activeUser(index) {
        var templist = [...user];
        axios.put('http://localhost:4500/admin/useractive/' + templist[index]._id)
            .then(response => {
                templist[index].status = 1;
                setUser(templist);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function deactivateUser(index) {
        var templist = [...user];
        // let remove = templist.splice(index, 1);
        axios.put('http://localhost:4500/admin/userdeactive/' + templist[index]._id)
            .then(response => {
                templist[index].status = -1;
                setUser(templist);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function delUser(index) {
        var templist = [...user];
        let remove = templist.splice(index, 1);
        axios.delete('http://localhost:4500/admin/userdel/' + remove[0]._id)
            .then(response => {
                setUser(templist);
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
        axios.get('http://localhost:4500/admin/viewuser/' + email)
            .then(response => {
                setsearch(response.data)
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
                <h3>User Control</h3>
                {msg}
                <Container >
                    <Tabs className="mb-3" defaultActiveKey="all" transition={false} activeKey={users} onSelect={(k) => upUser(k)} id="controlled-tab-example">
                        <Tab eventKey="all" title="View All">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email-Id</th>
                                        <th>Contact No</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewUser(user)}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="new" title="New">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email-Id</th>
                                        <th>Contact No</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewNewUser()}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="active" title="Active">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email-Id</th>
                                        <th>Contact No</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewActiveUser()}
                                </tbody>
                            </Table>

                        </Tab>

                        <Tab eventKey="deactive" title="Deactive" >
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email-Id</th>
                                        <th>Contact No</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewDeactiveUser()}
                                </tbody>
                            </Table>
                        </Tab>

                        <Tab eventKey="search" title="Search" >
                            <h4>Search User by Email Id</h4>
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
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email-Id</th>
                                        <th>Contact No</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewUser(search)}
                                </tbody>
                            </Table>
                        </Tab>

                    </Tabs>
                </Container>
            </>
        )
    }
}
export default AdminViewUser;