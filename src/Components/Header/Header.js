import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../../Service/ApiServeice';
import userLogOut from '../../Redux/Action/UserLogOut';
import { toast } from 'react-toastify';
import Language from './Language';
import Profile from './Profile';
import { useState } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const account = useSelector(state => state.userReducer.account);

    const showModalProfile = () => {
        setShow(true);
    }

    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleClickRegister = () => {
        navigate('/register');
    }

    const handleLogUot = async () => {
        let res = await postLogOut(account.email, account.access_token);
        if (res.EC === 0) {
            dispatch(userLogOut())
            toast.success(res.EM)
            navigate("/login");
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
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
                                    <NavDropdown.Item onClick={showModalProfile} >Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogUot} >Log Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <button className='btn-login' onClick={() => handleClickLogin()}>Login</button>
                                    <button className='btn-signUp' onClick={() => handleClickRegister()}>Sign Up</button>
                                </>
                            )}
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                show={show}
                setShow={setShow}
            ></Profile>
        </>
    );
}

export default Header;