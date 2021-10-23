import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserReg from './components/UserReg';
import Logout from './components/Logout';
import UserPanel from './components/UserPanel';
import UploadNews from './components/UploadNews';
import UserViewNews from './components/UserViewsNews';
import UserDelNews from './components/UserDelNews';
import UpdateProf from './components/UpdateProf';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import AdminViewUser from './components/AdminViewUser';
import AdminViewNews from './components/AdminViewNews';
import ReadMore from './components/ReadMore';
import ContactUs from './components/ContactUs';
import AdminViewMessage from './components/AdminViewMessage';
import CatagorySrc from './components/CatagorySrc';
import Mailer from './components/Mailer';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/userreg' component={UserReg} />
                    <Route path='/userlogin' component={UserLogin} />
                    <Route path='/userpanel' component={UserPanel} />
                    <Route path='/uploadnews' component={UploadNews} />
                    <Route path='/viewnews' component={UserViewNews} />
                    <Route path='/delnews' component={UserDelNews} />
                    <Route path='/update' component={UpdateProf} />

                    {/* ADMIN */}
                    <Route path='/adminlogin' component={AdminLogin} />
                    <Route path='/adminpanel' component={AdminPanel} />
                    <Route path='/adminviewuser' component={AdminViewUser} />
                    <Route path='/adminviewnews' component={AdminViewNews} />
                    <Route path='/adminviewmsg' component={AdminViewMessage} />
                    <Route path='/mailer' component={Mailer} />

                    <Route path='/logout' component={Logout} />
                    
                    {/* Viewer */}
                    <Route path='/readmore/:nid' component={ReadMore} />
                    <Route path='/catsrc/:cata' component={CatagorySrc} />
                    <Route path='/catsrc' component={CatagorySrc} />
                    <Route path='/contact' component={ContactUs} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
