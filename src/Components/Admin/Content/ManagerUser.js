import ManagerUserCreate from "./ManagerUserCreate";
import "./ManagerUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../Service/ApiServeice";
import ModaleUpdateUser from "./ModalUpdateUser";
import ManagerUserView from "./ManagerUserView";
import ManagerDeleteUser from "./ModaleDeleteUser";
const ManageUser = () => {
    const [listUser, setListUser] = useState([]);
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModeUpdateUser, setShowModeUpdateUser] = useState(false);
    const [showModeViewUser, setShowModeViewUser] = useState(false);
    const [showModeDeleteUser, setShowModeDeleteUser] = useState(false);
    const [userDelete, setUserDelete] = useState('');
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const handleClickUpdate = (user) => {
        setShowModeUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickView = (user) => {
        setDataView(user);
        setShowModeViewUser(true);
    }

    const handleClickDelete = (user) => {
        setUserDelete(user);
        setShowModeDeleteUser(true);

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
                        <TableUser listUser={listUser}
                            handleClickUpdate={handleClickUpdate}
                            handleClickView={handleClickView}
                            handleClickDelete={handleClickDelete}
                        ></TableUser>
                    </div>
                    <div>
                        <ManagerUserCreate
                            show={showModelCreateUser}
                            setShow={setShowModelCreateUser}
                            fetListUser={fetchApi}
                        ></ManagerUserCreate>
                        <ModaleUpdateUser
                            show={showModeUpdateUser}
                            setShow={setShowModeUpdateUser}
                            fetListUser={fetchApi}
                            dataUpdate={dataUpdate}
                        ></ModaleUpdateUser>
                        <ManagerUserView
                            show={showModeViewUser}
                            setShow={setShowModeViewUser}
                            dataView={dataView}
                        ></ManagerUserView>
                        <ManagerDeleteUser
                            show={showModeDeleteUser}
                            setShow={setShowModeDeleteUser}
                            user={userDelete}
                        ></ManagerDeleteUser>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;