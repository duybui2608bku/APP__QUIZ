import { useState } from "react";
import SideBar from "./Sidebar";
import "./Admin.scss";
import { FaBarsProgress } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
    const [state, setState] = useState(true);

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
                        <FaBarsProgress onClick={handleClick} size={24}></FaBarsProgress>
                    </div>
                    <div className="admin-main"><Outlet></Outlet></div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition="bounce" />

            </div>
        </>
    )
};

export default Admin;