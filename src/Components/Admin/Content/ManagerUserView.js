import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import "./ManagerUserCreate.scss";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const ManagerUserView = (props) => {
    const { show, setShow, dataView } = props;
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (dataView) {
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [dataView]);

    return (
        <>

            <Modal show={show} onHide={handleClose} size='lg' backdrop="static" className='modal-css'>
                <Modal.Header closeButton>
                    <Modal.Title>View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input disabled={true} type="email" className="form-control" placeholder='Nhập email:' value={dataView.email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input disabled={true} type="password" className="form-control" placeholder='Nhập mật khẩu:' value={dataView.password} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User Name</label>
                            <input disabled={true} type="text" className="form-control" placeholder='Nhập tên người dùng:' value={dataView.username} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">State</label>
                            <select disabled={true} value={dataView.role} className="form-select">
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label img-upload"> <FcPlus className='icon-plus'></FcPlus>Upload File Img</label>
                            <input type="file"
                                className="form-control"
                                hidden
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (<img src={previewImage} alt='img'></img>) : (<span>Preview Image</span>)}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagerUserView;