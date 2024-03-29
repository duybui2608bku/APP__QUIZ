const TableUser = (props) => {

    const { listUser, handleClickUpdate, handleClickView, handleClickDelete } = props;
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <button className="btn btn-info mx-3" onClick={() => handleClickView(item)} >View</button>
                                <button className="btn btn-primary mx-3" onClick={() => handleClickUpdate(item)}>Update</button>
                                <button className="btn btn-danger mx-3" onClick={() => handleClickDelete(item)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'5'} className='text-center'>Not Found Data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
};

export default TableUser;