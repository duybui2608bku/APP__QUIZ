import ManagerUserCreate from "./ManagerUserCreate";
import "./ManagerUser.scss";
import TableUserPaginate from "./TableUserPaginate";
import { useEffect, useState } from "react";
import { getUserWithPaginate } from "../../../Service/ApiServeice";
import ModaleUpdateUser from "./ModalUpdateUser";
import ManagerUserView from "./ManagerUserView";
import ManagerDeleteUser from "./ModaleDeleteUser";
const ManageUser = () => {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);
    const [listUser, setListUser] = useState([]);
    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModeUpdateUser, setShowModeUpdateUser] = useState(false);
    const [showModeViewUser, setShowModeViewUser] = useState(false);
    const [showModeDeleteUser, setShowModeDeleteUser] = useState(false);
    const [userDelete, setUserDelete] = useState('');
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [pageCountDelete, setPageCountDelete] = useState(0);
    const [pageCountUpdate, setPageCountUpdate] = useState(0);
    useEffect(() => {
        fetchListUserWithPaginate(1);
    }, []);


    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }


    const handleClickUpdate = (user, userAction) => {
        setPageCountUpdate(userAction);
        setShowModeUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickView = (user) => {
        setDataView(user);
        setShowModeViewUser(true);
    }

    const handleClickDelete = (user, pageCount) => {
        setUserDelete(user);
        setShowModeDeleteUser(true);
        setPageCountDelete(pageCount);
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
                        <TableUserPaginate
                            listUser={listUser}
                            handleClickUpdate={handleClickUpdate}
                            handleClickView={handleClickView}
                            handleClickDelete={handleClickDelete}
                            fetchListUserWithPaginate={fetchListUserWithPaginate}
                            pageCount={pageCount}
                        ></TableUserPaginate>
                    </div>
                    <div>
                        <ManagerUserCreate
                            show={showModelCreateUser}
                            setShow={setShowModelCreateUser}
                            fetchListUserWithPaginate={fetchListUserWithPaginate}
                        ></ManagerUserCreate>
                        <ModaleUpdateUser
                            show={showModeUpdateUser}
                            setShow={setShowModeUpdateUser}
                            fetchListUserWithPaginate={fetchListUserWithPaginate}
                            dataUpdate={dataUpdate}
                            pageCountUpdate={pageCountUpdate}
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
                            fetchListUserWithPaginate={fetchListUserWithPaginate}
                            pageCountDelete={pageCountDelete}
                        ></ManagerDeleteUser>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;