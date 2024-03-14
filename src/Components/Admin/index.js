import { useState } from "react";
import SideBar from "./Sidebar";
import "./Admin.scss"
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
                    <button onClick={handleClick}>Add</button>
                </div>
            </div>
        </>
    )
};

export default Admin;