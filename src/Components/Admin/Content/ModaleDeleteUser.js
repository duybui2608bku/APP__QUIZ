import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ManagerUserCreate.scss";
import { toast } from 'react-toastify';
import { deleteUser } from '../../../Service/ApiServeice';
const ManagerDeleteUser = (props) => {
    const { show, setShow, user, fetchListUserWithPaginate } = props;
    // const [previewImage, setPreviewImage] = useState("");

    const handleSubmit = async () => {
        let data = await deleteUser(user.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUserWithPaginate(props.pageCountDelete);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

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
                    <Button variant="primary"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagerDeleteUser;