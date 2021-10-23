import React from "react";
import MyNavbar from "./Navbar";
import { Redirect } from "react-router-dom";

function AdminPanel() {
    let admin = sessionStorage.getItem('admin');
    // let name = sessionStorage.getItem('name');

    if (admin == null) {
        return (<Redirect to="/adminlogin" />)
    }
    else{
        return(
            <>
                <MyNavbar/>
                <br/><br/>
                <h1> Well come ADMIN</h1>
                
            </>
        )
    }
}
export default AdminPanel;