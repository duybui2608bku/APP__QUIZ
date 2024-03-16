import ManagerUserCreate from "./ManagerUserCreate";
import "./ManagerUser.scss";
import { useState } from "react";
const ManageUser = () => {
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    ManageUser
                </div>
                <div className="users-content">
                    <div className="btn-add-new">
                        <button className="btn btn-primary" onClick={() => setShowModelCreateUser(true)}>Add New User</button>
                    </div>
                    <div className="table-user-container">
                        Table-User
                    </div>
                    <div>
                        <ManagerUserCreate
                            show={showModelCreateUser}
                            setShow={setShowModelCreateUser}
                        ></ManagerUserCreate>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;