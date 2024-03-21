import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../Service/ApiServeice';
import { toast } from 'react-toastify';
function ModalDeleteQuiz(props) {

    const { show, setShow, idDelete, dataAfterDelete, setDataAfterDelete } = props;
    const handleClose = () => setShow(false);

    const handleDelete = async () => {
        let res = await deleteQuiz(idDelete);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            setDataAfterDelete(!dataAfterDelete);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want delete quiz with id <b>{idDelete}</b> !</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;