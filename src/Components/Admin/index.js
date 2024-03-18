import { useState } from "react";
import SideBar from "./Sidebar";
import "./Admin.scss";
import { FaBarsProgress } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
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
            </div>
        </>
    )
};

export default Admin;