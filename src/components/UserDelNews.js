import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import MyNavbar from "./Navbar";

function UserDelNews() {
    const [nid, setNid] = useState("");
    const [msg, setMessage] = useState("");

    let uid = sessionStorage.getItem('uid');

    const onChangeNId = (e) => {
        setNid(e.target.value);
        setMessage(''); //REMOVE ERROE MSG
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        axios.delete('https://news-app-back.herokuapp.com/user/remove/' + nid)
        .then(res => {
            console.log(res.data)
            setMessage('SUCCESSFULLY DELETED')
        })
        .catch(err => {
            console.log(err)
            setMessage('INVALID NEWS ID')
        })
        
        setNid('')
    }

    if (uid == null) {
        return (<Redirect to="/userlogin" />)
    }
    else{
        return (
            <>
                <MyNavbar />
                <br /><br />
                <h3 >ENTER NEWS ID FOR DELETE</h3>
                <b style={{ color: "red" }}>{msg}</b>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={nid}
                        onChange={onChangeNId}
                        placeholder="News ID"
                        required />
                    <br />
                    <br />
                    <input type="submit" value="DELETE NEWS" className="btn btn-danger" />
                </form>
            </>
        )
    }
}
export default UserDelNews;