const ManageUser = () => {
    return (
        <>
            <div classNameName="manage-user-container">
                <div classNameName="title">
                    <div classNameName="users-content">
                        <div>
                            <button>Add User</button>
                        </div>
                        <div>
                            <ManageUser></ManageUser>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ManageUser;