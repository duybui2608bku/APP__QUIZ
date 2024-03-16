import ManagerUserCreate from "./ManagerUserCreate";
import "./ManagerUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../Service/ApiServeice";
const ManageUser = () => {
    const [listUser, setListUser] = useState([]);
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

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
                        <TableUser listUser={listUser}></TableUser>
                    </div>
                    <div>
                        <ManagerUserCreate
                            show={showModelCreateUser}
                            setShow={setShowModelCreateUser}
                            fetListUser={fetchApi}
                        ></ManagerUserCreate>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;