import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import "./ManagerUserCreate.scss";
import { toast } from 'react-toastify';
import { postCreateUser } from '../../../Service/ApiServeice';
const ManagerUserCreate = (props) => {
    const { show, setShow } = props;

    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [user, setUser] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            setPreviewImage("NULL");
        }
    }

    //Regex email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPasswrod("");
        setUser("");
        setRole("");
        setImage("");
        setPreviewImage('')
    };
    // const handleShow = () => setShow(true);
    const handleSubmit = async () => {

        //Validate Email
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalid Email");
            return;
        }
        //Validate Password

        if (!password) {
            toast.error("Please input password");
            return;
        }

        //Validate User 

        if (!user) {
            toast.error("Please input user name");
            return;
        }

        let data = await postCreateUser(email, password, user, role, image);
        if (data && data.EC === 0) {
            toast.success("Create user success");
            handleClose();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='lg' backdrop="static" className='modal-css'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder='Nhập email:' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder='Nhập mật khẩu:' value={password} onChange={(e) => { setPasswrod(e.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control" placeholder='Nhập tên người dùng:' value={user} onChange={(e) => { setUser(e.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">State</label>
                            <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label img-upload" htmlFor='lableUpload'> <FcPlus className='icon-plus'></FcPlus>Upload File Img</label>
                            <input type="file"
                                className="form-control"
                                id='lableUpload'
                                hidden
                                onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (<img src={previewImage} alt='img'></img>) : (<span>Preview Image</span>)}
                            {/* <span>PREVIEW</span> */}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagerUserCreate;