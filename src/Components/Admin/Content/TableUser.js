import { useEffect, useState } from "react";
import { getAllUser } from "../../../Service/ApiServeice";
const TableUser = (props) => {

    useEffect(() => {
        const fetchApi = async () => {
            let res = await getAllUser();
            if (res.EC === 0) {
                setListUser(res.DT);
            }
        }
        fetchApi();
    }, []);

    const [listUser, setListUser] = useState([]);
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        {/* <th scope="col">Avatar</th> */}
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <button className="btn btn-info mx-3">View</button>
                                <button className="btn btn-primary mx-3">Update</button>
                                <button className="btn btn-danger mx-3" >Delete</button>
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