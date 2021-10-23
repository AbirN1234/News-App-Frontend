import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import axios from 'axios';
import MyNavbar from "./Navbar";
import { Tabs, Tab, Container ,Table} from "react-bootstrap";
import SimpleDateTime from "react-simple-timestamp-to-date";


function UserViewNews() {
    const [newslist, setNewsList] = useState([]);
    const [msg, setMsg] = useState("");
    const [users, upUser] = useState();

    let uid = sessionStorage.getItem('uid')
    // console.log(uid);
    useEffect(() => {
        axios.get('https://news-app-back.herokuapp.com/user/viewall/' + uid)
            .then(response => {
                setNewsList(response.data);
                // console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function viewNews() {
        return newslist.map((currentrow, index) => {
            if (currentrow.status === 0) {
                currentrow.status = "Pending"
            }
            else if (currentrow.status === 1) {
                currentrow.status = "Published"
            }
            else if (currentrow.status === -1) {
                currentrow.status = "Dismissed"
            }
            return (
                <tr key={index}>
                    <td>{index} </td>
                    <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea> </td>
                    <td>{currentrow.catagory.join(", ")} </td>
                    <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea>  </td>
                    <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                    <td>{(currentrow.status)}</td>
                    <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime> </td>
                </tr>
            )
        })
    };

    function viewNewNews() {
        return newslist.map((currentrow, index) => {
            if (currentrow.status === "Pending") {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        {/* <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td> */}
                    </tr>
                )
            }
            return null;
        })
    }
    function viewApprovedNews() {
        return newslist.map((currentrow, index) => {
            if (currentrow.status === "Published") {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        {/* <td>{currentrow.createdAt}</td>
                        <td>{currentrow.authorname}</td> */}
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                    </tr>
                )
            }
            return null;
        })
    }
    function viewRejectedNews() {
        return newslist.map((currentrow, index) => {
            if (currentrow.status === "Dismissed") {
                return (
                    <tr key={index}>
                        <td><textarea cols="20" rows="10" disabled value={currentrow.title}></textarea></td>
                        <td>{currentrow.catagory.join(", ")}</td>
                        <td><textarea cols="50" rows="10" disabled value={currentrow.descrip}></textarea></td>
                        <td><img src={currentrow.img_path} width={250} alt={currentrow.title} /> </td>
                        <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{currentrow.createdAt}</SimpleDateTime></td>
                        <td>{currentrow.authorname}</td>
                        <td>{currentrow.authoremail}</td>
                        <td><button onClick={() => removeRow(index)} className="btn btn-danger" >Delete</button> </td>
                    </tr>
                )
            }
            return null;
        })
    }


    function removeRow(index) {
        var templist = [...newslist];
        let remove = templist.splice(index, 1);
        axios.delete('https://news-app-back.herokuapp.com/user/remove/' + remove[0]._id)
            .then(res => {
                console.log(res.data)
                setMsg("News Deleted Succesfully.");
                setNewsList(templist)
            })
            .catch(err => {
                console.log(err)
                setMsg('INVALID NEWS ID');
            })
    }

    return (
        <div >
            <MyNavbar />
            <br /><br />
            <h3>All Uploaded News</h3>
            {msg}
            <Container>
                <Tabs className="mb-3" defaultActiveKey="pending" transition={false} activeKey={users} onSelect={(k) => upUser(k)} id="controlled-tab-example">
                    <Tab eventKey="all" title="View All">
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Title</th>
                                    <th>Catagory</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Time of Create</th>
                                </tr>
                            </thead>

                            <tbody>
                                {viewNews()}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="pending" title="Pending">
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Catagory</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Time of Create</th>
                                </tr>
                            </thead>

                            <tbody>
                                {viewNewNews()}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="publish" title="Published">
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Catagory</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Time of Create</th>
                                </tr>
                            </thead>

                            <tbody>
                                {viewApprovedNews()}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="rejected" title="Rejected">
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Catagory</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Time of Create</th>
                                </tr>
                            </thead>

                            <tbody>
                                {viewRejectedNews()}
                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>

            </Container>


            <br /><br />
        </div>
    )
}
export default UserViewNews;

