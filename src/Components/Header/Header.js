import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const account = useSelector(state => state.userReducer.account);
    console.log(isAuthenticated);
    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleClickRegister = () => {
        navigate('/register');
    }
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
                        {isAuthenticated ? (
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item >Log Out</NavDropdown.Item>
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <button className='btn-login' onClick={() => handleClickLogin()}>Login</button>
                                <button className='btn-signUp' onClick={() => handleClickRegister()}>Sign Up</button>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;