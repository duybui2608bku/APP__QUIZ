import ReactPaginate from "react-paginate";
import "./TableUserPaginate.scss";
import { useState } from "react";
const TableUserPaginate = (props) => {
    const { listUser, handleClickUpdate,
        handleClickView, handleClickDelete,
        fetchListUserWithPaginate, pageCount } = props;
    const [userAction, setUserAction] = useState('');
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setUserAction(event.selected + 1);
        fetchListUserWithPaginate(event.selected + 1);
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
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
                                <button className="btn btn-primary mx-3" onClick={() => handleClickUpdate(item, userAction)}>Update</button>
                                <button className="btn btn-danger mx-3" onClick={() => handleClickDelete(item, userAction)} >Delete</button>
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
            <div className="user-paginate">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
};

export default TableUserPaginate;