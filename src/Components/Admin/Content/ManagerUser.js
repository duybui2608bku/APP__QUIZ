import ManagerUserCreate from "./ManagerUserCreate";

const ManageUser = () => {
    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    <div className="users-content">
                        <div>
                            <button>Add User</button>
                        </div>
                        <div>
                            <ManagerUserCreate></ManagerUserCreate>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;