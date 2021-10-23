import React from "react";
import MyNavbar from "./Navbar";
import { Redirect } from "react-router-dom";

function UserPanel() {
    let authuser = sessionStorage.getItem('user');
    let name = sessionStorage.getItem('name');

    if (authuser == null) {
        return (<Redirect to="/userlogin" />)
    }
    else{
        return(
            <>
                <MyNavbar/>
                <br/><br/>
                <h1> Well come {name}</h1>
                
            </>
        )
    }
}
export default UserPanel;