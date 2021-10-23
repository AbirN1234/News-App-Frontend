import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function MyNavbar() {
    let authuser = sessionStorage.getItem('user');
    let name = sessionStorage.getItem('name');
    let admin = sessionStorage.getItem('admin');

    if (admin) {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/adminpanel">Times of GMIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/adminviewuser">Control Users</Nav.Link>
                            <Nav.Link as={Link} to="/adminviewnews">Control News</Nav.Link>
                            <Nav.Link as={Link} to="/adminviewmsg">Contact Us Messages</Nav.Link>

                            {/* <NavDropdown title="Uploaded News" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/viewnews">View</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/delnews">Delete</NavDropdown.Item>
                            </NavDropdown> */}
                            {/*<Nav.Link as={Link} to="/viewnews">View Uploaded News</Nav.Link>
                            <Nav.Link as={Link} to="/update">Update Profile</Nav.Link> */}
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            {/* <NavDropdown title={name} id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
    else if (authuser) {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/userpanel">Times of GMIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <NavDropdown title="Uploaded News" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/viewnews">View</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/delnews">Delete</NavDropdown.Item>
                            </NavDropdown> */}
                            <Nav.Link as={Link} to="/uploadnews">Upload News</Nav.Link>
                            <Nav.Link as={Link} to="/viewnews">View Uploaded News</Nav.Link>
                            <Nav.Link as={Link} to="/update">Update Profile</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={name} id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
    else {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">Times of GMIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/catsrc">Search</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="login" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/userlogin">User Login</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/adminlogin">Admin Login</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/userreg">Registration</Nav.Link>

                            {/* <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-primary">Search</Button>
                            </Form> */}
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }

}
export default MyNavbar;