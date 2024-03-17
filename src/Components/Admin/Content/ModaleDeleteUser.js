import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ManagerUserCreate.scss";
import { toast } from 'react-toastify';
import { deleteUser } from '../../../Service/ApiServeice';
const ManagerDeleteUser = (props) => {
    const { show, setShow, user } = props;
    const [previewImage, setPreviewImage] = useState("");

    // const handleSubmit = async () => {
    //     let data = await deleteUser(user);
    //     if (data && data.EC === 0) {
    //         toast.success(data.EM);
    //         handleClose();
    //     }
    //     if (data && data.EC !== 0) {
    //         toast.error(data.EM);
    //     }
    // }
    console.log(user.id);

    const handleClose = () => setShow(false);
    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop={'static'}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>You want to delete user <b>{user.username}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagerDeleteUser;