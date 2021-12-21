import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Classes from './header.module.css'
function Header() {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand className={Classes.link} href="">Pages</Navbar.Brand>
                <Nav className="me-auto navbar_wrapper">
                    <Link className={Classes.link} to="/">Certification</Link>
                    <Link className={Classes.link} to="/chart1">Chart One Page</Link>
                    <Link className={Classes.link} to="/chart2">Chart Tow Page</Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
