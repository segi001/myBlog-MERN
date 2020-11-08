import React from 'react';
import {Navbar,
        Nav,
        Button,
        Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';

const AdminNavigationBar = () => {

    function logOut() {
        Cookies.remove('AUTHTOKEN');
        localStorage.removeItem('AUTHTOKEN');
        window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/admin">myBlog Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            <Form inline>
                <Button onClick={(e)=>{logOut()}} variant="outline-success">Logout</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavigationBar;