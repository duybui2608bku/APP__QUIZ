import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary box-shadow">
            <Container>
                {/* <Navbar.Brand href="#home">DUY BKU</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>DUY BKU</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className='btn-login'>Login</button>
                        <button className='btn-signUp'>Sign Up</button>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Login</NavDropdown.Item>
                            <NavDropdown.Item >Log Out</NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;