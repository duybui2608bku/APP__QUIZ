import { useState } from "react";
import SideBar from "./Sidebar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Admin.scss";
import { FaBarsProgress } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../../Service/ApiServeice';
import userLogOut from '../../Redux/Action/UserLogOut';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
    const [state, setState] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(state => state.userReducer.account);

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

    const handleClick = () => {
        setState(!state);
    }

    return (
        <>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <SideBar state={state}></SideBar>
                </div>
                <div className="admin-content">
                    <div className="admin-header">
                        <FaBarsProgress className="show-sidebar" onClick={handleClick} size={24}></FaBarsProgress>
                        <NavDropdown title="Setting" id="basic-nav-dropdown" className="log-out">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogUot} >Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <div className="admin-main">
                        <PerfectScrollbar>
                            <Outlet></Outlet>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Admin;